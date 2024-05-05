import S from 'fluent-json-schema'
import type { Attributes } from './../../models/puesto_laboral'
import type { FastifySchema } from 'fastify'

export const jobTitle = S.object()
  .prop('codigo', S.integer())
  .prop('nombre', S.string())

export interface GetJobTitleInterface {
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
export const getJobTitleSchema: FastifySchema = {
  querystring: S.object()
    .prop('limit', S.integer().minimum(0).maximum(100))
    .prop('offset', S.integer().minimum(0)),
  response:  {
    200: S.object()
      .prop('rows', S.array()
        .items(jobTitle)
        .required()
      )
      .prop('count', S.integer())
      .prop('limit', S.integer())
      .prop('offset', S.integer())
  }
}
