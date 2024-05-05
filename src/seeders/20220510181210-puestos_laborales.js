'use strict'

/** @type {import("src/types/global").MigrationOrSeeder} */
module.exports = {
  async up (queryInterface) {
    return await queryInterface.bulkInsert('puestos_laborales', [
      { nombre: 'Administrador' },
      { nombre: 'Vendedor' }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('puestos_laborales', {})
  }
}
