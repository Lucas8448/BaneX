// Home.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStationData, StationData } from '../api';
import './Home.css';

export default function Home() {
  const [stations, setStations] = useState<StationData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStationData()
      .then(setStations)
      .catch(error => {
        console.error('Failed to fetch station data:', error);
      });
  }, []);

  const handleStationClick = (id: number) => {
    navigate(`/booking/${id}`);
  };

  return (
    <div className="home">
      <h1>Velg Stasjon</h1>
      <div className="station-grid">
        {stations.map((station) => (
          <button
            key={station.groupId}
            className="station-button"
            onClick={() => handleStationClick(station.groupId)}
          >
            {station.station}
            <span className="material-symbols-outlined float-right">
              arrow_forward_ios
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
