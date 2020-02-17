const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: function() {
                return 'Invalid email'
            }
        }
    },
    
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    }
})

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee