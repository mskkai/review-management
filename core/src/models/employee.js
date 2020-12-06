const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const { APP_MESSAGES } = require("../utils/app-constants");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    employeeId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
      validate(value) {
        if (!value.includes("EMP")) {
          throw new Error(APP_MESSAGES.INVALID_EMPLOYEEID);
        }
      },
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "employee",
      trim: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(APP_MESSAGES.INVALID_EMAILID);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error(APP_MESSAGES.INVALID_PASSWORD);
        }
      },
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error(APP_MESSAGES.INVALID_AGE);
        }
      },
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine2: {
      type: String,
      required: false,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    zipcode: {
      type: Number,
      default: 0,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error(APP_MESSAGES.INVALID_ZIPCODE);
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.methods.generateAuthToken = async function () {
  const employee = this;
  const token = jwtToken.sign(
    { _id: employee._id.toString() },
    process.env.JWT_SECRET_CODE
  );
  employee.tokens = employee.tokens.concat({ token });
  await employee.save();
  return token;
};

// employeeSchema.methods.toJSON = function () {
//   const employee = this;
//   const employeeObject = employee.toObject();
//   delete employeeObject.password;
//   delete employeeObject.tokens;
//   delete employeeObject.addressLine1;
//   delete employeeObject.addressLine2;
//   delete employeeObject.city;
//   delete employeeObject.state;
//   delete employeeObject.country;
//   delete employeeObject.zipcode;
//   return employeeObject;
// };

employeeSchema.statics.findByCredentials = async (emailId, password) => {
  const employee = await Employee.findOne({ emailId });
  if (!employee) {
    throw new Error(APP_MESSAGES.EMPLOYEE_NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(password, employee.password);

  if (!isMatch) {
    throw new Error(APP_MESSAGES.INCORRECT_PASSWORD);
  }

  return employee;
};

//Hashing the password before saving
employeeSchema.pre("save", async function (next) {
  const employee = this;
  if (employee.isModified("password")) {
    employee.password = await bcrypt.hash(employee.password, 8);
  }
  next();
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
