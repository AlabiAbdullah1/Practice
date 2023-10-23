const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please input your name"]
  },

  email: {
    type: String,
    required: [true, "Please Enter an Email"],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter a password"],
    minlength: [8, "Minimum password length is 8 characters"],
  },
  passwordconfirm: {
    type: String,
    required: [true, "password does not match"],
    validate: {
      validator: function (el) {
        if (el === this.password) console.log("Success");
        else {
          throw Error("Password not match!");
        }
      },
    },
  },
});

userSchema.pre('save', async function(next){
    const salt= await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password, salt)
    this.passwordconfirm=undefined;
    next()
})

const User = mongoose.model("user", userSchema);

module.exports = User;
