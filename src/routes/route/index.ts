import { FastifyPluginCallback } from 'fastify'
import { GetRouteInterface, getRouteSchema } from './schema'

const RoutePlugin: FastifyPluginCallback = (server, _opts, done) => {
  const logger = server.log.child({ filename: __filename })
  server.route<GetRouteInterface>({
    method: 'GET',
    url: '/route',
    schema: getRouteSchema,
    handler: async (request, reply)  => {
      try {
        const options = {
          limit: request.query.limit,
          offset: request.query.offset
        }
        const response = {
          ...await server.Services.route().get(options),
          ...options
        }
        reply.code(200).send(response)
      } catch (err) {
        logger.error(err, 'GET /api/route')
        throw err
      }
    }
  })
  done()
}

export default RoutePlugin
