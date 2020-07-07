// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const config = {
  api: {
    bodyParser: {
      // TODO: make size limit configurable in ENV (per 12f app)
      // Should it be just "3" or "3mb"?
      sizeLimit: "3mb",
    },
  },
};

export default (req, res) => {
  console.log(req.body);

  res.statusCode = 200;
  // res.json({ name: 'John Doe' })
};
