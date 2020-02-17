const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date
    }
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department