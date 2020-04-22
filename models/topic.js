const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const TopicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    teacher_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    },
},{
    timestamps: true
})

TopicSchema.virtual('teacher', {
    ref: 'Teacher',
    localField: '_id',
    foreignField: 'topic_id'
})


const Topic = mongoose.model('Topic', TopicSchema)

module.exports = Topic
