const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  department: String,
  lectureTitle: String,
  facultyName: String,
  lectureDate: String,
  semesters: [Number]
});

const Lecture = mongoose.model('Lecture', LectureSchema);

module.exports = Lecture;