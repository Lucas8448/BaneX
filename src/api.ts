const baseUrl = "http://localhost:5167/";

async function apiGet<T>(path: string) {
  const response = await fetch(baseUrl + path, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  if (!response.ok)
    throw Error(
      `${response.status}: ${response.statusText} on ${response.url}`
    );
  return response.json() as T;
}

async function apiPost<TResult>(path: string, body: unknown) {
  const response = await fetch(baseUrl + path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  if (response.status === 404)
    throw new Error(
      `${response.status}: ${response.statusText} on ${response.url}`
    );
  return response.json() as TResult;
}

export async function getLocationsOverview() {
  return apiGet<LocationOverviewDto[]>("locations");
}

export async function getLocation(id: string) {
  return apiGet<Location>(`locations/${id}`);
}

export async function getSpacesOverview() {
  return apiGet<SpaceOverviewDto[]>("spaces");
}

export async function getSpace(id: number | string) {
  return apiGet<Space>(`spaces/${id}`);
}

export async function getSpaceReservations(id: number | string) {
  return apiGet<ReservationOverviewDto[]>(`spaces/${id}/reservations`);
}

export async function getReservationsOverview() {
  return apiGet<ReservationOverviewDto[]>("reservations");
}

export async function getReservation(id: string) {
  return apiGet<Reservation>(`reservations/${id}`);
}

export async function createReservation(reservation: ReservationCreationDto) {
  return apiPost<Reservation>("reservations", reservation);
}

export interface Location {
  id: string;
  status: string;
  trackNumber?: string;
  trackResponsible?: string;
  area?: string;
  track?: string;
}
export interface LocationOverviewDto {
  id: string;
  trackNumber?: string;
  area?: string;
  status: string;
}
export interface Reservation {
  id: string;
  spaceId: number;
  space: Space;
  reserver: string;
  startTime: Date;
  endTime: Date;
  notes: string;
}
export interface ReservationOverviewDto {
  id: string;
  spaceId: number;
  spaceName: string;
  reserver: string;
  startTime: Date;
  endTime: Date;
}
export interface ReservationCreationDto {
  spaceId: number;
  reserver: string;
  startTime: string;
  endTime: string;
  notes: string;
}
export interface Space {
  id: number;
  globalId: string;
  locationId: string;
  location: Location;
  beskrivelse?: string;
  name: string;
  from?: number;
  to?: number;
  trackType: string;
  trackId: string;
  status: string;
  lastChangedBy: string;
  lastChanged: Date;
  belongsTo: string;
  trackPriority: number;
  activeFrom?: string;
  owner: string;
  trackUsageType: string;
  trainPlacementLength?: number;
  length?: number;
  fromSignal?: string;
  toSignal?: string;
  serviceRamp?: string;
  deIcing?: string;
  waterFilling?: string;
  trainWashing?: string;
  dieselRefueling?: string;
  notes?: string;
  serviceHouseForCleaningSuppliers?: string;
  graffitiRemoval?: string;
  accessibleByCarKioskResupplyAndService?: string;
  sewageEmptyingByCar?: string;
  sewageEmptyingStationary?: string;
  startNorth?: string;
  startEast?: string;
  endNorth?: string;
  endEast?: string;
}
export interface SpaceOverviewDto {
  id: number;
  name: string;
  description?: string;
}
