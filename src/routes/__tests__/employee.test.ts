import build from './../../build'
import { GetEmployeesInterface, GetEmployeeInterface } from './../employee/schema'

describe('Employee API', () => {
  let  app: ReturnType<typeof build>
  beforeAll(() => {
    app = build({ prefix: '/api' })
  })

  it('GET /api/employee succesfully', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/employee',
      query: {
        limit: '1'
      }
    })

    const response = res.json<GetEmployeesInterface['Reply']>()
    expect(res.statusCode).toBe(200)
    expect(response).toHaveProperty('count')
    expect(response).toHaveProperty('limit')
    expect(response.rows.length).toBeGreaterThan(0)
  }, 5000)

  it('GET /api/employee/:rfc sucessfully', async () => {
    const res = await app.inject({
      url: '/api/employee/DIMM030911ER1',
      method: 'GET'
    })
    const response = res.json<GetEmployeeInterface['Reply']>()
    expect(res.statusCode).toBe(200)
    expect(response).toHaveProperty('rfc')
  })
})
