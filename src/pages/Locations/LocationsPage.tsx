import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
  getLocationsOverview,
  getLocation,
  LocationOverviewDto,
} from './../../api';
import './LocationsPage.css';

const { Column, HeaderCell, Cell } = Table;

interface LocationData {
  id: string;
  status: string;
  trackNumber?: string;
  trackResponsible?: string;
  area?: string;
  track?: string;
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<LocationOverviewDto[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState<boolean | 'static' | undefined>(
    'static'
  );

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocationsOverview();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  async function openModal(locationId: string) {
    try {
      const locationData: LocationData = await getLocation(locationId);
      setSelectedLocation(locationData);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  }

  async function closeModal() {
    setOpen(false);
  }

  return (
    <div className="locationsPageContainer">
      <h2 className="locationsPageTitle">Lokasjons oversikt</h2>
      <div className="tableContainer">
        <Table
          className="customTable"
          data={locations}
          onRowClick={data => {
            openModal(data.id);
          }}
          height={600}
        >
          <Column flexGrow={1} align="center">
            <HeaderCell>Bane ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column flexGrow={2} align="center">
            <HeaderCell>Spor</HeaderCell>
            <Cell dataKey="trackNumber" />
          </Column>

          <Column flexGrow={1} align="center">
            <HeaderCell>Område</HeaderCell>
            <Cell dataKey="area" />
          </Column>

          <Column flexGrow={1} align="center">
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>
        </Table>
      </div>
      <Modal
        className="customModal"
        backdrop={backdrop}
        keyboard={false}
        open={open}
        onClose={closeModal}
      >
        <Modal.Header className="customModalHeader">
          <Modal.Title>{selectedLocation?.trackNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="customModalBody">
          <p>{selectedLocation?.track}</p>
          <p>{selectedLocation?.id}</p>
          <p>Spor Ansvarlig: {selectedLocation?.trackResponsible}</p>
          <p>Område: {selectedLocation?.area}</p>
        </Modal.Body>
        <Modal.Footer className="customModalFooter">
          <Button onClick={closeModal} appearance="subtle">
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}