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

module.exports.show = (req,res) => {
    const id = req.params.id
    Ticket.findById(id).populate('customer').populate('department').populate('employees') 
        .then(ticket => {
            res.send(ticket)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Ticket.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(ticket => {
            res.send(ticket)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    Ticket.findByIdAndRemove(id)
        .then(ticket => {
            res.send(ticket)
        })
        .catch(err => {
            res.send(err)
        })
}