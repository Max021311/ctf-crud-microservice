import { FastifyPluginCallback } from 'fastify'
import { getJobTitleSchema, GetJobTitleInterface } from './schema'

const routePlugin: FastifyPluginCallback = (server, _opts, done) => {
  const logger = server.log.child({ filename: __filename })
  server.route<GetJobTitleInterface>({
    url: '/job-title',
    method: 'GET',
    schema: getJobTitleSchema,
    handler: async (request, reply) => {
      try {
        const options = {
          limit: request.query.limit,
          offset: request.query.offset
        }
        const response = {
          ...await server.Services.jobTitle().get(options),
          ...options
        }
        reply.code(200).send(response)
      } catch (err) {
        logger.debug({ err }, 'GET job titles')
        logger.error(err, 'GET job titles')
      }
    }
  })
  done()
}

export default routePlugin
