const Employee = require('../models/employee')

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
    Employee.findByIdAndRemove(id)
        .then(employee => {
            res.send(employee)
        })    
        .catch(err => {
            res.send(err)
        })
}