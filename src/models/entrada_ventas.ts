import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'


export type Attributes = InferAttributes<EntradaVentas>
export type CreationAttributes = InferCreationAttributes<EntradaVentas>

export class EntradaVentas extends Model<Attributes, CreationAttributes>{
  declare codigo_producto: number
  declare codigo_venta: number
  declare cantidad: number
  declare precio: number
}

export default function (sequelize: Sequelize) {
  EntradaVentas.init({
    codigo_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'productos',
        key: 'codigo'
      }
    },
    codigo_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ventas',
        key: 'codigo'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(11,2),
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'entrada_ventas',
    sequelize
  })

  return EntradaVentas
}
