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
          onSubmit={async (event) => {
            event.preventDefault();

            let file = document.getElementById("file-picker").files[0];

            let formData = new FormData();
            formData.append("file", file);

            const result = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });
            console.log({ result });
          }}
        >
          <label for="file-upload">File</label>
          <br />
          <input type="file" name="file-upload" id="file-picker" /> <br />
          <input type="submit" />
        </form>
      </main>

      {/* <footer>
      </footer> */}
    </div>
  );
}
