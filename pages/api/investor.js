// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const knexConfig = require("../..knexfile.js")["development"];
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./database/dev.sqlite3",
  },
  useNullAsDefault: true,
});

export default async (req, res) => {
  const body = JSON.parse(req.body);
  console.log(body);

  return knex("investors")
    .insert({
      first_name: body.firstName,
      last_name: body.lastName,
      phone_number: body.phoneNumber,
      street: body.streetAddress,
      city: body.city,
      state: body.state,
      zip_code: body.zip,
      date_of_birth: body.dateOfBirth,
    })
    .then(function (rows) {
      console.log(rows);
      res.statusCode = 200;
      res.json({ status: 200 });
    })
    .catch(function (err) {
      console.error(err);
      res.statusCode = 500;
      res.json({ status: 500 });
    });
};
