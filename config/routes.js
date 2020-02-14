const express = require('express')
const router = express.Router()
const homeController = require('../app/controllers/homeController')
const usersController = require('../app/controllers/usersController')
const customersController = require('../app/controllers/customersController')
const authenticateUser = require('../app/middlewares/authentication')

router.get('/', homeController.welcome)

router.post('/users/', usersController.register)
router.post('/users/login', usersController.login)
router.delete('/users/logout', authenticateUser, usersController.logout)

// customer routes
router.get('/customers', authenticateUser, customersController.list)
router.post('/customers', authenticateUser, customersController.create)
router.get('/customers/:id', authenticateUser, customersController.show)
router.put('/customers/:id', authenticateUser, customersController.update)
router.delete('/customers/:id', authenticateUser, customersController.destroy)


module.exports = router