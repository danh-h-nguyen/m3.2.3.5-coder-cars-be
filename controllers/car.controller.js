const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../helpers/utils.js");
const Car = require("../models/Car");
const carController = {};

// ✅ Create a new car
carController.createCar = async (req, res, next) => {
  try {
    const { make, model, price, release_date, size, style, transmission_type } =
      req.body;
    if (
      !make ||
      !model ||
      !price ||
      !release_date ||
      !size ||
      !style ||
      !transmission_type
    ) {
      throw new AppError(400, "Missing required fields", "Create Car Error");
    }
    const newCar = await Car.create({
      make,
      model,
      price,
      release_date,
      size,
      style,
      transmission_type,
    });
    sendResponse(res, 201, true, newCar, null, "Car created successfully");
  } catch (err) {
    next(err);
  }
};

// ✅ Get cars with pagination
carController.getCars = async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    const totalCars = await Car.countDocuments();

    const cars = await Car.find().skip(skip).limit(limit);

    sendResponse(
      res,
      200,
      true,
      { cars, totalPages: Math.ceil(totalCars / limit), currentPage: page },
      null,
      "List of cars retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};

// ✅ Update car by ID
carController.editCar = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const updateData = req.body;
    const updatedCar = await Car.findByIdAndUpdate(carId, updateData, {
      new: true,
    });
    if (!updatedCar)
      throw new AppError(404, "Car not found", "Update Car Error");
    sendResponse(res, 200, true, updatedCar, null, "Car updated successfully");
  } catch (err) {
    next(err);
  }
};

// ✅ Delete car by ID
carController.deleteCar = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar)
      throw new AppError(404, "Car not found", "Delete Car Error");
    sendResponse(res, 200, true, deletedCar, null, "Car deleted successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
