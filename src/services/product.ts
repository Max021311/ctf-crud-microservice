import type { ServiceParams } from './index'
import type { CreationAttributes } from './../models/producto'
import type { NonNullFindOptions, FindAndCountOptions } from 'sequelize'

class ProductService {
  models: ServiceParams['models']
  constructor (params: ServiceParams) {
    this.models = params.models
  }

  get (options: FindAndCountOptions) {
    return this.models().Producto.findAndCountAll(options)
  }

  getById (id: number, options: Omit<NonNullFindOptions<CreationAttributes>, 'where'>) {
    return this.models().Producto.findByPk(id, options)
  }
}

export default ProductService
