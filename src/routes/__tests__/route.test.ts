import build from './../../build'
import { GetRouteInterface } from './../route/schema'

describe('Route API', () => {
  let app: ReturnType<typeof build>
  beforeAll(() => {
    app = build({ prefix: '/api' })
  })

  it('GET /api/route successfully', async () => {
    const res = await app.inject({
      url: '/api/route',
      method: 'GET',
      query: {
        limit: '1'
      }
    })

    const response = res.json<GetRouteInterface['Reply']>()
    expect(res.statusCode).toBe(200)
    expect(response).toHaveProperty('count')
    expect(response).toHaveProperty('limit')
    expect(response.rows.length).toBeGreaterThan(0)
  })
})
