const User = require('../models/User');
const Provider = require('../models/Provider');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getMe = catchAsync(async (req, res, next) => {
  let user;
  switch (req.user.role) {
    case 'client':
      user = await User.findById(req.user.id);
      break;
    case 'provider':
      user = await Provider.findById(req.user.id);
      break;
    default:
      return next(new AppError('Invalid user role', 400));
  }

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Filter out unwanted fields
  const filteredBody = filterObj(req.body, 'fullName', 'email', 'phoneNumber', 'bio');

  let updatedUser;
  switch (req.user.role) {
    case 'client':
      updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
      });
      break;
    case 'provider':
      updatedUser = await Provider.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
      });
      break;
    default:
      return next(new AppError('Invalid user role', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  switch (req.user.role) {
    case 'client':
      await User.findByIdAndUpdate(req.user.id, { active: false });
      break;
    case 'provider':
      await Provider.findByIdAndUpdate(req.user.id, { active: false });
      break;
    default:
      return next(new AppError('Invalid user role', 400));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

function filterObj(obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}