/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('decks', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('native_language_id').unsigned().references('id').inTable('languages').onDelete('SET NULL');
      table.integer('target_language_id').unsigned().references('id').inTable('languages').onDelete('SET NULL');
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('decks');
  };
