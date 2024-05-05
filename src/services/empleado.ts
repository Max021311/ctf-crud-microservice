import { ServiceParams } from '.'
import { Attributes, CreationAttributes } from './../models/empleado'
import {
  NonNullFindOptions,
  CreateOptions,
  FindAndCountOptions,
  DestroyOptions,
  UpdateOptions
} from 'sequelize'

class EmployeeService {
  models: ServiceParams['models']

  constructor (params: ServiceParams) {
    this.models = params.models
  }

  destroy (options: DestroyOptions<Attributes>) {
    return this.models().Empleado.destroy(options)
  }

  get (options?: Omit<FindAndCountOptions<Attributes>, 'group'>) {
    return this.models().Empleado.findAndCountAll(options)
  }

  getById (id: string, options?: NonNullFindOptions<Attributes>) {
    return this.models().Empleado.findByPk(id, options)
  }

  create (values: CreationAttributes, options?: CreateOptions<CreationAttributes>) {
    return this.models().Empleado.create(values, options)
  }

  update (values: Attributes, options: UpdateOptions<Attributes>) {
    return this.models().Empleado.update(values, options)
  }
}

export default EmployeeService
