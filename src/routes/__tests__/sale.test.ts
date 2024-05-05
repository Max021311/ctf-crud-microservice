import build from './../../build'
import { PostSaleInterface } from './../sale/schema'

describe('Sale API', () => {
  let app: ReturnType<typeof build>
  beforeAll(() => {
    app = build({ prefix: '/api' })
  })

  it('Create sale succesfully', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/sale',
      payload: {
        rfc_empleado: 'DIMM030911ER1',
        codigo_ruta: 1,
        entriesOfSale: [{
          codigo_producto: 1,
          cantidad: 2,
          precio: 30
        }],
        removeMaterials: [{
          codigo_material: 1,
          cantidad: 1
        }]
      }
    })

    const response = res.json<PostSaleInterface['Reply']>()
    expect(res.statusCode).toEqual(200)
    expect(response).toHaveProperty('codigo')
  }, 5000)
})
