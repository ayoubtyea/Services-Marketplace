const Service = require('../models/Service');
const authMiddleware = require('../middleware/auth');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user.id });

    res.status(200).json({
      status: 'success',
      results: services.length,
      data: {
        services
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.params.id, provider: req.user.id });

    res.status(200).json({
      status: 'success',
      data: {
        service
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.createService = async (req, res) => {
  try {
    const newService = await Service.create({
      ...req.body,
      provider: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: {
        service: newService
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, provider: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        service
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findOneAndDelete({ _id: req.params.id, provider: req.user.id });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};