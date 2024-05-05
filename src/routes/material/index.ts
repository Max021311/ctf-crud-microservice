import { FastifyPluginCallback } from 'fastify'
import {
  getMaterialSchema,
  GetMaterialInterface,
  getMaterialsSchema,
  GetMaterialsInterface,
  postMaterialSchema,
  PostMaterialSchema,
  PostAddMaterialInterface,
  postAddMaterialSchema
} from './schema'
import authMiddleware from './../../middleware/auth'

const routePlugin: FastifyPluginCallback = (server, _opts, done) => {
  const logger = server.log.child({ filename: __filename })
  server.route<GetMaterialInterface>({
    method: 'GET',
    url: '/material/:id',
    schema: getMaterialSchema,
    handler: async (request, reply) => {
      try {
        const material = await server.Services.material().getById(request.params.id)
        reply.code(material ? 200 : 204).send(material ?? 'No Content')
      } catch (err) {
        logger.debug({ err }, 'Get material by id')
        logger.error(err, 'Get material by id')
      }
    }
  })

  server.route<GetMaterialsInterface>({
    method: 'GET',
    url: '/material',
    schema: getMaterialsSchema,
    handler: async (request, reply) => {
      try {
        const options = {
          limit: request.query.limit,
          offset: request.query.offset
        }
        const response = {
          ...await server.Services.material().get(options),
          ...options
        }
        reply.code(200).send(response)
      } catch (err) {
        logger.debug({ err }, 'Get materials')
        logger.error(err, 'Get materials')
      }
    }
  })

  server.route<PostMaterialSchema>({
    method: 'POST',
    url: '/material',
    schema: postMaterialSchema,
    preHandler: authMiddleware,
    handler: async (request, reply) => {
      try {
        reply.code(200).send(
          await server.Services.material().create(request.body)
        )
      } catch (err) {
        logger.debug({ err }, 'Create material')
        logger.error(err, 'Create material')
      }
    }
  })

  server.route<PostAddMaterialInterface>({
    url: '/material/add',
    method: 'POST',
    schema: postAddMaterialSchema,
    preHandler: authMiddleware,
    handler: async (request, reply) => {
      try {
        await server.Services.material().addMaterial({
          ...request.body,
          fecha: new Date()
        })
        return void reply.code(200).send('OK')
      } catch (err) {
        logger.debug({ err }, 'Add material'),
        logger.error(err, 'Add material')
      }
    }
  })

  done()
}

export default routePlugin
