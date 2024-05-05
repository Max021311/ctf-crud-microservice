import S from 'fluent-json-schema'
import { FastifySchema } from 'fastify'
import { Attributes, CreationAttributes } from './../../models/empleado'
import { RouteGenericInterface } from 'fastify/types/route'

const requiredFields = [
  'rfc',
  'nombre',
  'apellidos',
  'nss',
  'curp',
  'fecha_nacimiento',
  'codigo_puesto_laboral',
  'sueldo'
]

export const employee = S.object()
  .prop('codigo', S.integer())
  .prop('email', S.string())
  .prop('password', S.string())
  .prop('rfc', S.string())
  .prop('nombre', S.string())
  .prop('apellidos', S.string())
  .prop('nss', S.string())
  .prop('curp', S.string())
  .prop('fecha_nacimiento', S.string())
  .prop('codigo_puesto_laboral', S.integer().exclusiveMinimum(0))
  .prop('sueldo', S.integer().minimum(0))

export interface GetEmployeesInterface {
  Querystring: {
    limit?: number
    offset?: number
  }
  Reply: {
    rows: Attributes[]
    count: number
    limit?: number
    offset?: number
  }
}
export const getEmployeesSchema: FastifySchema = {
  querystring: S.object()
    .prop('limit', S.integer().minimum(0).maximum(100))
    .prop('offset', S.integer().minimum(0)),
  response:  {
    200: S.object()
      .prop('rows', S.array()
        .items(employee)
        .required()
      )
      .prop('count', S.integer())
      .prop('limit', S.integer())
      .prop('offset', S.integer())
  }
}

export interface GetEmployeeInterface extends RouteGenericInterface {
  Params: {
    rfc: string
  }
  Reply: Attributes
}

export const getEmployeeSchema: FastifySchema = {
  params: S.object().prop('rfc', S.string()),
  response: {
    200: employee
  }
}

export interface DeleteEmployeeInterface extends RouteGenericInterface {
  Params: {
    codigo: number
  }
  Reply: string
}

export const deleteEmployeeSchema: FastifySchema = {
  params: S.object().prop('codigo', S.integer()),
  response: {
    200: S.string().default('OK')
  }
}

export interface PostEmployeeInterface extends RouteGenericInterface {
  Body: CreationAttributes
  Reply: Attributes
}

export const postEmployeeSchema: FastifySchema = {
  body: employee.without(['codigo']).required([...requiredFields, 'email', 'password']),
  response: {
    201: employee
  }
}

export interface PutEmployeeInterface extends RouteGenericInterface {
  Params: {
    codigo: number
  }
  Body: Attributes
  Reply: null
}

export const putEmployeeSchema: FastifySchema = {
  params: S.object().prop('codigo', S.integer().required()),
  body: employee.without(['codigo', 'email', 'password']).required(requiredFields).additionalProperties(false),
  response: {
    204: S.null()
  }
}
