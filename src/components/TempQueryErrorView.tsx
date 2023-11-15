import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  error: unknown;
}
export default function QueryErrorView(props: Props) {
  return (
    <>
      <p>Noe gikk galt under lasting av {props.children}</p>
      {JSON.stringify(props.error)}
    </>
  );
}
