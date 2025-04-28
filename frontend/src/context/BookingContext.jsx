// src/context/BookingContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserBookings, createBooking, cancelBooking, rescheduleBooking, submitReview } from '../services/bookingService';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState({
    upcoming: [],
    past: [],
    pending: [],
    cancelled: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to trigger a refresh of bookings data
  const refreshBookings = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Fetch bookings based on user role
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all bookings
        const result = await getUserBookings();

        if (result.success) {
          // Organize bookings by status
          const bookingsData = result.bookings || [];
          
          const organized = {
            upcoming: bookingsData.filter(b => 
              (b.status === 'confirmed' || b.status === 'Confirmed') && 
              new Date(b.date) >= new Date()
            ),
            past: bookingsData.filter(b => 
              (b.status === 'completed' || b.status === 'Completed') || 
              (new Date(b.date) < new Date() && b.status !== 'cancelled' && b.status !== 'Cancelled')
            ),
            pending: bookingsData.filter(b => 
              b.status === 'pending' || b.status === 'Pending'
            ),
            cancelled: bookingsData.filter(b => 
              b.status === 'cancelled' || b.status === 'Cancelled'
            )
          };
          
          setBookings(organized);
        } else {
          setError(result.error || 'Failed to fetch bookings');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message || 'Failed to load bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, refreshTrigger]);

  // Create a new booking
  const book = async (bookingData) => {
    try {
      setLoading(true);
      const result = await createBooking(bookingData);
      
      if (result.success) {
        // Add the new booking to the pending list
        setBookings(prev => ({
          ...prev,
          pending: [...prev.pending, result.booking]
        }));
        
        refreshBookings();
        return { success: true, booking: result.booking };
      } else {
        throw new Error(result.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.message || 'Failed to create booking');
      return { success: false, error: err.message || 'Failed to create booking' };
    } finally {
      setLoading(false);
    }
  };

  // Cancel a booking
  const cancel = async (bookingId, reason) => {
    try {
      setLoading(true);
      const result = await cancelBooking(bookingId, reason);
      
      if (result.success) {
        // Update the local state by moving the booking from its current status to cancelled
        setBookings(prev => {
          // Find the booking in any of the lists
          let targetBooking = null;
          let sourceList = null;
          
          for (const list of ['upcoming', 'pending', 'past']) {
            const found = prev[list].find(b => b._id === bookingId || b.id === bookingId);
            if (found) {
              targetBooking = {...found, status: 'cancelled'};
              sourceList = list;
              break;
            }
          }
          
          if (!targetBooking) return prev;
          
          // Return updated state with the booking moved to cancelled list
          return {
            ...prev,
            [sourceList]: prev[sourceList].filter(b => b._id !== bookingId && b.id !== bookingId),
            cancelled: [...prev.cancelled, targetBooking]
          };
        });
        
        refreshBookings();
        return { success: true };
      } else {
        throw new Error(result.error || 'Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError(err.message || 'Failed to cancel booking');
      return { success: false, error: err.message || 'Failed to cancel booking' };
    } finally {
      setLoading(false);
    }
  };

  // Reschedule a booking
  const reschedule = async (bookingId, newDate, newTime) => {
    try {
      setLoading(true);
      const result = await rescheduleBooking(bookingId, {date: newDate, time: newTime});
      
      if (result.success) {
        // Update the local state with the rescheduled booking
        setBookings(prev => {
          // Find the booking in any of the lists
          let targetBooking = null;
          let sourceList = null;
          
          for (const list of ['upcoming', 'pending', 'past']) {
            const found = prev[list].find(b => b._id === bookingId || b.id === bookingId);
            if (found) {
              targetBooking = {...found, date: newDate, time: newTime};
              sourceList = list;
              break;
            }
          }
          
          if (!targetBooking) return prev;
          
          // Determine which list it should go to based on new date
          const isUpcoming = new Date(newDate) >= new Date() && 
                            (targetBooking.status === 'confirmed' || targetBooking.status === 'Confirmed');
          const newList = isUpcoming ? 'upcoming' : sourceList;
          
          // Return updated state
          return {
            ...prev,
            [sourceList]: prev[sourceList].filter(b => b._id !== bookingId && b.id !== bookingId),
            [newList]: [...prev[newList], targetBooking]
          };
        });
        
        refreshBookings();
        return { success: true, booking: result.booking };
      } else {
        throw new Error(result.error || 'Failed to reschedule booking');
      }
    } catch (err) {
      console.error('Error rescheduling booking:', err);
      setError(err.message || 'Failed to reschedule booking');
      return { success: false, error: err.message || 'Failed to reschedule booking' };
    } finally {
      setLoading(false);
    }
  };

  // Submit a review for a completed booking
  const review = async (bookingId, reviewData) => {
    try {
      setLoading(true);
      const result = await submitReview(bookingId, reviewData);
      
      if (result.success) {
        // Update the local state with the reviewed booking
        setBookings(prev => {
          // Find the booking in the past list
          const targetBooking = prev.past.find(b => b._id === bookingId || b.id === bookingId);
          if (!targetBooking) return prev;
          
          // Add review to the booking
          const updatedBooking = {
            ...targetBooking,
            review: reviewData
          };
          
          // Return updated state
          return {
            ...prev,
            past: prev.past.map(b => 
              (b._id === bookingId || b.id === bookingId) ? updatedBooking : b
            )
          };
        });
        
        return { success: true };
      } else {
        throw new Error(result.error || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.message || 'Failed to submit review');
      return { success: false, error: err.message || 'Failed to submit review' };
    } finally {
      setLoading(false);
    }
  };

  // Get a specific booking by ID
  const getBookingById = (bookingId) => {
    for (const list of ['upcoming', 'pending', 'past', 'cancelled']) {
      const booking = bookings[list].find(b => b._id === bookingId || b.id === bookingId);
      if (booking) return booking;
    }
    return null;
  };

  // Context value
  const value = {
    bookings,
    loading,
    error,
    book,
    cancel,
    reschedule,
    review,
    refreshBookings,
    getBookingById
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the booking context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export default BookingContext;