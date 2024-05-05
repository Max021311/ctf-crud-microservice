import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize'

export type CreationAttributes = InferCreationAttributes<Material>
export type Attributes = InferAttributes<Material>

export class Material extends Model<Attributes, CreationAttributes>{
  declare codigo: CreationOptional<number>
  declare nombre: string
  declare cantidad: number
  // static associate (models: Models) {
  //   Material.belongsTo(models.BajaDeMaterial, {
  //     as: 'bajas_de_material'
  //   })
  //   Material.belongsTo(models.CompraDeMaterial, {
  //     as: 'compra_de_material'
  //   })
  // }
}

export default function (sequelize: Sequelize) {
  Material.init({
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
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'materiales',
    sequelize
  })

  return Material
}
