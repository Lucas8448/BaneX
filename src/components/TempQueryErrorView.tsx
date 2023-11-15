import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  error: unknown;
}

export default function QueryErrorView({ children, error }: Props) {
  return (
    <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
      <h1>Feil under lasting!</h1>
      <p>Noe gikk galt under lasting av {children}</p>
      {error instanceof Error ? (
        <>
          <h2>Feilmelding:</h2>
          <p>{error.message}</p>
        </>
      ) : (
        <p>En ukjent feil oppstod.</p>
      )}
      <p>Feildetaljer:</p>
      <pre style={{ overflow: 'auto', maxHeight: '300px', background: '#f0f0f0', padding: '10px' }}>
        {JSON.stringify(error, null, 2)}
      </pre>
    </div>
  );
}