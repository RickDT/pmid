import { useState } from "react";
import Head from "next/head";

// Styled label
const Label = ({ htmlFor, children }) => (
  <label
    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

// Styled form row container
const FormRow = ({ children }) => (
  <div className="md:flex md:items-center mb-6">{children}</div>
);

// Styled form label/input pair
const FormKVPair = ({ keyName, valueType, id, val, setVal }) => (
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
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  </>
);

// TODO: Use [Formik](https://formik.org/docs/tutorial#leveraging-react-context) to rig up the form, handle state, etc.
// TODO: And use [Yup](https://github.com/jquense/yup) for validations
export default function Home() {
  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [streetAddress, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // ux state
  const [isDone, setIsDone] = useState(false);

  const sendInvestor = (attachmentPath) => {
    return fetch("/api/investor", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        streetAddress,
        city,
        state,
        zip,
        attachmentPath,
      }),
    });
  };

  // TODO: This shouldn't take a filepath. That's really brittle and insecure
  // TODO: After file upload, pass around an opaque token that the backend can use to refer to the file
  const uploadFile = (file) => {
    let formData = new FormData();
    formData.append("file", file);

    return fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  };

  // Submitting is 2 steps
  // First, upload the file
  // Then submit the investor data, along with the uploaded file info
  const submitForm = async (event) => {
    event.preventDefault();

    // upload file to upload API
    let file = document.getElementById("file-picker").files[0];

    try {
      const uploadResult = await uploadFile(file);

      // send investor details to API
      const result = await uploadResult.json();
      await sendInvestor(result.uploadPath);

      // update the UI
      setIsDone(true);
    } catch (err) {
      // TODO: show the user what went wrong and give them info on how to proceed
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Head>
        <title>Parallel Markets Investor Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isDone === false ? (
          <>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <h1 className="text-2xl">Investor Details</h1>
              </div>
            </div>
            <form onSubmit={submitForm}>
              <FormRow>
                <FormKVPair
                  keyName="First Name"
                  valueType="text"
                  id="firstName"
                  val={firstName}
                  setVal={setFirstName}
                />
              </FormRow>
              <FormRow>
                <FormKVPair
                  keyName="Last Name"
                  valueType="text"
                  id="lastName"
                  val={lastName}
                  setVal={setLastName}
                />
              </FormRow>
              <FormRow>
                <FormKVPair
                  keyName="Date of Birth"
                  valueType="date"
                  id="dateOfBirth"
                  val={dateOfBirth}
                  setVal={setDateOfBirth}
                />
              </FormRow>
              <FormRow>
                <FormKVPair
                  keyName="Phone Number"
                  valueType="text"
                  id="phoneNumber"
                  val={phoneNumber}
                  setVal={setPhone}
                />
              </FormRow>
              <FormRow>
                <FormKVPair
                  keyName="Street Address"
                  valueType="text"
                  id="streetAddress"
                  val={streetAddress}
                  setVal={setStreet}
                />
              </FormRow>
              <FormRow>
                <FormKVPair
                  keyName="City"
                  valueType="text"
                  id="city"
                  val={city}
                  setVal={setCity}
                />
              </FormRow>
              <FormRow>
                <FormKVPair
                  keyName="State"
                  valueType="text"
                  id="state"
                  val={state}
                  setVal={setState}
                />
              </FormRow>
              <FormRow>
                <FormKVPair
                  keyName="Zip Code"
                  valueType="text"
                  id="zipCode"
                  val={zip}
                  setVal={setZip}
                />
              </FormRow>
              <FormRow>
                <div className="md:w-1/3">
                  <Label htmlFor="file-upload">File</Label>
                </div>
                <div className="md:w-2/3">
                  <input type="file" name="file-upload" id="file-picker" />{" "}
                  <br />
                </div>
              </FormRow>

              <FormRow>
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <input
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  />
                </div>
              </FormRow>
            </form>
          </>
        ) : (
          <div>
            Thanks for your submission!
            {/* TODO: add a way to send another submission */}
          </div>
        )}
      </main>
    </div>
  );
}
