import Head from "next/head";

const Label = ({ forHtml, children }) => (
  <label
    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
    for="inline-full-name"
  >
    {children}
  </label>
);

const FormRow = ({ children }) => (
  <div className="md:flex md:items-center mb-6">{children}</div>
);

export default function Home() {
  return (
    <div className="w-full max-w-sm">
      <Head>
        <title>Parallel Markets Investor Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Investor Details</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            let file = document.getElementById("file-picker").files[0];
            console.log(file);

            const results = await uploadFile(file);
            console.log({ results });
            console.log(results.status);
            console.log(results.body);
          }}
        >
          <FormRow>
            <div className="md:w-1/3">
              <Label forHtml="">Full Name</Label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
            </div>
          </FormRow>
          <FormRow>
            <div className="md:w-1/3">
              <Label forHtml="file-upload">File</Label>
            </div>
            <div className="md:w-2/3">
              <input type="file" name="file-upload" id="file-picker" /> <br />
            </div>
          </FormRow>
          <input type="submit" />
        </form>
      </main>

      {/* <footer>
      </footer> */}
    </div>
  );
}

function uploadFile(file) {
  let formData = new FormData();
  formData.append("file", file);

  return fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
}
