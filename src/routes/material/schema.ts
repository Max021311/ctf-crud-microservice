import S from 'fluent-json-schema'
import { FastifySchema } from 'fastify'
import { RouteGenericInterface } from 'fastify/types/route'
import { CreationAttributes, Attributes } from 'sequelize'
import { Material } from './../../models/material'
import { CreationAttributes as AddMaterialAttributes } from './../../models/compra_de_material'

export type MaterialSchema = Attributes<Material>
const materialSchema = S.object()
  .prop('codigo', S.integer())
  .prop('nombre', S.string())
  .prop('cantidad', S.integer().exclusiveMinimum(0))

export type CreateMaterialSchema = CreationAttributes<Material>
const createMaterialSchema = materialSchema
  .without(['codigo'])
  .required(['cantidad', 'nombre'])

export interface GetMaterialInterface extends RouteGenericInterface {
  Params: {
    id: number
  }
  Reply: MaterialSchema | string
}
export const getMaterialSchema: FastifySchema = {
  params: S.object()
    .prop('id', S.integer().exclusiveMinimum(0)),
  response: {
    200: materialSchema,
    204: S.string().default('No Content')
  }
}

export interface GetMaterialsInterface extends RouteGenericInterface {
  Querystring: {
    limit?: number
    offset?: number
  }
  Reply: {
    rows: MaterialSchema[]
    count: number
    limit?: number
    offset?: number
  }
}
export const getMaterialsSchema: FastifySchema = {
  querystring: S.object()
    .prop('limit', S.integer().minimum(0).maximum(100))
    .prop('offset', S.integer().minimum(0)),
  response: {
    200: S.object()
      .prop('rows', S.array()
        .items(materialSchema)
      )
      .prop('count', S.integer())
      .prop('limit', S.integer())
      .prop('offset', S.integer())
  }
}

export interface PostMaterialSchema extends RouteGenericInterface {
  Body: CreateMaterialSchema
  Reply: MaterialSchema
}
export const postMaterialSchema = {
  body: createMaterialSchema,
  response: {
    200: materialSchema
  }
}

export interface PostAddMaterialInterface extends RouteGenericInterface {
  Body: Omit<AddMaterialAttributes, 'fecha'>
  Reply: string
}
export const postAddMaterialSchema: FastifySchema =  {
  body: S.object()
    .prop('codigo_material', S.integer())
    .prop('precio', S.integer())
    .prop('cantidad', S.integer()),
  response: {
    200: S.string().default('OK')
  }
}
