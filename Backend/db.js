const mongoose=require('mongoose');
require('dotenv').config();
// const mongoURL=process.env.mongoURL
const mongoURL="mongodb://localhost:27017/hotels"
mongoose.connect(mongoURL)

const db= mongoose.connection;

db.on("connected",()=>{
    console.log("connected the Mongo Db")
})
module.exports=db;