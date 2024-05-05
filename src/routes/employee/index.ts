import { FastifyPluginCallback } from 'fastify'
import {
  getEmployeesSchema,
  GetEmployeesInterface,
  GetEmployeeInterface,
  getEmployeeSchema,
  deleteEmployeeSchema,
  DeleteEmployeeInterface,
  PostEmployeeInterface,
  postEmployeeSchema,
  PutEmployeeInterface,
  putEmployeeSchema
} from './schema'
import authMiddleware from './../../middleware/auth'
import { Forbidden } from 'http-errors'

const routePlugin: FastifyPluginCallback = (server, _opts, done) => {
  const logger = server.log.child({ filename: __filename })
  server.route<GetEmployeesInterface>({
    method: 'GET',
    url: '/employee',
    schema: getEmployeesSchema,
    preHandler: authMiddleware,
    handler: async (request, reply) => {
      if (request.user.codigo_puesto_laboral !== 1) {
        throw new Forbidden()
      }
      try {
        const options = {
          limit: request.query.limit,
          offset: request.query.offset
        }
        const response = {
          ...await server.Services.empleado().get(options),
          ...options
        }
        reply.code(200).send(response)
      } catch (err) {
        logger.error(err, 'GET /api/employee')
        throw err
      }
    }
  })

  server.route<GetEmployeeInterface>({
    url: '/employee/:rfc',
    method: 'GET',
    schema: getEmployeeSchema,
    handler: async (request, reply) => {
      const employee = await server.Services.empleado().getById(request.params.rfc)
      if (employee) {
        return void reply.code(200).send(employee)
      }
      return void reply.code(204).send()
    }
  })

  server.route<DeleteEmployeeInterface>({
    method: 'DELETE',
    url: '/employee/:codigo',
    schema: deleteEmployeeSchema,
    handler: async (request, reply) => {
      await server.Services.sale().update({ codigo_empleado: null }, {
        where: {
          codigo_empleado: request.params.codigo
        }
      })
      await server.Services.empleado().destroy({
        where: {
          codigo: request.params.codigo
        }
      })
      reply.code(200).send()
    }
  })

  server.route<PostEmployeeInterface>({
    url: '/employee',
    method: 'POST',
    schema: postEmployeeSchema,
    preHandler: authMiddleware,
    handler: async (request, reply) => {
      try {
        const employee = await server.Services.empleado().create(request.body)
        return void reply.code(201).send(employee)
      } catch (err) {
        logger.debug({ err }, 'POST /api/employee')
        logger.error(err, 'POST /api/employee')
      }
    }
  })

  server.route<PutEmployeeInterface>({
    url: '/employee/:codigo',
    method: 'PUT',
    schema: putEmployeeSchema,
    preHandler: authMiddleware,
    handler: async (request, reply) => {
      try {
        await server.Services.empleado().update(request.body, {
          where: {
            codigo: request.params.codigo
          }
        })
        return void reply.code(204).send()
      } catch (err) {
        logger.debug({ err }, 'POST /api/employee')
        logger.error(err, 'POST /api/employee')
      }
    }
  })

  done()
}

export default routePlugin
