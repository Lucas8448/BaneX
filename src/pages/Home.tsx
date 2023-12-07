// Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStationData, StationData } from '../api';
import './Home.css';

interface StationButtonProps {
  station: StationData;
  onClick: (id: number) => void;
}

const StationButton: React.FC<StationButtonProps> = ({ station, onClick }) => (
  <button
    key={station.groupId}
    className="station-button"
    onClick={() => onClick(station.groupId)}
    aria-label={`Station ${station.station}`}
  >
    {station.station}
    <span className="material-symbols-outlined float-right">
      arrow_forward_ios
    </span>
  </button>
);

const Home: React.FC = () => {
  const [stations, setStations] = useState<StationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getStationData()
      .then(data => {
        setStations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch station data:', error);
        setError('Error fetching station data');
        setLoading(false);
      });
  }, []);

  const handleStationClick = (id: number): void => {
    navigate(`/booking/${id}`);
  };

  if (loading) return <p>Loading stations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home">
      <h1>Velg Stasjon</h1>
      <div className="station-grid">
        {stations.map((station) => (
          <StationButton
            key={station.groupId}
            station={station}
            onClick={handleStationClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;