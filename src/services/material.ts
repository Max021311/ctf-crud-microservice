import type { ServiceParams } from '.'
import type { Material } from './../models/material'
import type { CreationAttributes as AddMaterialCreationAttributes } from './../models/compra_de_material'
import type { BajaDeMaterial } from './../models/baja_de_material'
import { NonNullFindOptions, CreateOptions, FindOptions, CreationAttributes, Attributes } from 'sequelize'

type RemoveMaterialCreationAttributes = CreationAttributes<BajaDeMaterial>

class MaterialService {
  models: ServiceParams['models']

  constructor (params: ServiceParams) {
    this.models = params.models
  }

  getById (id: number, options?: NonNullFindOptions<Attributes<Material>>) {
    return this.models().Material.findByPk(id, options)
  }

  get (options?: FindOptions<Attributes<Material>>) {
    return this.models().Material.findAndCountAll(options)
  }

  create (values: CreationAttributes<Material>, options?: CreateOptions<CreationAttributes<Material>>) {
    return this.models().Material.create(values, options)
  }

  addMaterial (values: AddMaterialCreationAttributes, options?: CreateOptions<AddMaterialCreationAttributes>) {
    return this.models().CompraDeMaterial.create(values, options)
  }

  removeMaterial (values: RemoveMaterialCreationAttributes, options?: CreateOptions<RemoveMaterialCreationAttributes>) {
    return this.models().BajaDeMaterial.create(values, options)
  }
}

export default MaterialService
