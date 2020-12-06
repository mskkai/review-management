const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const { APP_MESSAGES } = require("../utils/app-constants");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");

router.use(cors());
// const {
//   sendWelcomeEmail,
//   sendCancellationEmail,
// } = require("../emails/account");

/**
 * API to handle employee login
 */
router.post("/employee/login", async (req, res) => {
  try {
    const employee = await Employee.findByCredentials(
      req.body.emailId,
      req.body.password
    );

    const token = await employee.generateAuthToken();
    res.send({ employee, token });
  } catch (e) {
    res.status(400).send({
      error: {
        message: APP_MESSAGES.LOGIN_FAILURE,
      },
    });
  }
});

/**
 * Api to handle employee logout
 */
router.post("/employee/logout", auth, async (req, res) => {
  try {
    req.employee.tokens = req.employee.tokens.filter(
      (token) => token.token != req.token
    );
    await req.employee.save();
    res.send();
  } catch (e) {
    res.status(500).send({
      error: {
        message: APP_MESSAGES.LOGOUT_FAILURE,
      },
    });
  }
});

router.post("/employee", auth, async (req, res) => {
  const employee = new Employee(req.body);
  try {
    await employee.save();
    //sendWelcomeEmail(employee.emailId, employee.name);
    res.status(201).send({
      employee,
      success: {
        message: APP_MESSAGES.ADD_EMPLOYEE_SUCCESS,
      },
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/employee/logoutall", auth, async (req, res) => {
  try {
    req.employee.tokens = [];
    await req.employee.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//Get employee
router.get("/employees", auth, async (req, res) => {
  Employee.find({}).then(function (employees) {
    res.send(employees);
  });
});

//Update employee by id
router.patch("/employee", auth, async (req, res) => {
  const employeeToUpdate = new Employee(req.body);
  const updates = Object.keys(req.body);
  try {
    let employee = await Employee.findOne({
      employeeId: employeeToUpdate.employeeId,
    });
    if (employee) {
      updates.forEach((update) => {
        employee[update] = employeeToUpdate[update];
      });
      await employee.save();
      res.status(200).send({
        employee,
        success: {
          message: APP_MESSAGES.UPDATE_EMPLOYEE_SUCCESS,
        },
      });
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//Delete employee
router.delete("/employee", auth, async (req, res) => {
  const employeeToDelete = new Employee(req.body);
  try {
    const employee = await Employee.findOne({
      employeeId: employeeToDelete.employeeId,
    });
    if (employee) {
      await employee.remove();
      //sendCancellationEmail(req.employee.emailId, req.employee.name);
      res.status(200).send({
        employee,
        success: {
          message: APP_MESSAGES.DELETE_EMPLOYEE_SUCCESS,
        },
      });
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

//Multer configuration for uploading files
const upload = multer({
  //dest: 'avatars', //uploads file to destination
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Upload only image file"));
    }
    cb(undefined, true);
  },
});

//Avatar reading, saving and deleting
router.post(
  "/employee/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.employee.avatar = buffer;
    await req.employee.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/employee/:id/avatar", auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee || !employee.avatar) {
      throw new Error();
    }
    req.employee.avatar = undefined;
    await req.employee.save();
    res.send();
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/employee/:id/avatar", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee || !employee.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(employee.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
