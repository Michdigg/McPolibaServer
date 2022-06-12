const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const userSchema = mongoose.Schema({
    username: String,
    type: String, // Admin | Chef | Customer
    authStrategy: {
        type: String,
        default: "local",
    },
    points: {
        type: Number,
        default: 50,
    },
    refreshToken: {
        type: [Session],
    }
});

userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

userSchema.plugin(passportLocalMongoose)

exports.User = mongoose.model("User", userSchema);