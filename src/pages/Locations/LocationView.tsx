import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../../api";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import QueryErrorView from "../../components/TempQueryErrorView";

export default function LocationView() {
  const { id } = useParams<{ id: string }>();
  const locationQuery = useQuery(["locations", id], () => getLocation(id!));

  if (locationQuery.isLoading) return <Loader />;
  if (locationQuery.isError)
    return (
      <QueryErrorView error={locationQuery.error}>
        lokasjonen med id {id}
      </QueryErrorView>
    );
  return (
    <>
      <h1>Lokasjon {id}</h1>
      {JSON.stringify(locationQuery.data)}
    </>
  );
}
