import { FastifyPluginCallback } from 'fastify'
import { getProductSchema, GetProductInterface } from './../product/schema'

const routePlugin: FastifyPluginCallback = (server, _opts, done) => {
  const logger = server.log.child({ filename: __filename })
  server.route<GetProductInterface>({
    method: 'GET',
    url: '/product',
    schema: getProductSchema,
    handler: async (request, reply) => {
      try {
        const options = {
          limit: request.query.limit,
          offset: request.query.offset
        }
        const response = {
          ...await server.Services.product().get(options),
          ...options
        }
        reply.code(200).send(response)
      } catch (err) {
        logger.error(err, 'GET /api/employee')
        throw err
      }
    }
  })
  done()
}

export default routePlugin
