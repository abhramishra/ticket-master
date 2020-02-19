const Department = require('../models/department')
const Ticket = require('../models/ticket')
const Employee = require('../models/employee')

module.exports.list = (req,res) => {
    Department.find()
        .then(departments => {
            res.send(departments)
        }) 
        .catch((err) => {
            res.send(err)
        })
}

module.exports.create = (req,res) => {
    const body = req.body
    const department = new Department(body)
    department.save()
        .then(department => {
            res.send(department)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Department.findById(id)
        .then(department => {
            res.send(department)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Department.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(department => {
            res.send(department)
        })
        .catch(err => {
            res.send(err)
        })
} 

module.exports.destroy = (req,res) => {
    const id = req.params.id
    Ticket.find({ department: id })
        .then(ticket => {
            if (ticket.length) {
                res.status(200).send({ isDepartmentAttachedToTkt: true })
            } else {
                Employee.find({ department: id })
                    .then(employee => {
                        if (employee.length) {
                            res.status(200).send({ isDepartmentAttachedToEmp: true })
                        } else {
                            Department.findByIdAndRemove(id)
                                .then(department => {
                                    res.status(200).send(department)
                                })
                                .catch(err => {
                                    res.status(401).send(err)
                                })
                        }
                    })              
            }
        })
    
}