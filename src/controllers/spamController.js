const httpError = require("http-errors");
const db = require("../models");
const Global = db.global;

// mark spam
const markSpam = async (req, res, next) => {
  try {
    const { phoneNumber, isSpam } = req.body;
    const isValidNumber = await Global.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (!isValidNumber) {
      return next(httpError.NotFound("Invalid Number"));
    }
    const updatedData = {
      isSpam: isSpam,
    };
    const [updateCount] = await Global.update(updatedData, {
      where: { phoneNumber: phoneNumber },
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return next(httpError.InternalServerError(error.message));
  }
};

// check number isSpam or not
const checkSpam = async (req, res, next) => {
  try {
    const { phoneNumber } = req.query;
    const globalData = await Global.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (!globalData) {
      return next(httpError.NotFound("Phone number not found"));
    } else {
      if (globalData.isSpam == true) {
        return res.status(200).json({ message: "Spam number" });
      } else {
        return res.status(200).json({ message: "Not a spam number" });
      }
    }
  } catch (error) {
    return next(httpError.InternalServerError(err.message));
  }
};

module.exports = {
  markSpam,
  checkSpam,
};
