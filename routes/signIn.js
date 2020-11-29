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
            res.json({message:'successful'})
        }
        else{
            res.status(403).json({message:'invalid details'})
        }
    } catch (error) {
        res.status(404).json({message:error})
    }
})

module.exports = router;