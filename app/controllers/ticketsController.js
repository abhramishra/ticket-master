const Ticket = require('../models/ticket')

module.exports.list = (req,res) => {
    Ticket.find().populate('customer').populate('department').populate('employees')
        .then(tickets => {
            res.send(tickets)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.create = (req,res) => {
    const body = req.body
    const ticket = new Ticket(body)
    ticket.save()
        .then(ticket => {
            res.send(ticket)
        })
        .catch(err => {
            res.send(err)
        })
}