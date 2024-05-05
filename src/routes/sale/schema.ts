import S from 'fluent-json-schema'
import { FastifySchema } from 'fastify'
import { RouteGenericInterface } from 'fastify/types/route'
import type { CreationAttributes, Attributes } from './../../models/venta'
import type { CreationAttributes as EntryOfSale } from './../../models/entrada_ventas'
import type { CreationAttributes as RemoveMaterial } from './../../models/baja_de_material'
import { route } from './../route/schema'
import { employee } from './../employee/schema'
import type { Attributes as EmployeeAttributes } from './../../models/empleado'
import { Attributes as RouteAttributes } from './../../models/ruta'

const entryOfSale = S.object()
  .prop('codigo_producto', S.integer().required())
  .prop('cantidad', S.integer().exclusiveMinimum(0).required())
  .prop('precio', S.number().minimum(0).required())

const sale = S.object()
  .prop('codigo_ruta', S.integer())

const removeMaterial = S.object()
  .prop('codigo_material', S.integer().exclusiveMinimum(0))
  .prop('cantidad', S.integer().exclusiveMinimum(0))


export interface PostSaleInterface extends RouteGenericInterface {
  Body: Omit<CreationAttributes, 'fecha'> & {
    entriesOfSale: Omit<EntryOfSale, 'codigo_venta'>[]
    removeMaterials: Omit<RemoveMaterial, 'codigo_venta'>[]
  }
  Reply: { codigo: number }
}
export const postSaleSchema: FastifySchema = {
  body: sale
    .prop('removeMaterials', S.array().items(removeMaterial))
    .prop('entriesOfSale', S.array()
      .items(entryOfSale).minItems(1).required()
    )
    .required(['codigo_ruta']),
  response: {
    201: S.object().prop('codigo', S.integer().description('Codigo de la venta'))
  }
}

export interface GetSalesInterface extends RouteGenericInterface {
  Querystring: {
    limit?: number
    offset?: number
  }
  Reply: {
    rows: (Attributes | {
      entriesOfSale: EntryOfSale[],
      route: RouteAttributes
    })[]
    count: number
    limit?: number
    offset?: number
  }
}
export const getSalesSchema: FastifySchema = {
  querystring: S.object()
    .prop('limit', S.integer().minimum(0).maximum(100))
    .prop('offset', S.integer().minimum(0)),
  response: {
    200: S.object()
      .prop('rows', S.array()
        .items(sale
          .prop('codigo', S.integer())
          .prop('fecha', S.string().format(S.FORMATS.DATE))
          .prop('entriesOfSale', S.array()
            .items(entryOfSale.prop('codigo_venta', S.integer()))
          )
          .prop('route', route)
        )
      )
      .prop('count', S.integer())
      .prop('limit', S.integer())
      .prop('offset', S.integer())
  }
}

export interface GetSaleInterface extends RouteGenericInterface {
  Params: {
    id: number
  }
  Reply: Attributes | {
    entriesOfSale: EntryOfSale[]
    route: RouteAttributes,
    employee: EmployeeAttributes
  }
}

export const getSaleSchema: FastifySchema = {
  params: S.object().prop('id', S.integer().exclusiveMinimum(0)),
  response: {
    200: sale
      .prop('codigo', S.integer())
      .prop('fecha', S.string().format(S.FORMATS.DATE))
      .prop('entriesOfSale', S.array()
        .items(entryOfSale.prop('codigo_venta', S.integer()))
      )
      .prop('employee', S.object().raw({ nullable: true }).extend(employee))
      .prop('route', route)
  }
}
