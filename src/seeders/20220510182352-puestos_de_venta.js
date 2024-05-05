'use strict'

/** @type {import("src/types/global").MigrationOrSeeder} */
module.exports = {
  async up (queryInterface) {
    return await queryInterface.bulkInsert('puestos_de_venta', [
      {
        // codigo: 1,
        codigo_ruta: 1,
        numero_exterior: '123',
        numero_interior: null,
        colonia: 'Ejemplo',
        calle: 'qwertyui',
        codigo_postal: '23458'
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('puestos_de_venta', {})
  }
}
