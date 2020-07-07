// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// TODO: This is kinda rough overall!
// TODO: Evaluate if Formidable is the right lib to use here
// TODO: Handle multiple file uploads

import Formidable from "formidable";
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false, // expect only multi-part file uploads
  },
};

// handle the upload and then pass to a regular req/res handler
export default uploadForm(handler);

function handler(req, res) {
  try {
    if (req.method === "POST") {
      res.status(200).send(req.form);
    } else {
      throw String("Method not allowed");
    }
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error, null, 2) });
  }
}

function uploadForm(next) {
  return function (req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        // configure Formidable instance
        const form = new Formidable.IncomingForm({
          multiples: true,
          keepExtensions: true,
        });

        // TODO: add some logging to these events to make it easier to diagnose issues
        form.once("error", (err) => {
          console.error(err);
          reject(err);
        });
        form
          .on("fileBegin", (name, file) => {
            console.log("start uploading: ", file.name);
          })
          .on("aborted", () => console.log("Aborted..."));
        form.once("end", () => {
          console.log("Done!");
        });

        // Parse the request with Formidable
        return form.parse(req, (err, fields, files) => {
          // TODO: support multiple files

          if (err) {
            return reject(err);
          }

          if (!files || !files.file) {
            return reject(err);
          }

          const uploadPath = `public/upload/${files.file.name}`;
          console.log("moving file: ", files.file.path, " to ", uploadPath);
          fs.renameSync(files.file.path, uploadPath);
          req.form = { fields, files, uploadPath };

          // pass along to next in chain
          return resolve(next(req, res));
        });
      } catch (error) {
        console.error(error);
        return resolve(res.status(403).send(error));
      }
    });
  };
}
