const express = require("express")
const bodyParser = require("body-parser")
const routes = express.Router()
const alert = require("alert")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Login_Cred = require("../models/Login_Cred")
routes.use(bodyParser.urlencoded({ extended: true }))

const secret_key = "Gdec_Secret_Key"

routes.get("/",(req,res)=>{
    console.log("showing index.hbs")
    res.render("index")
})

routes.get("/home", (req, res) => {
    const token = req.query.token

    // Verify the token
    jwt.verify(token, secret_key, (err, user) => {
        if (err) {
            console.error(err)
            return res.status(403).json({ error: "Invalid token" })
        }

        // Authentication successful, render the home page
        res.render("home")
    })
})

routes.get("/register",(req,res)=>{
    res.render("register")
})

Login_Cred.authenticate = async function (user_name, password) {
    const user = await this.findOne({ user_name })

    if (!user) {
        throw new Error("Invalid user name or password")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Invalid user name or password")
    }

    return user
}

// Define a method for the user model to generate a JWT token
Login_Cred.prototype.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, secret_key)
    return token
}

// Middleware to parse JSON request bodies
routes.use(bodyParser.json())

// Register a new user endpoint
routes.post("/register", async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // Create a new user
        const user = new Login_Cred({
            user_name: req.body.user_name,
            password: hashedPassword,
        })

        // Save the user to the database
        await user.save()

        res.json({ message: "User registered successfully" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

// Login endpoint
routes.post("/login", async (req, res) => {
    try {
        const user = await Login_Cred.authenticate(
          req.body.user_name,
          req.body.password
        )

        // Generate a JWT token
        const token = user.generateAuthToken()

        res.redirect(`/home?token=${token}`)
    } catch (err) {
        console.error(err)
        res.status(401).json({ error: "Invalid user name or password" })
    }
})

// Protected endpoint
routes.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected endpoint" })
})

// Middleware function to authenticate the JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) {
        return res.status(401).json({ error: "Authorization header missing" })
    }

    jwt.verify(token, secret_key, (err, user) => {
        if (err) {
            console.error(err)
            return res.status(403).json({ error: "Invalid token" })
        }

        req.user = user
        next()
    })
}

module.exports=routes