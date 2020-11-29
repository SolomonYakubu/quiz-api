const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Profile = require('../models/profile')
const Quiz = require('../models/quiz')



router.get('/',async(req,res)=>{

    try{
        const profile =  await Profile.find()
        res.json(profile)

    }
    catch(error){
        res.status(404).json({message:'No entry found'})

    }
    
})

router.get('/quiz',async(req,res)=>{

    try{
        const quiz =  await Quiz.find()
        res.json(quiz)

    }
    catch(error){
        res.status(404).json({message:'No entry found'})

    }
    
})
router.get('/quiz/:id',async(req,res)=>{

    try {
        const quiz =  await Quiz.find({profile_id:req.params.id})
        res.json(quiz)
       
    } catch (error) {
        res.status(404).json({message:'quiz not found'})
    }
})

module.exports = router