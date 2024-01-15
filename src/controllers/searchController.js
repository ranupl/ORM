const { Op } = require("sequelize");
const db = require("../models");
const httpError = require("http-errors");
const Global = db.global;
const User = db.users;
const Mapping = db.mapping;

// search by name
const getByName = async (req, res) => {
  try {
    const { name } = req.query;
    const results = await Global.findAll({
      where: {
        name: {
          [Op.like]: `${name}%`,
        },
      },
      order: [
        [
          db.sequelize.literal(`CASE WHEN name = '${name}' THEN 0 ELSE 1 END`),
          "ASC",
        ],
        ["name", "ASC"],
      ],
    });
    res.json(results);
  } catch (error) {
    console.log(error);
    return next(httpError.InternalServerError(error.message));
  }
};

// search by phone number
const getByPhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.query;
    const userId = req.user.userId;

    const registeredUserResult = await User.findOne({
      where: { phoneNumber: phoneNumber },
    });

    const result = await userInContact(phoneNumber, userId);

    if (registeredUserResult && result) {
      res.json([registeredUserResult]);
    } else {
      const allResults = await Global.findOne({
        where: {
          phoneNumber,
        },
      });

      const newResponse = {
        name: allResults.name,
        phoneNumber: allResults.phoneNumber,
      };

      res.json(newResponse);
    }
  } catch (error) {
    console.log(error);
    return next(httpError.InternalServerError(error.message));
  }
};

// search phone info
const getPhoneNumberInfo = async (req, res, next) => {
  try {
    const { phoneNumber } = req.query;
    const userData = await Global.findOne({
      where: { phoneNumber: phoneNumber },
    });

    if (!userData) {
      return next(httpError.NotFound("Phone number not found"));
    }

    const userInfo = {
      name: userData.name,
      phoneNumber: userData.phoneNumber,
    };

    res.json(userInfo);
  } catch (error) {
    console.log(error);
    return next(httpError.InternalServerError(error.message));
  }
};

// responsible for finding if phonenumber is a contact of user.
const userInContact = async (phoneNumber, userId) => {
  try {
    const user = await Mapping.findOne({ where: { phoneNumber, userId } });
    return !!user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getByName, getByPhoneNumber, getPhoneNumberInfo };
