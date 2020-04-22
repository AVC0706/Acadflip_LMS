const mongoose = require('mongoose')
const validators = require('validators')
const bcrypt = require('bcryptjs')
const Teacher = require('./teacher')


const TeacherAssignSchema = mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
    },
    description: {
        type: String,
        required: true
    }
})

const TeacherAssign = mongoose.model('TeacherAssign', TeacherAssignSchema)

module.exports = TeacherAssign