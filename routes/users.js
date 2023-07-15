var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mongoApp")

var userSchema = mongoose.Schema({
  name: String,
  password: String,
  likes: {
    type: Array,
    default: []
  },
  photu: String,
  email: String
})

module.exports = mongoose.model("user",userSchema);
