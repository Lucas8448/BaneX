import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect } from 'react';

export default function ErrorView() {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Ooops!</h1>
        <p>Noe ser ut til å ha gått galt.</p>
        {isRouteErrorResponse(error) ? (
          <>
            <h2>Feilkode: {error.status}</h2>
            <p>{error.statusText}</p>
          </>
        ) : (
          <p>Det oppstod en uventet feil. Vennligst prøv igjen senere.</p>
        )}
        <p>For mer informasjon, se konsollen eller kontakt teknisk støtte.</p>
        <pre style={{ overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    </Layout>
  );
}