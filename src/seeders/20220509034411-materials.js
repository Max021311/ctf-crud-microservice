'use strict'

/** @type {import("src/types/global").MigrationOrSeeder} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('materiales', [
      { nombre: 'Cucharas', cantidad: 100 },
      { nombre: 'Vasos', cantidad: 100 },
      { nombre: 'Conos', cantidad: 100 }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('materiales', {})
  }
}
