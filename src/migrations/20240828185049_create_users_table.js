/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('interests', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
      })
      .createTable('users_interests', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('interest_id').unsigned().references('id').inTable('interests').onDelete('CASCADE');
      });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('users_interests')
      .dropTableIfExists('interests');
  };
