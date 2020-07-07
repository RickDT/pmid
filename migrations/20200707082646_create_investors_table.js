exports.up = function (knex) {
  return knex.schema.createTable("investors", function (table) {
    table.increments();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("phone_number").notNullable();
    table.string("street").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("zip_code").notNullable();
    table.date("date_of_birth").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("investors");
};
