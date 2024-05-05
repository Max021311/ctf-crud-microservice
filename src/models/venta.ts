import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import type { Models } from '.'

export type CreationAttributes = InferCreationAttributes<Venta, { omit: 'codigo' }>
export type Attributes = InferAttributes<Venta>

export class Venta extends Model<Attributes, CreationAttributes>{
  declare codigo: number
  declare codigo_empleado: number | null
  declare codigo_ruta: number
  declare fecha: Date

  static associate (models: Models) {
    Venta.hasMany(models.EntradaVentas, {
      foreignKey: 'codigo_venta',
      as: 'entriesOfSale'
    })
    Venta.hasOne(models.Ruta, {
      foreignKey: 'codigo',
      sourceKey: 'codigo_ruta',
      as: 'route'
    })
    Venta.hasOne(models.Empleado, {
      foreignKey: 'codigo',
      sourceKey: 'codigo_empleado',
      as: 'employee'
    })
  }
}

export default function (sequelize: Sequelize) {
  Venta.init({
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codigo_empleado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'rfc'
      }
    },
    codigo_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rutas',
        key: 'codigo'
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      defaultValue: sequelize.fn('NOW()::DATE'),
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'ventas',
    sequelize
  })

  return Venta
}
