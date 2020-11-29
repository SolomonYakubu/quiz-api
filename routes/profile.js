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
        const password = profile.password
        const unHashedPassword = await bcrypt.compare("solomo",password)
        res.status(201).json(unHashedPassword)
    } catch (error) {
        res.status(404).json({message:'Profile not found'})
    }
})

module.exports = router