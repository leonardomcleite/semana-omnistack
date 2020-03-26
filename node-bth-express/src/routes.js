const express = require('express')

const ongsController = require('./controllers/ongs.controller')
const incidentsController = require('./controllers/incidents.controller')
const profilesController = require('./controllers/profiles.controller')
const sessionsController = require('./controllers/session.controller')

const routes = express.Router()

routes.post('/login', sessionsController.login)

routes.post('/ongs', ongsController.create)
routes.get('/ongs', ongsController.findAll)
routes.delete('/ongs/:id', ongsController.delete)
routes.get('/ongs-profiles', profilesController.findById)

routes.post('/incidents', incidentsController.create)
routes.get('/incidents', incidentsController.findAll)
routes.delete('/incidents/:id', incidentsController.delete)

module.exports = routes