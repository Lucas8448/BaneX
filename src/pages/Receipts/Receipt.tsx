import React from 'react';
import { useParams } from 'react-router-dom';

const Receipt = () => {
  const { receiptId } = useParams();

  return (
    <div>
      <h1>Receipt Details</h1>
      <p>This is the details page for receipt ID: {receiptId}</p>
    </div>
  );
}

export default Receipt;