const settings = require("./settings");

const knex = require("knex")({
  client: "pg",
  connection: settings
});

const first = process.argv[2];
function formatResults(rows) {
  const out = [`Found ${rows.length} person(s) by the name '${first}':`];
  rows.map(row => {
    out.push(`${out.length}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toDateString()}'`);
  });

  return out;

}

function printResults(rows) {
  console.log(formatResults(rows).join("\n"));
}

knex
  .select("*")
  .from("famous_people")
  .where("first_name", first)
  .asCallback( (err,rows) => {
    if (err) return console.error(err);
    printResults(rows);
    knex.destroy();
  });