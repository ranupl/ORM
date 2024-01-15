const db = require("../models");
const jwt = require("jsonwebtoken");
const httpError = require("http-errors");

const User = db.users;
const Global = db.global;
const Mapping = db.mapping;

// register user
const registerUser = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    const isExist = await User.findOne({ where: { phoneNumber: phoneNumber } });
    if (isExist) {
      return next(httpError.BadRequest("Phone number already exists!"));
    }

    const user = await User.create({
      name,
      phoneNumber,
      email,
      password,
    });

    const response = await insertOrUpdate(phoneNumber, name, email);

    res.json({ user, response });
  } catch (error) {
    return next(httpError.InternalServerError(error.message));
  }
};

// login user
const loginUser = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) {
      return next(httpError.NotFound("User not found"));
    } else if (phoneNumber == null || password == null) {
      return next(
        httpError.BadRequest("Password and PhoneNumber are required !")
      );
    } else {
      if (user.phoneNumber === phoneNumber && user.password === password) {
        const token = jwt.sign({ userId: user.id }, "instahyre_secret", {
          expiresIn: "7d",
        });
        res.json({ token });
      } else {
        return next(httpError.BadRequest("invalid credientials !"));
      }
    }
  } catch (error) {
    return next(httpError.InternalServerError(err.message));
  }
};

// add contact - created for testing purpose
const addContact = async (req, res) => {
  try {
    const { name, phoneNumber, email, isSpam } = req.body;
    const userId = req.user.userId;

    const contact = await Global.create({ name, phoneNumber, email, isSpam });

    await Mapping.create({
      userId,
      globalId: contact.id,
      phoneNumber: contact.phoneNumber,
    });

    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// insertOrUpdate function insert the data in the global user table if not available, and upates the global user table data if available for a perticular user id with past spam status.
const insertOrUpdate = async (phoneNumber, name, email) => {
  let globalUser;
  const isUserExistInGlobal = await Global.findOne({
    where: { phoneNumber: phoneNumber, name: name },
  });

  if (!isUserExistInGlobal) {
    return;
  }

  const userDetail = {
    name: isUserExistInGlobal.name,
    phoneNumber: isUserExistInGlobal.phoneNumber,
    email: email,
    isSpam: isUserExistInGlobal.isSpam,
  };

  if (isUserExistInGlobal) {
    await Global.update(userDetail, { where: { phoneNumber: phoneNumber } });
  } else {
    globalUser = await Global.create({
      name,
      phoneNumber,
      email,
      isSpam: false,
    });
  }

  return globalUser;
};

module.exports = {
  registerUser,
  loginUser,
  addContact,
};
