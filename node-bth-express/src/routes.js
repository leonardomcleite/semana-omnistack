const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const ongsController = require('./controllers/ongs.controller')
const incidentsController = require('./controllers/incidents.controller')
const profilesController = require('./controllers/profiles.controller')
const sessionsController = require('./controllers/session.controller')

const routes = express.Router()

routes.post('/login', sessionsController.login)

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}),ongsController.create)
routes.get('/ongs', ongsController.findAll)
routes.delete('/ongs/:id', ongsController.delete)
routes.get('/ongs-profiles', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), profilesController.findById)

routes.post('/incidents', incidentsController.create)
routes.get('/incidents', incidentsController.findAll)
routes.delete('/incidents/:id', incidentsController.delete)

module.exports = routes