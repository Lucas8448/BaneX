import React from 'react';
import { Link } from 'react-router-dom';

const Booking = () => {
  return (
    <div>
      <h1>Train Station Booking</h1>
      <p>Select an option to proceed with your booking:</p>

      <div>
        <Link to="/booking/manual">Manual Booking</Link>
        <br />
        <Link to="/booking/confirm">Confirm Booking</Link>
      </div>
    </div>
  );
}

export default Booking;