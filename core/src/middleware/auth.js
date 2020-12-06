const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");
const { APP_MESSAGES, AUTHORIZATION } = require("../utils/app-constants");

const auth = async (req, res, next) => {
  try {
    const token = req
      .header(AUTHORIZATION.AUTH_TOKEN)
      .replace(AUTHORIZATION.BEARER_TEXT, "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
    const employee = await Employee.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!employee) {
      throw new Error();
    }
    req.token = token;
    req.employee = employee;
    next();
  } catch (e) {
    res.status(401).send({ error: APP_MESSAGES.UNAUTHORIZED });
  }
};

module.exports = auth;
