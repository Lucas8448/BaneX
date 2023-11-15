import { useQuery } from "@tanstack/react-query";
import { getReservation } from "../../api";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import QueryErrorView from "../../components/TempQueryErrorView";
import { TempObjectView } from "../../components/TempObjectView";

export default function ReservationView() {
  const { id } = useParams<{ id: string }>();
  const reservationQuery = useQuery(["reservations", id], () =>
    getReservation(id!)
  );
  if (reservationQuery.isLoading) return <Loader />;
  if (reservationQuery.isError)
    return (
      <QueryErrorView error={reservationQuery.error}>
        reservasjon med id {id}
      </QueryErrorView>
    );
  console.log(reservationQuery.data);
  return (
    <>
      <h1>Reservasjon {id}</h1>
      <TempObjectView data={reservationQuery.data} />
    </>
  );
}
