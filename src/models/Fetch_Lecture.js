const mongoose = require('mongoose');

const FetchLecture = new mongoose.Schema([{
  department: String,
  lectureTitle: String,
  facultyName: String,
  lectureDate: String,
  semesters: [Number]
}]);

const Fetch_Lecture = mongoose.model('FetchLecture', FetchLecture);

module.exports = Fetch_Lecture;