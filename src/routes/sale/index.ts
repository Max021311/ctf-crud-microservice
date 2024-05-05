import { FastifyPluginCallback } from 'fastify'
import {
  getSalesSchema,
  PostSaleInterface,
  postSaleSchema,
  GetSalesInterface,
  GetSaleInterface,
  getSaleSchema
} from './schema'
import authMiddleware from './../../middleware/auth'

const routePlugin: FastifyPluginCallback = (server, _opts, done) => {
  const logger = server.log.child({ filename: __filename })
  server.route<PostSaleInterface>({
    method: 'POST',
    url: '/sale',
    schema: postSaleSchema,
    preHandler: authMiddleware,
    handler: async (request, reply) => {
      try {
        logger.debug(request.body, 'Body')
        const sale = await server.Services.sale().create({
          codigo_empleado: request.user.codigo,
          codigo_ruta: request.body.codigo_ruta,
          fecha: new Date()
        })

        const { entriesOfSale } = request.body

        for (const entry of entriesOfSale) {
          await server.Services.entryOfSale().create({ ...entry, codigo_venta: sale.codigo })
        }

        const { removeMaterials } = request.body

        for (const entry of removeMaterials) {
          logger.debug({ ...entry, codigo_venta: sale.codigo }, 'Entry')
          await server.Services.material().removeMaterial({ ...entry, codigo_venta: sale.codigo })
        }

        reply.code(200).send({ codigo: sale.codigo })
      } catch (err) {
        logger.error(err, 'POST sale')
        throw err
      }
    }
  })

  server.route<GetSalesInterface>({
    method: 'GET',
    url: '/sale',
    schema: getSalesSchema,
    handler: async (request, reply) => {
      const options = {
        limit: request.query.limit,
        offset: request.query.offset
      }
      const sales = await server.Services.sale().get({
        ...options,
        include: ['entriesOfSale', 'route']
      })
      const response = {
        ...sales,
        ...options
      }
      reply.code(200).send(response as GetSalesInterface['Reply'])
    }
  })

  server.route<GetSaleInterface>({
    url: '/sale/:id',
    method: 'GET',
    schema: getSaleSchema,
    handler: async (request, reply) => {
      try {
        const sale = await server.Services.sale().getById(request.params.id, {
          include: ['entriesOfSale', 'route', 'employee']
        })
        if (sale) {
          return void reply.code(200).send(sale as GetSaleInterface['Reply'])
        }
        return void reply.code(204).send()
      } catch (err) {
        logger.error(err, 'Sale')
      }
    }
  })

  done()
}

export default routePlugin
