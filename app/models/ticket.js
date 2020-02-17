const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    employees: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Employee'
        }
    ],
    message: {
        type: String,
        minlength: 8,
        maxlength: 120,
        required: true
    },
    priorities: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket