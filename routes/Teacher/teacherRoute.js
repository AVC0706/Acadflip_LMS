const express = require('express')
const Teacher = require('../../models/teacher')
const TeacherAssign = require('../../models/teacherAssign')
const Topic = require('../../models/topic')
const Subject = require('../../models/subject')
const Branch = require('../../models/branch')

const router = new express.Router()

router.get('/assignedsub', async (req,res)=> {
    try {
        await req.teacher.populate({
            path:'teacherAssign',
            match
        }).execPopulate()
        res.send(req.teacher.teacherAssign)
    } catch(e) {
        res.status(404).send()
    }
})

router.post('/createTopic', async (req,res) => {
    const topic = new Topic({
        ...req.body,
        teacher_id: req.teacher._id
    })

    try {
        await topic.save()
        res.status(201).send(topic)
    } catch(e) {
        res.status(400).send()
    }
} )