const express = require('express')
const router = express.Router()

const Profile = require('../models/profile')


router.post('/',async(req,res)=>{
    const profile = new Profile({
        name:req.body.name,
        email:req.body.email,
        displayProfile:req.body.displayProfile
    })
try{
    if(!await Profile.findOne({email:req.body.email})){
const newProfile = await profile.save(()=>res.status(201).json(
    {message:"profile created successfully"}
))
    }
    else{
        res.status(400).json({message:"Email already exist"})
    }
}catch(err){
res.status(401).json({message:"An error occurred"})
}

})

router.get('/',async(req,res)=>{
    try{
        const profile =  await Profile.find()
        res.json(profile)

    }
    catch(error){
        res.status(404).json({message:'No entry found'})

    }
    
})
router.get('/:id',async(req,res)=>{

    try {
        const profile =  await Profile.findOne({
            email:req.params.id
        })
        res.status(201).json(profile)
    } catch (error) {
        res.status(404).json({message:'Profile not found'})
    }
})

module.exports = router