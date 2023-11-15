import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Layout from "../components/Layout";

export default function ErrorView() {
  const error = useRouteError();
  console.error(error);

  return (
    <Layout>
      <p>
        Hmm, noe ser ut til å ha gått galt. Endre{" "}
        <code>src/pages/ErrorView.tsx</code> for å endre denne meldingen
      </p>
      {isRouteErrorResponse(error) && (
        <p>
          {error.status}: {error.statusText}
        </p>
      )}
      <code>{JSON.stringify(error)}</code>
    </Layout>
  );
}
