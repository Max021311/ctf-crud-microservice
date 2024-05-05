import { preHandlerAsyncHookHandler } from 'fastify'
import Jwt from 'jsonwebtoken'
import Axios from 'axios'
import { Unauthorized } from 'http-errors'

const authHost = process.env.AUTH_HOST ?? 'http://localhost:3010'

const authMiddleware: preHandlerAsyncHookHandler = async (request) => {
  const token = request.headers.authorization?.split?.(' ')?.[1]
  if (token === undefined) { throw new Error('Missing token') }
  const decoded = Jwt.decode(token)
  try {
    await Axios.get('/api/auth', {
      headers: {
        Authorization: 'Bearer ' + token
      },
      baseURL: authHost
    })
  } catch (err) {
    if (Axios.isAxiosError(err) && err.response && err.response.status === 401) {
      throw new Unauthorized()
    }
    throw err
  }
  request.user = decoded as { codigo: number, codigo_puesto_laboral: number }
}

export default authMiddleware
