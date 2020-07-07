import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Parallel Markets Investor Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Investor Details</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("hi");
          }}
        >
          <label for="file-upload">File</label>
          <br />
          <input type="file" name="file-upload" /> <br />
          <input type="submit" />
        </form>
      </main>

      {/* <footer>
      </footer> */}
    </div>
  );
}
