const connection = require('../database/connection')

module.exports = {
  async findById(req, rsp) {
    const incidents = await connection('incidents')
      .where('ong_id', req.headers.authorization)
      .select('*')

    return rsp.json(incidents)
  },
}