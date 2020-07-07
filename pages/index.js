import Head from "next/head";

const Label = ({ htmlFor, children }) => (
  <label
    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
    htmlFor="inline-full-name"
  >
    {children}
  </label>
);

const FormRow = ({ children }) => (
  <div className="md:flex md:items-center mb-6">{children}</div>
);

const FormKVPair = ({ keyName, valueType }) => (
  <>
    <div className="md:w-1/3">
      <Label htmlFor="">{keyName}</Label>
    </div>
    <div className="md:w-2/3">
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id="inline-full-name"
        type={valueType}
      />
    </div>
  </>
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
            <FormKVPair keyName="First Name" valueType="text" />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="Last Name" valueType="text" />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="Date of Birth" valueType="date" />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="Phone Number" valueType="text" />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="Street Address" valueType="text" />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="State" valueType="text" />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="Zip Code" valueType="text" />
          </FormRow>
          <FormRow>
            <div className="md:w-1/3">
              <Label htmlFor="file-upload">File</Label>
            </div>
            <div className="md:w-2/3">
              <input type="file" name="file-upload" id="file-picker" /> <br />
            </div>
          </FormRow>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <input
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              />
            </div>
          </div>
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
