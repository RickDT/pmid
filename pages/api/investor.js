// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./database/dev.sqlite3",
  },
  useNullAsDefault: true,
});

// TODO: Should this API be a full CRUD-capable resource?
// TODO: Data validation
export default async (req, res) => {
  const body = JSON.parse(req.body);

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
      attachment_path: body.attachmentPath,
    })
    .then(function (rows) {
      res.statusCode = 200;
      res.json({ status: 200 });
    })
    .catch(function (err) {
      console.error(err);
      res.statusCode = 500;
      res.json({ status: 500 });
    });
};
