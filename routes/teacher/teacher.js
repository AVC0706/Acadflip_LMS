const express = require("express");
const router = express.Router();
const Teacher = require("../../models/teacher");
const TeacherAssign = require("../../models/teacherAssign");
const Topic = require('../../models/topic')
const Unit = require('../../models/unit')
const teacherAuth = require('../../middleware/Teacher/teacher')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require("config");


router.post("/login", async (req,res) => {
      const {email, password} = req.body
      
    try {
      let teacher = await Teacher.findOne({email});
      if(!teacher) {
        return res.status(400).json({msg: "Invalid email pass"})
      }

      const isMatch = await bcrypt.compare(password, teacher.password)

      if(!isMatch) {
        return res.status(400).json({msg: "Invalid email or password"})
      }

      const payload = {
        teacher : {
          id: teacher.id,
        },
      };

      jwt.sign(payload,config.get("jwtSecret"), {expiresIn:36000}, (err,token)=> {
        if(err) {
          throw err
        }

        console.log("teacher logged in")
        res.json({token,teacher})
      })
    } catch(e) {
        console.log(e)
        res.status(500).send("server error")
    }
  })

  router.get("/isTeacher", [teacherAuth], (req, res) => {
    console.log("teacher login");
    res.json({  user: req.user, msg: "Principal teacher" });
  });
  
  router.get('/particularAssignedSub', [teacherAuth], async (req,res) => {
    console.log("all assigned subjects of teacher" + req.user.teacher_id)
    try {
      let sub = await TeacherAssign.find({institute_id: req.user.institute_id, teacher_id: req.user.teacher_id})
  
      console.log("subject seen!")
  
      res.json(sub)
  
    } catch(e) {
      console.log(e)
      res.status(500).send(e)
    }
  })
  
  router.post('/createUnit', [teacherAuth],async (req,res)=> {
    console.log('process started for creating topic');
    const {unit_no, name,description,subject_id} = req.body
    try { 
      let unit = Unit.find({unit_no})
      if(unit) {
        res.status(400).send()
      }
  
      const newUnit = new Unit({
        unit_no,
        name,
        description,
        subject_id,
        institute_id: req.user.institute_id
      })
  
     await newUnit.save()
     res.json({msg:'teacher added successfully', newUnit})
  
    } catch(e) {
      console.log(e.message)
      res.status(500).send(e.message)
    }
  })
  
  router.get('/getUnit',[teacherAuth], async (req,res)=> {
    try {
    const unit = await Unit.find({institute_id: req.user.institute_id,})
    if(!unit) {
      throw new Error('unit is not present first create the units')
    } 
  
    res.send(unit)
  } catch(e) {
    res.status(500).send(e)
  }
  })
  
  router.post('/createTopic', [teacherAuth], async (req,res)=> {
    const {name,description,unit,is_active} = req.body
  
    try {
      const unit_object = await Unit.find({name: unit})
      console.log(unit_object)
      if(!unit_object) {
        throw new Error('create unit first')
      }
  
      const newTopic = new Topic({
        name,
        description,
        unit_id: unit_object._id,
        teacher_id: req.user.id,
        institute_id: req.user.institute_id,
        is_active
      })
  
      await newTopic.save()
      res.status(201).send(newTopic)
    } catch(e) {
      console.log(e.message)
      res.status(500).send(e.message)
    }
  })
  
  router.get('/getTopic',[teacherAuth], async(req,res)=> {
    try {
      const topic = await Topic.find({unit_id,teacher_id: req.user.id,institute_id: req.user.institute_id})
      if(!topic) {
        res.status(400).send('no topic presented')
      }
      console.log(topic)
      res.send(topic)
    } catch(e) {
      res.status(500).send(e)
    }
  })

  module.exports = router