import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

export type Attributes = InferAttributes<Ruta>
export type CreationAttributes = InferCreationAttributes<Ruta, { omit: 'codigo' }>

export class Ruta extends Model<Attributes, CreationAttributes> {
  declare codigo: number
  declare nombre: string
}

export default function (sequelize: Sequelize) {
  Ruta.init({
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'rutas',
    sequelize
  })

  return Ruta
}
