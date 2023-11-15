import { useQuery } from "@tanstack/react-query";
import { getLocationsOverview } from "../../api";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import SimpleTable from "../../components/SimpleTable";
import QueryErrorView from "../../components/TempQueryErrorView";

export default function LocationsOverview() {
  const locationsQuery = useQuery(["locations"], getLocationsOverview);

  if (locationsQuery.isLoading) return <Loader />;
  if (locationsQuery.isError)
    return (
      <QueryErrorView error={locationsQuery.error}>lokasjoner</QueryErrorView>
    );
  return (
    <>
      <h1>Lokasjoner</h1>
      <SimpleTable
        columns={[
          { header: "ID", renderer: (r) => <Link to={r.id}>{r.id}</Link> },
          { header: "Spornummer", renderer: (r) => r.trackNumber },
          { header: "Område", renderer: (r) => r.area },
          { header: "Status", renderer: (r) => r.status },
        ]}
        rows={locationsQuery.data}
      />
    </>
  );
}
