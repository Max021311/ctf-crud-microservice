import type { ServiceParams } from '.'
import { FindOptions, CreateOptions } from 'sequelize'
import { Attributes, CreationAttributes } from './../models/puesto_de_venta'

class StallOfRouteService {
  models: ServiceParams['models']
  constructor (params: ServiceParams) {
    this.models = params.models
  }

  get (options: FindOptions<Attributes>) {
    return this.models().PuestoDeVenta.findAll(options)
  }

  create (values: CreationAttributes, options: CreateOptions<CreationAttributes>) {
    return this.models().PuestoDeVenta.create(values, options)
  }
}

export default StallOfRouteService
