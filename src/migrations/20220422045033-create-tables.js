'use strict'
/* eslint-end node */
/* eslint-disable  @typescript-eslint/no-var-requires */
const { readFile } = require('fs/promises')
const { resolve } = require('path')

/** @type {import('src/types/global').MigrationOrSeeder} */
module.exports = {
  async up (queryInterface) {
    const path = resolve(__dirname, '../../migration.sql')
    const migrationText = await readFile(path, { encoding: 'utf-8' })
    await queryInterface.sequelize.query(migrationText)
  },

  async down (queryInterface) {
    await queryInterface.dropTable('Productos')
  }
}
