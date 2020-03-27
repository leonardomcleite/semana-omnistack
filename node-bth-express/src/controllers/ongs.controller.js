const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
  async create(req, rsp) {
    const data = req.body;
    data.id = generateUniqueId()
    await connection('ongs').insert(data)
    return rsp.json({id: data.id})
  },
  async findAll(req, rsp) {
    const ongs = await connection('ongs').select('*')
    return rsp.json(ongs)
  },
  async delete(req, rsp) {
    await connection('ongs').where('id', req.params.id).delete()
    return rsp.status(204).send()
  },
}