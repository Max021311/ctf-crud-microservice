import type { ServiceParams } from '.'
import { Attributes, CreationAttributes } from './../models/ruta'
import { NonNullFindOptions, CreateOptions, FindAndCountOptions } from 'sequelize'

class RouteService {
  models: ServiceParams['models']
  constructor (params: ServiceParams) {
    this.models = params.models
  }

  get (options?: FindAndCountOptions<Attributes>) {
    return this.models().Ruta.findAndCountAll(options)
  }

  getById (id: number, options?: NonNullFindOptions<Attributes>) {
    return this.models().Ruta.findByPk(id, options)
  }

  create (values: CreationAttributes, options?: CreateOptions<CreationAttributes>) {
    return this.models().Ruta.create(values, options)
  }
}

export default RouteService
