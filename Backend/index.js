const express = require("express")
const db = require("./db")
const cors = require('cors')
const app = express();
const passport =require('passport')
const LocalStrategy=require("passport-local").Strategy
const bodyParser = require("body-parser");//parse the data in req.body
app.use(bodyParser.json());
const personRoute=require('./routes/personRouter')
const menuRouter=require("./routes/menuItemRouter")

 
app.use(cors())

app.get('/', (req, res) => {
    res.json("Welcome in our hotels")
})

app.use('/person',personRoute)
app.use("/menu", menuRouter)

app.listen(5000, () => {
    console.log(" server is running on 5000")
})