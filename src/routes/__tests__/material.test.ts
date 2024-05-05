import build from './../../build'
import { Material } from './../../models/material'
import { GetMaterialsInterface } from './../material/schema'
import { Attributes } from 'sequelize'

describe('Material API', () => {
  let app: ReturnType<typeof build>
  beforeAll(() => {
    app = build({ prefix: '/api' })
  })

  it('Create material successfully', async () => {
    const res = await app.inject({
      url: '/api/material',
      method: 'POST',
      payload: {
        nombre: 'Cucharas',
        cantidad: 1
      }
    })

    expect(res.statusCode).toBe(200)
    const material = res.json<Attributes<Material>>()

    const row = await app.Services.material().getById(material.codigo)
    expect(row).toBeTruthy()
  }, 5000)
  it('Get material by ID succesfully', async () => {
    const res = await app.inject({ method: 'GET', url: 'api/material/1' })
    expect(res.statusCode).toBe(200)
  }, 5000)
  it('Get inexistent material by ID sucessfully', async () => {
    const res = await app.inject({ method: 'GET', url: 'api/material/1000' })
    expect(res.statusCode).toBe(204)
  }, 5000)
  it('Get materials with limit succesfully', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/material',
      query: {
        limit: '1'
      }
    })
    expect(res.statusCode).toBe(200)
    const materials = res.json<GetMaterialsInterface['Reply']>()
    expect(materials).toHaveProperty('limit')
    expect(materials.rows.length).toBeGreaterThanOrEqual(1)
    expect(materials.count).toBeGreaterThanOrEqual(1)
  }, 5000)
})
