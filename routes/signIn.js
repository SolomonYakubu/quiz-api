const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Profile = require('../models/profile')


router.post('/',async(req,res)=>{
    const {email,password} =  req.body;

    try {
        const profile =  await Profile.findOne({
            email:email
        })
        const hashedPassword = profile.password
        const check = await bcrypt.compare(password,hashedPassword)
        if(check){
           
            res.json({message:'successful',profile_id:profile.profile_id})
            
        }
        else{
            res.status(403).json({message:'invalid details'})
        }
    } catch (error) {
        res.status(404).json({message:"Email not registered"})
    }
})

module.exports = router;