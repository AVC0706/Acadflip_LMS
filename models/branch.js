const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Teacher = require('./teacher')

const BranchSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    HOD: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

BranchSchema.virtual('teacher', {
    ref: 'Teacher',
    localField : '_id',
    foreignField: 'branch'
})
BranchSchema.virtual('subject', {
    ref: 'Subject',
    localField : '_id',
    foreignField: 'branch_id'
})
const Branch = mongoose.model('Branch', BranchSchema)

module.exports = Branch