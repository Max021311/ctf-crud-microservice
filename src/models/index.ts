'use strict'

import * as Sequelize from 'sequelize'
import config from './../config/db'
import buildProductoModel from './producto'
import buildBajaDeMaterial from './baja_de_material'
import buildCompraDeMaterial from './compra_de_material'
import buildEmpleado from './empleado'
import buildEntradaVentas from './entrada_ventas'
import buildMaterial from './material'
import buildPuestoDeVenta from './puesto_de_venta'
import buildPuestoLaboral from './puesto_laboral'
import buildRuta from './ruta'
import buildVenta from './venta'

const sequelize = new Sequelize.Sequelize(config as Sequelize.Options)

const db = {
  sequelize,
  Sequelize,
  Producto: buildProductoModel(sequelize),
  BajaDeMaterial: buildBajaDeMaterial(sequelize),
  CompraDeMaterial: buildCompraDeMaterial(sequelize),
  Empleado: buildEmpleado(sequelize),
  EntradaVentas: buildEntradaVentas(sequelize),
  Material: buildMaterial(sequelize),
  PuestoDeVenta: buildPuestoDeVenta(sequelize),
  PuestoLaboral: buildPuestoLaboral(sequelize),
  Ruta: buildRuta(sequelize),
  Venta: buildVenta(sequelize)
}

Object.keys(db).forEach((modelName) => {
  if(db[modelName]?.associate) {
    db[modelName].associate(db)
  }
})

export type Models = typeof db
export default db
