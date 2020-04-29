const User = require('../models/user')

module.exports.register = (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            res.status('200').send(user)
        })
        .catch(err => {
            res.status('401').send(err)
        })
}

module.exports.login = (req,res) => {
    const { email, password } = req.body
    let user
    User.findByCredential(email, password)
        .then((userFound) => {
            user = userFound
            return user.generateToken()
            // res.send(user)
        })
        .then((token) => {
            user = {_id: user._id,username: user.username,email: user.email}
            res.header('x-auth', token).send(user)
            // res.setHeader('x-auth', token).send({abc})
        })
        .catch((err) => {
            res.status(401).json({error: err})
        })
}

module.exports.account = (req,res) => {
    const user = req.user   // req.user data is comming from authenticateUser
    res.send(user)
}

module.exports.logout = (req, res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, {$pull: { tokens: { token: token }}})
        .then((user) => {
            res.status(200).send('log out')
        })
        .catch((err) => {
            res.send(err)
        }) 
}

