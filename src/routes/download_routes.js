const express = require("express")
const bodyParser = require("body-parser")
const download_routes = express.Router()
const XLSX = require('xlsx')
const Lecture = require("../models/Response")
var data = null

download_routes.post("/response_table", async (req, res) => {

    const faculty_name = req.body.faculty_name
    const lecture_title = req.body.lecture_title
    console.log("hello")
    console.log(faculty_name)
    console.log(lecture_title)
    console.log("bye")
    data = await Lecture.find({})
        .where('faculty_name').equals(faculty_name)
        .where('lecture_title').equals(lecture_title)
        .exec()
        .then(data => {
            const dataArray = data.map(item => {
              return {
                lecture_title: item.lecture_title,
                faculty_name: item.faculty_name,
                semester: item.semester,
                sub_date: item.sub_date,
                overall_organization: item.overall_organization,
                relevent_content: item.relevent_content,
                satisfied_time_venue: item.satisfied_time_venue,
                intresting_session: item.intresting_session,
                lecture_topic_cover: item.lecture_topic_cover,
                opinion_on_speaker: item.opinion_on_speaker,
                useful_session: item.useful_session,
                overall_effectiveness: item.overall_effectiveness,
                additional_comments: item.additional_comments
              }
            })
        
            console.log(dataArray)
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(dataArray);
        
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            const buffer = XLSX.write(workbook, { type: 'buffer' });
        
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');
        
            res.send(buffer);
        })

})


module.exports = download_routes