const Customer = require('../models/customer')

module.exports.list = (req,res) => {
    Customer.find()
        .then(customer => {
            res.status(200).json(customer)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.create = (req,res) => {
    const body = req.body
    const customer = new Customer(body)
    customer.save()
        .then(customer => {
            res.status(200).json(customer)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Customer.findById(id)
        .then((customer) => {
            res.status(200).json(customer)
        })
        .catch((err) => {
            res.status(401).json(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((customer) => {
            res.status(200).json(customer)
        })
        .catch((err) => {
            res.status(401).json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    Customer.findByIdAndRemove(id)
        .then(customer => {
            res.status(200).json(customer)
        })
        .catch(err => {
            res.status(401).json(err)
        })
}