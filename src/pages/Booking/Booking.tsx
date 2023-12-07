import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { station } = useParams();
  
  return (
    <div>
      <h1>Booking</h1>
      <p>Station: {station}</p>
      <Link to="/booking/manual">Manual booking</Link>
    </div>
  );
}

export default Booking;