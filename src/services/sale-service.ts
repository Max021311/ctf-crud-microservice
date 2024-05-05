import type { ServiceParams } from './index'
import type { CreationAttributes, Attributes } from './../models/venta'
import type { FindOptions, CreateOptions, UpdateOptions } from 'sequelize'

class SaleService {
  models: ServiceParams['models']

  constructor (params: ServiceParams) {
    this.models = params.models
  }

  get (options?: FindOptions<Attributes>) {
    return this.models().Venta.findAndCountAll(options)
  }

  getById (id: number, options?: Omit<FindOptions<Attributes>, 'where'>) {
    return this.models().Venta.findByPk(id, options)
  }

  update (values: Partial<Attributes>, options: Omit<UpdateOptions<Attributes>, 'returning'>) {
    return this.models().Venta.update(values, options)
  }

  create (values: CreationAttributes, options?: CreateOptions<CreationAttributes>) {
    return this.models().Venta.create(values, options)
  }
}

export default SaleService
