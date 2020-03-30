const connection = require('../database/connection')

module.exports = {
  async create(req, rsp) {
    const data = req.body;
    data.ong_id = req.headers.authorization
    const [id] = await connection('incidents').insert(data)
    return rsp.json({id})
  },
  async findAll(req, rsp) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count()
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.city',
        'ongs.uf',
        'ongs.whatsapp',
      ])

    rsp.header('X-Total-Count', count['count(*)'])
    rsp.header('Access-Control-Expose-Headers', 'X-Total-Count')
    return rsp.json(incidents)
  },
  async findById(req, rsp) {
    const incident = await connection('incidents')
      .where('id', req.params.id)
      .select('*')
      .first()

      if (incident == null)
      return rsp.status(404).json({error: 'Incident is not available'})
    else
      return rsp.json(incident)
  },
  async delete(req, rsp) {
    const incident = await connection('incidents')
      .where('id', req.params.id)
      .select('ong_id')
      .first()

    if (incident.ong_id !== req.headers.authorization)
      return rsp.status(401).json({error: 'Operated not permitted'})
    else
      await connection('incidents').where('id', req.params.id).delete()

    return rsp.status(204).send()
  },
}