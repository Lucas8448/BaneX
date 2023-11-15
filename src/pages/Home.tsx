import togVedStasjon from "/tog_ved_stasjon.jpg";

export default function Home() {
  return (
    <>
      <h1>Hensetting</h1>
      <h1>Bilde av Sandnes stasjon</h1>
      <img
        src={togVedStasjon}
        className="tog-ved-stasjon"
        alt="Tog ved Sandnes stasjon"
      />
    </>
  );
}
