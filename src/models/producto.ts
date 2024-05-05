import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'

export type CreationAttributes = InferCreationAttributes<Producto, { omit: 'codigo' }>
export type Attributes = InferAttributes<Producto>

export class Producto extends Model<Attributes, CreationAttributes>{
  declare codigo: number
  declare nombre: string
  declare precio: number
}

export default function (sequelize: Sequelize) {
  Producto.init({
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(11, 2), // Max/Min +/-999,999,999.99
      allowNull: false,
      validate: {
        max: 999999999.99,
        min: -999999999.99
      }
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'productos',
    sequelize
  })

  return Producto
}
