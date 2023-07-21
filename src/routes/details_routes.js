const express = require("express")
const bodyParser = require("body-parser")
const details_routes = express.Router()
const Lecture = require("../models/LectureSchema")

details_routes.post("/store_details",async (req,res)=>{
    const lecture_details =new Lecture({
        department: req.body.department,
        lectureTitle: req.body.lecture_title,
        facultyName: req.body.faculty_name,
        lectureDate: req.body.lecture_date,
        semesters: req.body.semester
    })
    const data =await lecture_details.save()
    console.log(data)
    
    // res.redirect("/home")
})

module.exports=details_routes