require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// CONNECT TO MONGODB ATLAS
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// REGEX VALIDATIONS
const cityRegex = /^[A-Za-z\s]+$/;
const zipRegex = /^\d{5}-\d{4}$/;
const phoneRegex = /^\d-\d{3}-\d{3}-\d{4}$/;
const websiteRegex = /^(http|https):\/\/[^ "]+$/;

// SCHEMA
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },

  address: {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: {
      type: String,
      required: true,
      match: cityRegex
    },
    zipcode: {
      type: String,
      required: true,
      match: zipRegex
    }
  },

  phone: {
    type: String,
    required: true,
    match: phoneRegex
  },

  website: {
    type: String,
    required: true,
    match: websiteRegex
  }
});

const User = mongoose.model("User", userSchema);

// POST API
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
