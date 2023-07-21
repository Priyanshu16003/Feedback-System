const mongoose = require("mongoose")

const Login_Cred = mongoose.Schema({
    user_name: String,
    password: String
})

module.exports=mongoose.model("Login_Cred",Login_Cred)