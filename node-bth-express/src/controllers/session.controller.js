const connection = require('../database/connection')

module.exports = {
  async login(req, rsp) {
    const ong = await connection('ongs')
      .where('id', req.body.id)
      .select('name')
      .first()

      if (!ong)
      return rsp.status(400).json({error: 'Ong is not available'})
    else
      return rsp.json(ong)
  },
}