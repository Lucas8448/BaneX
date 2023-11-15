import { useQuery } from "@tanstack/react-query";
import { getSpacesOverview } from "../../api";
import Loader from "../../components/Loader";
import SimpleTable from "../../components/SimpleTable";
import QueryErrorView from "../../components/TempQueryErrorView";
import { Link } from "react-router-dom";

export default function SpacesOverview() {
  const spacesQuery = useQuery(["spaces"], getSpacesOverview);
  if (spacesQuery.isLoading) return <Loader />;
  if (spacesQuery.isError)
    return (
      <QueryErrorView error={spacesQuery.error}>
        hensettingsplasser
      </QueryErrorView>
    );
  return (
    <>
      <h1>Hensettingsplasser</h1>
      <SimpleTable
        columns={[
          {
            key: "id",
            header: "ID",
            renderer: (r) => <Link to={r.id.toString()}>{r.id}</Link>,
          },
          { key: "name", header: "Navn", renderer: (r) => r.name },
          {
            key: "description",
            header: "Beskrivelse",
            renderer: (r) => r.description,
          },
        ]}
        rows={spacesQuery.data}
      />
    </>
  );
}
