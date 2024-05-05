import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

export type Attributes = InferAttributes<CompraDeMaterial>
export type CreationAttributes = InferCreationAttributes<CompraDeMaterial, { omit: 'codigo' }>

export class CompraDeMaterial extends Model<Attributes, CreationAttributes>{
  declare codigo: number
  declare codigo_material: number
  declare precio: number
  declare cantidad: number
  declare fecha: Date
}

export default function (sequelize: Sequelize) {
  CompraDeMaterial.init({
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codigo_material: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materiales',
        key: 'codigo'
      }
    },
    precio: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      defaultValue: sequelize.fn('NOW()::DATE'),
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'compra_de_materiales',
    sequelize
  })

  return CompraDeMaterial
}
