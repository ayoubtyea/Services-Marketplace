const Earnings = require('../models/Earnings');
const Booking = require('../models/Booking');

exports.createEarning = async (req, res) => {
    try {
      const newEarning = await Earnings.create({
        provider: req.user.id,
        amount: req.body.amount,
        booking: req.body.bookingId,
        status: 'pending' // or 'completed' based on your logic
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          earning: newEarning
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };

exports.getEarnings = async (req, res) => {
  try {
    // Calculate earnings from completed bookings
    const bookings = await Booking.aggregate([
      {
        $match: {
          provider: mongoose.Types.ObjectId(req.user.id),
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$price' },
          count: { $sum: 1 }
        }
      }
    ]);

    const earnings = bookings.length > 0 ? bookings[0] : { totalEarnings: 0, count: 0 };

    res.status(200).json({
      status: 'success',
      data: {
        earnings
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getEarningsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const earnings = await Booking.aggregate([
      {
        $match: {
          provider: mongoose.Types.ObjectId(req.user.id),
          status: 'completed',
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalEarnings: { $sum: '$price' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        earnings
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};