const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Model = require("./models");
const jwt = require("jsonwebtoken");
const User = Model.User;
const Vehicle = Model.Vehicle;
const Staff = Model.Staff;
mongoose.connect(process.env.DB_STRING, () => {
  app.listen(process.env.PORT || 3000);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("api/user/login", async (req, res) => {
  if (req.body) {
    const email = req.body.email;
    const password = req.body.password;
    await User.findOne({ email: email, password: password })
      .then((result) => {
        if (result) {
          const token = jwt.sign({ _id: result.id }, process.env.TOKEN_SECRET);
          res.status(200);
          res
            .header("auth-token", token)
            .json({ message: "Login successful", token: token });
        } else {
          res.status(404).json({ message: "Incorrect Credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } else {
    res.status(404).json({ message: "Invalid Entry" });
  }
  <input type="hidden" name="category" value="staff" />;
});
app.post("api/user/register-admin", async (req, res) => {
  if (req.body) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const title = req.body.title;
    await User.findOne({ email: email })
      .then(async (result) => {
        if (result) {
          res.status(404).json({ message: "Member Aleady Exists" });
        } else {
          const user = new User();
          user.email = email;
          user.password = password;
          user.title = title;
          user.name = name;
          user.isStaff = true;
          await user
            .save()
            .then((saved) => {
              res
                .status(200)
                .json({ message: "Member Created", member: saved });
            })
            .catch((err) => {
              res.status(404).json({ message: "An Error Occurred" });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } else {
    res.status(404).json({ message: "Invalid Entry" });
  }
});
app.post("api/register-staff", async (req, res) => {
  if (req.body) {
    const name = req.body.name;
    const department = req.body.department;
    const title = req.body.title;
    const regNumber = req.body.regNumber;
    const staff = new Staff();
    await Staff.findOne({ name: name })
      .then(async (result) => {
        if (result) {
          res
            .status(404)
            .json({ message: "Staff with the same name already exists" });
        } else {
          staff.title = title;
          staff.department = department;
          staff.regNumber = regNumber;
          staff.name = name;
          staff
            .save()
            .then((saved) => {
              res.json({ message: "Staff Created" });
            })
            .catch((err) => {
              res.json({ message: "An Error Occurred" });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } else {
    res.status(404).json({ message: "Invalid Entry" });
  }
});
app.get("api/members-list", async (req, res) => {
  await User.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get("api/vehicles-list", async (req, res) => {
  await Vehicle.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get("api/datas", async (req, res) => {
  const users = await User.find();
  const staffs = await Staff.find();
  const vehicle = await Vehicle.find();
  res.json({ users: users, vehicles: vehicles, staffs: staffs });
});
