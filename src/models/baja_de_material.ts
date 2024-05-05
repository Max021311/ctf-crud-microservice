import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'

export type Attributes = InferAttributes<BajaDeMaterial>
export type CreationAttributes = InferCreationAttributes<BajaDeMaterial>

export class BajaDeMaterial extends Model<InferAttributes<BajaDeMaterial>, InferCreationAttributes<BajaDeMaterial>>{
  declare codigo_material: number
  declare codigo_venta: number
  declare cantidad: number
}

export default function (sequelize: Sequelize) {
  BajaDeMaterial.init({
    codigo_material: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'La cantidad a dar de baja no puede ser menor a 0'
        }
      }
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'bajas_de_materiales',
    sequelize
  })

  return BajaDeMaterial
}
