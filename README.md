Parallel Markets job application code challenge.
See [assignment](https://gist.github.com/bmuller/341e89cf87083119ad1241f5b896fa7c)

## Tech

This project uses:
[React](http://reactjs.org)
[Next.js](http://nextjs.org) for quick, fullstack JS app development
[Formidable](https://github.com/node-formidable/formidable) for handling file uploads in Node
[SQLite](https://www.sqlite.org/index.html) for local relational db
[Knex](http://knexjs.org) for working with the DB
[Tailwind CSS](https://tailwindcss.com) For quick, functional styling

## Getting Started

Install JS deps:

```bash
yarn install
```

Install Knex and run migration to setup sqlite db

```bash
yarn global add knex
knex migrate:latest
```

## Run in Dev mode

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO

There is a lot left to do!

### Frontend

- Use Formik to make the form a lot more user-friendly and easier to maintain in the code
- Form validation (use Yup)
- File upload progress
- Step-wise progress indicator as the FE uploads the file and THEN sends in the investor data
- Error states

### Backend

- Validation
- Use collision-safe file naming on the uploads
- Upload to a safe area, assume malicious files

### Fullstack

- Authentication
- Authorization
