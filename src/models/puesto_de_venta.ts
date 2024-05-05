import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

export type Attributes = InferAttributes<PuestosDeVenta>
export type CreationAttributes = InferCreationAttributes<PuestosDeVenta>

export class PuestosDeVenta extends Model<InferAttributes<PuestosDeVenta>, InferCreationAttributes<PuestosDeVenta>>{
  declare codigo: CreationOptional<number>
  declare codigo_ruta: number
  declare numero_exterior: string
  declare numero_interior: string
  declare colonia: string
  declare calle: string
  declare codigo_postal: string
}

export default function (sequelize: Sequelize) {
  PuestosDeVenta.init({
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codigo_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rutas',
        key: 'codigo'
      }
    },
    numero_exterior: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    numero_interior: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    colonia: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    calle: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    codigo_postal: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'puestos_de_venta',
    sequelize
  })

  return PuestosDeVenta
}
