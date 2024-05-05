import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

export type Attributes = InferAttributes<PuestoLaboral>
export type CreationAttributes = InferCreationAttributes<PuestoLaboral>

export class PuestoLaboral extends Model<InferAttributes<PuestoLaboral>, InferCreationAttributes<PuestoLaboral>>{
  declare codigo: CreationOptional<number>
  declare nombre: string
}

export default function (sequelize: Sequelize) {
  PuestoLaboral.init({
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
    tableName: 'puestos_laborales',
    sequelize
  })

  return PuestoLaboral
}
