import { useMutation } from "@tanstack/react-query";
import { ReservationCreationDto, createReservation } from "../../api";
import { useState } from "react";

export default function ReservationCreation() {
  const reservationCreationMutation = useMutation(createReservation);
  const [reservation, setReservation] = useState<ReservationCreationDto>({
    spaceId: 0,
    reserver: "",
    startTime: "",
    endTime: "",
    notes: "",
  });
  if (reservationCreationMutation.isLoading) return <>Oppretter reservasjon</>;
  return (
    <>
      <h1>Ny reservasjon?</h1>
      {reservationCreationMutation.isError && (
        <>
          <p>Noe gikk galt</p>
          <code>{JSON.stringify(reservationCreationMutation.error)}</code>
        </>
      )}
      {reservationCreationMutation.isSuccess && (
        <>
          <p>Noe gikk riktig</p>
          <code>{JSON.stringify(reservationCreationMutation.data)}</code>
        </>
      )}
      <label>
        Hensettingsplass
        <input
          type="number"
          value={reservation.spaceId}
          onChange={({ target }) =>
            setReservation((prevValue) => ({
              ...prevValue,
              spaceId: target.valueAsNumber,
            }))
          }
        />
      </label>
      <label>
        Reserveres av
        <input
          value={reservation.reserver}
          onChange={({ target }) =>
            setReservation((prevValue) => ({
              ...prevValue,
              reserver: target.value,
            }))
          }
        />
      </label>
      <label>
        Starttid
        <input
          type="datetime-local"
          value={reservation.startTime}
          onChange={({ target }) =>
            setReservation((prevValue) => ({
              ...prevValue,
              startTime: target.value,
            }))
          }
        />
      </label>
      <label>
        Slutttid
        <input
          type="datetime-local"
          value={reservation.endTime}
          onChange={({ target }) =>
            setReservation((prevValue) => ({
              ...prevValue,
              endTime: target.value,
            }))
          }
        />
      </label>
      <label>
        Notater
        <input
          value={reservation.notes}
          onChange={({ target }) =>
            setReservation((prevValue) => ({
              ...prevValue,
              notes: target.value,
            }))
          }
        />
      </label>
      <button
        type="button"
        onClick={() => {
          reservationCreationMutation.mutate(reservation);
        }}
      >
        Reserver
      </button>
    </>
  );
}
