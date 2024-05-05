'use strict'

/** @type {import("src/types/global").MigrationOrSeeder} */
module.exports = {
  async up (queryInterface) {
    return await queryInterface.bulkInsert('rutas', [
      {
        // codigo: 1,
        nombre: 'Tienda de ejemplo'
      },
      {
        nombre: 'Tienda 1'
      },
      {
        nombre: 'Tienda 2'
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('empleados', {})
  }
}
