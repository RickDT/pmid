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

const FormKVPair = ({ keyName, valueType, id }) => (
  <>
    <div className="md:w-1/3">
      <Label htmlFor={`${id}-field`}>{keyName}</Label>
    </div>
    <div className="md:w-2/3">
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id={id}
        type={valueType}
        name={`${id}-field`}
      />
    </div>
  </>
);

export default function Home() {
  const sendInvestor = () => {
    // NOTE: this is NOT canonical React
    // TODO: Use [Formik](https://formik.org/docs/tutorial#leveraging-react-context) to rig up the form
    // TODO: And use [Yup](https://github.com/jquense/yup) for validations
    return fetch("/api/investor", {
      method: "POST",
      body: JSON.stringify({
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        streetAddress: document.getElementById("streetAddress").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zipCode").value,
      }),
    });
  };

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

            // const results = await uploadFile(file);
            // console.log({ results });
            // console.log(results.status);
            // console.log(results.body);

            sendInvestor();
          }}
        >
          <FormRow>
            <FormKVPair keyName="First Name" valueType="text" id="firstName" />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="Last Name" valueType="text" id="lastName" />
          </FormRow>
          <FormRow>
            <FormKVPair
              keyName="Date of Birth"
              valueType="date"
              id="dateOfBirth"
            />
          </FormRow>
          <FormRow>
            <FormKVPair
              keyName="Phone Number"
              valueType="text"
              id="phoneNumber"
            />
          </FormRow>
          <FormRow>
            <FormKVPair
              keyName="Street Address"
              valueType="text"
              id="streetAddress"
            />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="City" valueType="text" id="city" />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="State" valueType="text" id="state" />
          </FormRow>
          <FormRow>
            <FormKVPair keyName="Zip Code" valueType="text" id="zipCode" />
          </FormRow>
          <FormRow>
            <div className="md:w-1/3">
              <Label htmlFor="file-upload">File</Label>
            </div>
            <div className="md:w-2/3">
              <input type="file" name="file-upload" id="file-picker" /> <br />
            </div>
          </FormRow>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <input
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
