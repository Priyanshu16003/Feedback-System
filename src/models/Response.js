const mongoose = require("mongoose")

const Response = mongoose.Schema({
    lecture_title: String,
    faculty_name: String,
    semester: String,
    sub_date: String,
    overall_organization: String,
    relevent_content: String,
    satisfied_time_venue: String,
    intresting_session: String,
    lecture_topic_cover: String,
    opinion_on_speaker: String,
    useful_session: String,
    overall_effectiveness: String,
    additional_comments: String
})

module.exports=mongoose.model("Response",Response)