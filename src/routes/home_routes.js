const express = require("express")
const bodyParser = require("body-parser")
const home_routes = express.Router()
const alert = require("alert")
const token = require("../routes/main_routes")

home_routes.get("/add_details",(req,res)=>{
    res.render("add_details")
})

home_routes.get("/get_response",(req,res)=>{
    res.render("get_response")
})

module.exports=home_routes