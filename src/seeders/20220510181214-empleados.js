'use strict'
const bcrypt = require('bcrypt')

const password = bcrypt.hashSync('loremipsum', 13)

/** @type {import("src/types/global").MigrationOrSeeder} */
module.exports = {
  async up (queryInterface) {
    return await queryInterface.bulkInsert('empleados', [
      {
        rfc: 'DIMM030911ER1',
        nombre: 'Jose Maximiliano',
        apellidos: 'Diaz Mendez',
        nss: 'XXXXXXXXXXX',
        curp: 'XXXXXXXXXXXXXXXXXX',
        fecha_nacimiento: '2002/11/13',
        codigo_puesto_laboral: 1,
        sueldo: 1000,
        password,
        email: 'example@example.com'
      },
      {
        rfc: 'DIMM030911ER2',
        nombre: 'Pedro',
        apellidos: 'Herrera Cruz',
        nss: 'XXXXXXXXXXX',
        curp: 'XXXXXXXXXXXXXXXXXX',
        fecha_nacimiento: '2002/11/13',
        codigo_puesto_laboral: 2,
        sueldo: 1000,
        password,
        email: 'example+1@example.com'
      },
      {
        rfc: 'DIMM030911ER3',
        nombre: 'Juan',
        apellidos: 'Perez García',
        nss: 'XXXXXXXXXXX',
        curp: 'XXXXXXXXXXXXXXXXXX',
        fecha_nacimiento: '2002/11/13',
        codigo_puesto_laboral: 2,
        sueldo: 1000,
        password,
        email: 'example+2@example.com'
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('empleados', {})
  }
}
