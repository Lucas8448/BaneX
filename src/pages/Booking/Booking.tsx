import React, { useState, useEffect } from 'react';
import { Form, Button, DateRangePicker, AutoComplete } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './Booking.css';
import { createReservation, ReservationCreationDto, getAndProcessStations } from './../../api'; // Adjust the import paths as needed

const Booking = () => {
  const [formValue, setFormValue] = useState({
    spaceId: 0,
    reserver: '',
    timeRange: [new Date(), new Date()],
    notes: ''
  });

  const [stations, setStations] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    const loadStations = async () => {
      const stationsData = await getAndProcessStations();
      setStations(stationsData);
    };

    loadStations();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(formValue);
      const reservationDto: ReservationCreationDto = {
        ...formValue,
        startTime: formValue.timeRange[0].toISOString(),
        endTime: formValue.timeRange[1].toISOString()
      };
      await createReservation(reservationDto);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="booking-container">
      <Form fluid onChange={form => setFormValue(prev => ({ ...prev, ...form }))} formValue={formValue}>
        <Form.Group controlId="spaceId">
          <Form.ControlLabel>Station</Form.ControlLabel>
          <AutoComplete
            className="form-input"
            data={stations.map(station => station.name)}
            onSelect={value => {
              const selectedStation = stations.find(station => station.name === value);
              setFormValue(prev => ({ ...prev, spaceId: selectedStation ? selectedStation.id : 0 }));
            }}
            style={{ width: '100%' }} // Adjust the width as needed
          />
        </Form.Group>
        <Form.Group controlId="reserver">
          <Form.ControlLabel>Reserver</Form.ControlLabel>
          <Form.Control className="form-input" name="reserver" type="text" />
        </Form.Group>
        <Form.Group controlId="endTime">
          <Form.ControlLabel>End Time</Form.ControlLabel>
          <Form.Control
            className="form-input"
            name="timeRange"
            accepter={DateRangePicker}
            format="yyyy-MM-dd HH:mm:ss"
          />
        </Form.Group>
        <Form.Group controlId="notes">
          <Form.ControlLabel>Notes</Form.ControlLabel>
          <Form.Control className="form-input" name="notes" type="text" />
        </Form.Group>
        <Button onClick={handleSubmit} appearance="primary">Create Reservation</Button>
      </Form>
    </div>
  );
};

export default Booking;