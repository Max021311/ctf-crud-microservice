import { FastifyPluginCallback } from 'fastify'
import materialRoutes from './material'
import saleRoutes from './sale'
import employeeRoutes from './employee'
import routeRoutes from './route'
import producRoutes from './product'
import jobTitleRoutes from './job-titles'

const routePlugin: FastifyPluginCallback = (server, _opts, done) => {
  server.route({
    url: '/ok',
    method: 'GET',
    handler: (_request, reply) => {
      return void reply.code(200).send('ok')
    }
  })
  server.register(materialRoutes)
  server.register(saleRoutes)
  server.register(employeeRoutes)
  server.register(routeRoutes)
  server.register(producRoutes)
  server.register(jobTitleRoutes)
  done()
}

export default routePlugin
