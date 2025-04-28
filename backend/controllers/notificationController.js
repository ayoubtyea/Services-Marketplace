const Notification = require('../models/Notification');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: notifications.length,
      data: {
        notifications
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        notification
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({
      status: 'success',
      message: 'All notifications marked as read'
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};