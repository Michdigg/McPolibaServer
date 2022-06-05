const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    username: String,
    type: String // Admin | Chef | Customer
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "username"
});

exports.User = mongoose.model("User", userSchema);