const express=require("express");
const router=express.Router()
const Person = require("../models/person");

router.post('/', async (req, res) => {
    try {
        const data = req.body //found all data in re.body
        const newPerson = new Person(data); //create a new object

        const response = newPerson.save();
        console.log('data saved',response);
        res.status(200).json(response)

    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})


router.get("/", async (req, res) => {
    try {
        const data = await Person.find(); 
        console.log('data fetched')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json("Internal server error", err)
    }
});


router.get("/:workType", async(req,res)=>{
    try{
        const workType=req.params.workType;
        console.log('req.params',req.params)
        if(workType==="chef" ||workType==="manager"||workType==="waiter" )
        {
            const response =await Person.find({work:workType})
            console.log('data fetched')
       res.status(200).json(response)
        }else{
            res.status(404).json({err:'Invalid error'})
        }

    }catch(err){
        console.log(err)
        res.status(500).json({err:"Internal Error"})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const personId=req.params.id;//extract the person's Id from the URL parameter
const updatedPerson=req.body; //updated data for the person

console.log('updatedPerson',updatedPerson)

const response=await Person.findByIdAndUpdate(personId,updatedPerson,{
    new:true, //return the updated document
    runValidators:true //run mongoose validation
});

if(!response){
    return res.status(404).json({err:'Person not found'})
}
console.log('data updated')
res.status(200).json(response)

}
    catch(err){
      res.status(500).json({err:"person not found"})  
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//extract the person's Id from the URL parameter
     
        //assuming you have a personal modal
        const response=await Person.findByIdAndDelete(personId)
   
   if(!response){
    return res.status(404).json({error:"Person not found"})
   }
   console.log("data is deleted")
   res.status(200).json({message:"Person deleted successfully!"})
    }
    catch(err){
res.status(500).json({err:"Internal server error"})
    }
})

module.exports=router