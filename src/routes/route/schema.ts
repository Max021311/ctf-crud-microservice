import S from 'fluent-json-schema'
import { FastifySchema } from 'fastify'
import { Attributes } from './../../models/ruta'

export const route = S.object()
  .prop('codigo', S.integer())
  .prop('nombre', S.string())

export interface GetRouteInterface {
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

export const getRouteSchema: FastifySchema = {
  querystring: S.object()
    .prop('limit', S.integer().exclusiveMinimum(0))
    .prop('offset', S.integer().exclusiveMinimum(0)),
  response: {
    200: S.object()
      .prop('rows', S.array()
        .items(route)
      )
      .prop('count', S.integer())
      .prop('limit', S.integer())
      .prop('offset', S.integer())
  }
}
