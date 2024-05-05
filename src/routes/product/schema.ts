import S from 'fluent-json-schema'
import { Attributes } from './../../models/producto'

export const producto = S.object()
  .prop('codigo', S.integer())
  .prop('nombre', S.string())
  .prop('precio', S.number())

export interface GetProductInterface {
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
export const getProductSchema = {
  querystring: S.object()
    .prop('limit', S.integer().minimum(0).maximum(100))
    .prop('offset', S.integer().minimum(0)),
  response:  {
    200: S.object()
      .prop('rows', S.array()
        .items(producto)
        .required()
      )
      .prop('count', S.integer())
      .prop('limit', S.integer())
      .prop('offset', S.integer())
  }
}
