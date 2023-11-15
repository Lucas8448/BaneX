import { useQuery } from "@tanstack/react-query";
import {
  ReservationOverviewDto,
  getReservationsOverview,
  getSpaceReservations,
} from "../../api";
import Loader from "../../components/Loader";
import { Link, useParams } from "react-router-dom";
import SimpleTable, { SimpleTableColumn } from "../../components/SimpleTable";

const reservationOverviewColumns: SimpleTableColumn<ReservationOverviewDto>[] =
  [
    {
      key: "id",
      header: "ID",
      renderer: (r) => <Link to={`/reservations/${r.id}`}>{r.id}</Link>,
    },
    {
      key: "spaceId",
      header: "Hensettingsplassid",
      renderer: (r) => <Link to={`/spaces/${r.spaceId}`}>{r.spaceId}</Link>,
    },
    {
      key: "spaceName",
      header: "Hensettingsplassnavn",
      renderer: (r) => r.spaceName,
    },
    { header: "Reservert av", renderer: (r) => r.reserver },
    {
      key: "startTime",
      header: "Starttidspunkt",
      renderer: (r) => r.startTime.toLocaleString(),
    },
    {
      key: "endTime",
      header: "Slutttidspunkt",
      renderer: (r) => r.endTime.toLocaleString(),
    },
  ];

export default function ReservationsOverview() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const queryKey = spaceId
    ? ["spaces", spaceId, "reservations"]
    : ["reservations"];
  const query = spaceId
    ? () => getSpaceReservations(spaceId)
    : getReservationsOverview;
  const reservationsQuery = useQuery(queryKey, query);

  if (reservationsQuery.isLoading) return <Loader />;
  if (reservationsQuery.isError)
    return (
      <>
        Noe gikk galt under lasting av reservasjoner{" "}
        {JSON.stringify(reservationsQuery.error)}
      </>
    );
  return (
    <>
      <h1>Reservasjoner</h1>
      <SimpleTable
        columns={reservationOverviewColumns}
        rows={reservationsQuery.data}
      />
    </>
  );
}
