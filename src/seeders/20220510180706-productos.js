'use strict'

/** @type {import("src/types/global").MigrationOrSeeder} */
module.exports = {
  async up (queryInterface) {
    return await queryInterface.bulkInsert('productos', [
      { nombre: 'Vaso de nieve de nuez', precio: 20 },
      { nombre: 'Vaso de nieve de vainilla', precio: 20 },
      { nombre: 'Vaso de nieve de chocolate', precio: 20 },
      { nombre: 'Vaso de nieve de limon', precio: 20 },
      { nombre: 'Vaso de nieve de fresa', precio: 20 },
      { nombre: 'Cono de nieve de nuez', precio: 20 },
      { nombre: 'Cono de nieve de vainilla', precio: 20 },
      { nombre: 'Cono de nieve de chocolate', precio: 20 },
      { nombre: 'Cono de nieve de limon', precio: 20 },
      { nombre: 'Cono de nieve de fresa', precio: 20 }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('productos', {})
  }
}
