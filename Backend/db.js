const mongoose=require('mongoose');
require('dotenv').config();
const mongoURL=process.env.mongoURL

mongoose.connect(mongoURL)

const db= mongoose.connection;

db.on("connected",()=>{
    console.log("connected the Mongo Db")
})
module.exports=db;