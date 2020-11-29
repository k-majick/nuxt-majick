const User = require("../models/user");

exports.registerUser = async (req, res) => {
  try {
    let isUser = await User.find({
      email: req.fields.email
    });

    console.log(isUser);

    if (isUser.length >= 1) {
      return res.status(409).json({
        message: "E-mail already in use"
      });
    }

    let user = new User({
      name: req.fields.name,
      email: req.fields.email,
      password: req.fields.password
    });

    let userData = await user.save();
    let token = await user.generateAuthToken();

    res.status(201).json({
      userData,
      token
    });
  } catch (err) {
    res.status(400).json({
      err: err
    });
  }
};

exports.loginUser = async (req, res) => {

  try {
    const email = req.fields.email;
    const password = req.fields.password;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({
        error: "Login failed! Check authentication credentials"
      });
    }

    const token = await user.generateAuthToken();

    res.status(201).json({
      user,
      token
    });
  } catch (err) {
    res.status(400).json({
      err: err
    });
  }
};

// exports.getUserDetails = async (req, res) => {
//   await res.json(req.userData);
// };
