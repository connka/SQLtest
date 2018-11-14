const settings = require("./settings");

const knex = require("knex")({
    client: "pg",
    connection: settings
});

const [first_name, last_name, birthdate] = process.argv.slice(2);

knex
    .insert({first_name, last_name, birthdate}).into("famous_people")
    .asCallback( (err, result) => {
    if (err) return console.error(err);

    console.log(`Inserted ${first_name} ${last_name}, ${birthdate}`);
    knex.destroy();
});