const Department = require('../models/department')

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
    Department.findByIdAndRemove(id)
        .then(department => {
            res.send(department)
        })
        .catch(err => {
            res.send(err)
        })
}