/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('professions', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
      })
      .createTable('users_professions', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('profession_id').unsigned().references('id').inTable('professions').onDelete('CASCADE');
      });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('users_professions')
      .dropTableIfExists('professions');
  };
