
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users
            .string('username', 255)
            .unique()
            .notNullable()
        users
            .string('phone_number', 15)
            .notNullable()
        users
            .string('password', 255)
            .notNullable()
    })

    .createTable('plants', col => {
        col.increments();
        col
            .string('nickname', 255)
        col
            .string('species', 15)
        col
            .string('h2O_freq', 255)
            .notNullable();
        col
            .integer("user_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("users")
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('plants')
        .dropTableIfExists('users')
};
