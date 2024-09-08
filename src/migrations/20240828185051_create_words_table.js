/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('words', (table) => {
      table.increments('id').primary();
      table.integer('deck_id').unsigned().references('id').inTable('decks').onDelete('CASCADE');
      table.string('word').notNullable();
      table.text('mnemonic_desc');
      table.text('image_path');
      table.string('translation').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('words');
  };
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('words');
  };
