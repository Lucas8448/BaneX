import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Space, getSpace, getStationData } from '../../api';
import bestMatch from '../../bestMatch';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import './Booking.css';

// Define stages
const STAGES = {
  PREFERENCES: 0,
  START_TIME_SELECTION: 1,
  END_TIME_SELECTION: 2,
  RESULTS: 3
};

const initialPreferences = {
  minLength: 0,
  serviceRamp: false,
  deIcing: false,
  waterFilling: false,
  trainWashing: false,
  dieselRefueling: false,
  graffitiRemoval: false,
  accessibleByCar: false,
  sewageEmptying: false,
};

interface Preferences {
  minLength: number;
  serviceRamp: boolean;
  deIcing: boolean;
  waterFilling: boolean;
  trainWashing: boolean;
  dieselRefueling: boolean;
  graffitiRemoval: boolean;
  accessibleByCar: boolean;
  sewageEmptying: boolean;
}

interface Match {
  space: Space;
  score: number;
  satisfiedRequirements: string[];
}

const Booking = () => {
  const { station_id } = useParams<{ station_id: string }>();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [preferences, setPreferences] = useState<Preferences>(initialPreferences);
  const [currentStage, setCurrentStage] = useState(STAGES.PREFERENCES);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [bestMatches, setBestMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (station_id) {
      getStationData()
        .then(stationData => {
          const matchedStation = stationData.find(station => station.groupId === parseInt(station_id));
          if (matchedStation) {
            Promise.all(matchedStation.ids.map(id => getSpace(id)))
              .then(fetchedSpaces => setSpaces(fetchedSpaces))
              .catch(error => console.error("Error fetching spaces for station:", error));
          }
        })
        .catch(error => console.error("Error fetching station data:", error));
    }
  }, [station_id]);

  const handlePreferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, type, value } = event.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseInt(value)
    }));
    console.log(preferences)
  };

  const handleStartTimeChange = (newTime: Date) => {
    setStartTime(newTime);
    setCurrentStage(STAGES.END_TIME_SELECTION);
    console.log('New start time selected:', newTime);
  };

  const handleEndTimeChange = (newTime: Date) => {
    setEndTime(newTime);
    findBestMatches();
    console.log('New end time selected:', newTime);
  };

  const findBestMatches = async () => {
    const matches = await bestMatch(spaces, preferences, startTime, endTime);
    setBestMatches(matches);
    setCurrentStage(STAGES.RESULTS);
    console.log("Finding best matches with preferences", preferences, "end time", endTime, "start time", startTime, "and providing spaces", spaces);
  };

  return (
    <div className="container">
      <h1>Booking</h1>
      {currentStage === STAGES.PREFERENCES && (
        <form>
          <label>
            Train length: {preferences.minLength}
            <input
              type="range"
              name="minLength"
              min="0"
              max="500"
              value={preferences.minLength}
              onChange={handlePreferenceChange}
            />
          </label>
          <div className="checkbox-container">
            Service Ramp
            <input
              type="checkbox"
              name="serviceRamp"
              checked={preferences.serviceRamp}
              onChange={handlePreferenceChange}
            />
            <span className="checkmark"></span>
          </div>
          <div className="checkbox-container">
            De-Icing
            <input
              type="checkbox"
              name="deIcing"
              checked={preferences.deIcing}
              onChange={handlePreferenceChange}
            />
            <span className="checkmark"></span>
          </div>
          <div className="checkbox-container">
            Water Filling
            <input
              type="checkbox"
              name="waterFilling"
              checked={preferences.waterFilling}
              onChange={handlePreferenceChange}
            />
            <span className="checkmark"></span>
          </div>
          <div className="checkbox-container">
            Train Washing
            <input
              type="checkbox"
              name="trainWashing"
              checked={preferences.trainWashing}
              onChange={handlePreferenceChange}
            />
            <span className="checkmark"></span>
          </div>
          <div className="checkbox-container">
            Diesel Refueling
            <input
              type="checkbox"
              name="dieselRefueling"
              checked={preferences.dieselRefueling}
              onChange={handlePreferenceChange}
            />
            <span className="checkmark"></span>
          </div>
          <div className="checkbox-container">
            Graffiti Removal
            <input
              type="checkbox"
              name="graffitiRemoval"
              checked={preferences.graffitiRemoval}
              onChange={handlePreferenceChange}
            />
            <span className="checkmark"></span>
          </div>
          <div className="checkbox-container">
            Accessible By Car
            <input
              type="checkbox"
              name="accessibleByCar"
              checked={preferences.accessibleByCar}
              onChange={handlePreferenceChange}
            />
            <span className="checkmark"></span>
          </div>
          <div className="checkbox-container">
            Sewage Emptying
            <input
              type="checkbox"
              name="sewageEmptying"
              checked={preferences.sewageEmptying}
              onChange={handlePreferenceChange}
            />
            <span className="checkmark"></span>
          </div>
          <button type="button" onClick={() => setCurrentStage(STAGES.START_TIME_SELECTION)}>Next</button>
        </form>
      )}
      {currentStage === STAGES.START_TIME_SELECTION && (
        <div className="time-picker">
          <label>Start Time</label>
          <DayTimePicker
            timeSlotSizeMinutes={15}
            onConfirm={handleStartTimeChange}
            value={startTime}
          />
        </div>
      )}
      {currentStage === STAGES.END_TIME_SELECTION && (
        <div className="time-picker">
          <label>End Time</label>
          <DayTimePicker
            timeSlotSizeMinutes={15}
            onConfirm={handleEndTimeChange}
            value={endTime}
          />
        </div>
      )}
      {currentStage === STAGES.RESULTS && bestMatches.map((match, index) => (
        <div key={index} className="match">
          <p>Track Name: {match.space.name}</p>
          <p>Track Length: {match.space.length}</p>
          <p>Score: {match.score}</p>
          <p>Satisfied Requirements: {match.satisfiedRequirements.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default Booking;