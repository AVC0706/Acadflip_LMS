const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UnitSchema = mongoose.Schema({
    institute_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    unit_no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps:  true
})


const Unit = mongoose.model('Unit', UnitSchema)

module.exports = Unit