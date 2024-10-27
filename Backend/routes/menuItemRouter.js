const express=require("express");
const router=express.Router()
const MenuItem=require('../models/Menu');


router.post('/', async (req, res) => {
    try {
        const data = req.body //found all data in re.body
        const newMenu = new MenuItem(data); //create a new object

        const response = newMenu.save();
        console.log('data saved');
        res.status(200).json(response)

    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})


router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find(); //for find the all data which is present in the collection
        console.log('data fetched')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json("Internal server error", err)
    }
})

module.exports=router;