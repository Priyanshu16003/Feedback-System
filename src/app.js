const express = require("express")
const hbs = require("hbs")
const app = express()
const bodyParser = require("body-parser")
const path = require('path');
const mongoose = require("mongoose")
const routes = require('./routes/main_routes')
const home_routes = require('./routes/home_routes')
const details_routes = require('./routes/details_routes')
const response_routes = require('./routes/response_routes')
const download_routes = require('./routes/download_routes')
const generated_routes = require('./routes/generated_routes')
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use('/static',express.static("public"))
app.use('',routes)
app.use('',home_routes)
app.use('',details_routes)
app.use('',response_routes)
app.use('',download_routes)
app.use('',generated_routes)

// configure views, view engine and partials
const viewsPath = path.join(__dirname, '..', 'views');
const partialPath = path.join(__dirname, '..', 'views/partials');

app.set('view engine','hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialPath)

//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/Student_Response")
        .then(()=>{
            console.log("db Connected");
        }
)

//connectiong to server
app.listen(5500,()=>{
    console.log("Server Initiated")
});