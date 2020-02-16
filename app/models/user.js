const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: function() {
                return 'Invalid email format'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }

        }
    ]
})

// mongoose pre method - it will invoke automatically before save
userSchema.pre('save', function(next) {
    console.log('before save pre invoked')
    const user = this
    if (user.isNew) {
        bcryptjs.genSalt(10)
        .then(salt => {
           bcryptjs.hash(user.password, salt)
            .then(excryptedPassword => {
                user.password = excryptedPassword
                next()
            })
        })
    } else {
        next()
    }
    
})

// own static method
userSchema.statics.findByCredential = function(email, password) {
    const User = this
    return User.findOne({email})
        .then((user) => {
            if (!user) {
                return Promise.reject('Invalid email')
            }
            console.log(password)
            return bcryptjs.compare(password, user.password)
                .then(result => {
                    console.log(result)
                    if (result) {
                        console.log(user)
                        return Promise.resolve(user)
                    } else {
                        return Promise.reject('Invalid password')
                    }
                })
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}

// static method
userSchema.statics.findByToken = function(token) {
    const User = this
    let userData
    try {
        userData = jwt.verify(token, 'jwt@123')
    }
    catch(error) {
        return Promise.reject(error)
    }
    return User.findOne({
        _id: userData._id,
        'tokens.token': token
    }) 
        // .then((user) => {
        //     return Promise.resolve(user)
        // })
        // .catch((err) => {
        //     return Promise.resolve(err)
        // })
}

// own instance method

userSchema.methods.generateToken = function() {
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username
    }
    const token = jwt.sign(tokenData, 'jwt@123')    // it will generate a new token
    user.tokens.push({
        token
    })
    console.log(user.tokens)
    return user.save()
        .then((user) => {
            return Promise.resolve(token)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

const User = mongoose.model('User', userSchema)



module.exports = User