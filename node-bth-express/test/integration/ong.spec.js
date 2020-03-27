const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('Ong', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('Create ong', async () => {
    const rsp = await request(app)
      .post('/ongs')
      .send({
        name: "Nova 1",
        email: "nova@gmail.com",
        whatsapp: "(11) 90000-0000",
        city: "Diadema",
        uf: "SP"
      })
    
      expect(rsp.body).toHaveProperty('id')
      expect(rsp.body.id).toHaveLength(8)
  })
})