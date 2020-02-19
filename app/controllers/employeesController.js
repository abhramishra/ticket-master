const Employee = require('../models/employee')
const Ticket = require('../models/ticket')

module.exports.list = (req,res) => {
    Employee.find().populate('department')
        .then(employee => {
            res.send(employee)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.create = (req,res) => {
    const body = req.body 
    const employee = new Employee(body)
    employee.save()
        .then(employee => {
            res.send(employee)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Employee.findById(id)
        .then(employee => {
            res.send(employee)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Employee.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(employee => {
            res.send(employee)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    Ticket.find( {employees: id} )
        .then(ticket => {
            if (ticket.length) {
                res.status(200).send({ isEmployeeAttachedToTkt: true })
            } else {
                Employee.findByIdAndRemove(id)
                    .then(employee => {
                        res.status(200).send(employee)
                    })    
                    .catch(err => {
                        res.status(401).send(err)
                    })
            }
        })
        .catch(err => {
            res.status(401).send(err)
        })
}