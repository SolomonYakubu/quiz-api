const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Profile = require('../models/profile')


router.post('/',async(req,res)=>{
 
try{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const profile = new Profile({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        displayProfile:req.body.displayProfile
    })
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


module.exports = router