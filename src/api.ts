const baseUrl = "https://F21-godsvogn.azurewebsites.net/";

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
interface ProcessedData {
  id: number;
  name: string;
  title: string;
  track: string;
}


function processStations(data: SpaceOverviewDto[]): ProcessedData[] {
  return data.map(item => {
    let processedName = item.name;
    if (item.name.toLowerCase().trim().startsWith("spor")) {
      const descriptionParts = item.description.split(", ");
      processedName = `${descriptionParts[descriptionParts.length - 1]} ${processedName}`;
    }

    const track = item.description.split(", ")[0];

    return {
      id: item.id,
      name: processedName,
      title: item.name,
      track: track
    };
  });
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

export async function getAndProcessStations() {
  try {
    const stationsData = await apiGet<SpaceOverviewDto[]>("spaces");
    return processStations(stationsData);
  } catch (error) {
    console.error("Error fetching or processing station data:", error);
    throw error;
  }
}

export async function getStationData(): Promise<StationData[]> {
  return [
    {
      "groupId": 1,
      "ids": [58, 59, 60, 61, 1025, 1026],
      "station": "Oslo S"
    },
    {
      "groupId": 2,
      "ids": [62, 63],
      "station": "Loenga"
    },
    {
      "groupId": 3,
      "ids": [190, 191, 192, 193, 194, 195, 793, 794, 795, 796, 797, 798],
      "station": "Lillestrøm"
    },
    {
      "groupId": 4,
      "ids": [199, 200, 201, 203, 208, 803],
      "station": "Eidsvoll"
    },
    {
      "groupId": 5,
      "ids": [227],
      "station": "Kirkenær"
    },
    {
      "groupId": 6,
      "ids": [228, 229, 230],
      "station": "Flisa"
    },
    {
      "groupId": 7,
      "ids": [358, 359, 360, 361, 362, 363, 364, 365, 367],
      "station": "Årnes"
    },
    {
      "groupId": 8,
      "ids": [372, 373, 375, 376, 377, 378, 847, 965, 966, 967, 968, 969, 970, 974],
      "station": "Kongsvinger"
    },
    {
      "groupId": 9,
      "ids": [383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393],
      "station": "Ski"
    },
    {
      "groupId": 10,
      "ids": [394, 396],
      "station": "Moss"
    },
    {
      "groupId": 11,
      "ids": [397, 398],
      "station": "Sandesund"
    },
    {
      "groupId": 12,
      "ids": [400, 401, 402, 403, 404, 405, 406, 442, 443],
      "station": "Sarpsborg"
    },
    {
      "groupId": 13,
      "ids": [408],
      "station": "Skjeberg"
    },
    {
      "groupId": 14,
      "ids": [409, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 424, 1048, 1053, 1054, 1055, 1056],
      "station": "Halden"
    },
    {
      "groupId": 15,
      "ids": [425, 426],
      "station": "Askim"
    },
    {
      "groupId": 16,
      "ids": [428, 429],
      "station": "Mysen"
    },
    {
      "groupId": 17,
      "ids": [432, 433, 436],
      "station": "Bjørgeseter"
    },
    {
      "groupId": 18,
      "ids": [465, 469, 470, 472, 474, 475, 644, 645, 646, 647, 651, 852],
      "station": "Eina"
    },
    {
      "groupId": 19,
      "ids": [479, 480, 481],
      "station": "Skøyen"
    },
    {
      "groupId": 20,
      "ids": [517],
      "station": "Kambo"
    },
    {
      "groupId": 21,
      "ids": [551, 552, 553],
      "station": "Høvik"
    },
    {
      "groupId": 22,
      "ids": [554, 555, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 736, 737, 738, 739, 741, 742, 743],
      "station": "Lodalen (delstr.)"
    },
    {
      "groupId": 23,
      "ids": [556, 557],
      "station": "Hvalstad"
    },
    {
      "groupId": 24,
      "ids": [558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569],
      "station": "Filipstad"
    },
    {
      "groupId": 25,
      "ids": [652],
      "station": "Kornsjø"
    },
    {
      "groupId": 26,
      "ids": [683],
      "station": "Omformerstasjon 24"
    },
    {
      "groupId": 27,
      "ids": [751, 752, 753, 754],
      "station": "Rolvsøy"
    },
    {
      "groupId": 28,
      "ids": [771],
      "station": "Roverud"
    },
    {
      "groupId": 29,
      "ids": [791, 792],
      "station": "Braskereidfoss"
    },
    {
      "groupId": 30,
      "ids": [799, 800, 801, 802],
      "station": "Gardermoen"
    },
    {
      "groupId": 31,
      "ids": [857, 858],
      "station": "Gjøvik"
    },
    {
      "groupId": 32,
      "ids": [859, 860, 959, 960, 961],
      "station": "Jaren"
    },
    {
      "groupId": 33,
      "ids": [916, 917, 918, 919, 920, 921],
      "station": "Hauerseter"
    },
    {
      "groupId": 34,
      "ids": [964],
      "station": "Omformerstasjon 25"
    },
    {
      "groupId": 35,
      "ids": [976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022],
      "station": "Nyland (delstr.)"
    },
    {
      "groupId": 36,
      "ids": [1057],
      "station": "Berg"
    },
    {
      "groupId": 37,
      "ids": [1065],
      "station": "Stryken"
    }
  ]
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
  description: string;
}

export interface StationData {
  groupId: number;
  ids: number[];
  station: string;
}