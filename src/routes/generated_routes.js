const express = require("express")
const bodyParser = require("body-parser")
const generated_routes = express.Router()
const Lecture = require("../models/Response")
const XLSX = require('xlsx')



module.exports=generated_routes