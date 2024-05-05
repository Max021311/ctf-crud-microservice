import { ServiceParams } from '.'
import { Attributes, CreationAttributes } from './../models/puesto_laboral'
import { NonNullFindOptions, CreateOptions, FindAndCountOptions } from 'sequelize'

class JobTitleService {
  models: ServiceParams['models']
  constructor (params: ServiceParams) {
    this.models = params.models
  }

  get (options?: FindAndCountOptions<Attributes>) {
    return this.models().PuestoLaboral.findAndCountAll(options)
  }

  getById (id: number, options: NonNullFindOptions<Attributes>) {
    return this.models().PuestoLaboral.findByPk(id, options)
  }

  create (values: CreationAttributes, options: CreateOptions<CreationAttributes>) {
    return this.models().PuestoLaboral.create(values, options)
  }
}

export default JobTitleService
