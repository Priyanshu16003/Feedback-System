const express = require("express")
const bodyParser = require("body-parser")
const response_routes = express.Router()
const Lecture = require("../models/LectureSchema")

response_routes.get("/download",(req,res)=>{
    res.render("download")
})

response_routes.post("/response",async (req,res)=>{

    const department= req.body.department
    const date = req.body.lecture_date
    const data = await Lecture.find({})
    .where('department').equals(department)
    .where('lectureDate').equals(date)
    .exec()
    .then(data => {
        console.log(data)
        res.render("download",{details:data})
    })

})

module.exports=response_routes