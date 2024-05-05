import type { ServiceParams } from './index'
import type { CreationAttributes, Attributes } from './../models/entrada_ventas'
import type { FindOptions, CreateOptions } from 'sequelize'

class EntryOfSaleService {
  models: ServiceParams['models']

  constructor (params: ServiceParams) {
    this.models = params.models
  }

  get (options?: FindOptions<Attributes>) {
    return this.models().EntradaVentas.findAll(options)
  }

  create (values: CreationAttributes, options?: CreateOptions<CreationAttributes>) {
    return this.models().EntradaVentas.create(values, options)
  }
}

export default EntryOfSaleService
