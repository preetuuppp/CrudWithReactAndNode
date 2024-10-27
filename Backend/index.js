const express = require("express")
const db = require("./db")
const app = express();
const bodyParser = require("body-parser");//parse the data in req.body
app.use(bodyParser.json());
const personRoute=require('./routes/personRouter')
const menuRouter=require("./routes/menuItemRouter")


app.get('/', (req, res) => {
    res.json("Welcome in our hotels")
})

app.use('/person',personRoute)
app.use("/menu", menuRouter)

app.listen(5000, () => {
    console.log(" server is running on 5000")
})