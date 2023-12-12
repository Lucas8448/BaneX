import { Space, getSpaceReservations } from './api';

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


const scoreSpace = (space: Space, preferences: Preferences): number => {
  let score = 0;
  console.log(`Scoring space: ${space.id}, Length: ${space.length}`);

  const compareFeature = (feature: keyof Preferences, spaceFeature: keyof Space) => {
    const result = preferences[feature] === (space[spaceFeature] === 'Ja');
    console.log(`Comparing feature ${feature} (${preferences[feature]}) with space feature ${spaceFeature} (${space[spaceFeature]}): ${result}`);
    return result;
  }

  score += compareFeature('serviceRamp', 'serviceRamp') ? 5 : 0;
  score += compareFeature('deIcing', 'deIcing') ? 5 : 0;
  score += compareFeature('waterFilling', 'waterFilling') ? 5 : 0;
  score += compareFeature('trainWashing', 'trainWashing') ? 5 : 0;
  score += compareFeature('dieselRefueling', 'dieselRefueling') ? 5 : 0;
  score += compareFeature('graffitiRemoval', 'graffitiRemoval') ? 5 : 0;
  score += compareFeature('accessibleByCar', 'accessibleByCarKioskResupplyAndService') ? 5 : 0;
  score += compareFeature('sewageEmptying', 'sewageEmptyingByCar') || compareFeature('sewageEmptying', 'sewageEmptyingStationary') ? 5 : 0;

  return score;
};

const bestMatch = async (spaces: Space[], preferences: Preferences, startTime: Date, endTime: Date): Promise<{ space: Space, score: number, satisfiedRequirements: string[] }[]> => {
  console.log('Finding best match with given preferences:', preferences);
  console.log(`Start time: ${startTime}, End time: ${endTime}`);
  const freeSpaces = [];

  for (const space of spaces) {
    console.log(`Checking space: ${space.id}, Status: ${space.status}`);
    if (space.status !== 'free') continue;

    const reservations = await getSpaceReservations(space.id);
    const isReserved = reservations.some(reservation => {
      const startCondition = new Date(reservation.startTime) <= startTime && new Date(reservation.endTime) > startTime;
      const endCondition = new Date(reservation.startTime) < endTime && new Date(reservation.endTime) >= endTime;
      console.log(`Reservation for space ${space.id}: Start - ${reservation.startTime}, End - ${reservation.endTime}, Start condition: ${startCondition}, End condition: ${endCondition}`);
      return startCondition || endCondition;
    });

    console.log(`Space ${space.id} isReserved: ${isReserved}`);
    if (!isReserved) {
      freeSpaces.push(space);
    }
  }

  console.log(`Free spaces found: ${freeSpaces.map(space => space.id).join(', ')}`);

  const result = freeSpaces
    .map(space => {
      const score = scoreSpace(space, preferences);
      const satisfiedRequirements = Object.keys(preferences)
        .filter(pref => preferences[pref as keyof Preferences] === (space[pref as keyof Space] === 'Ja'));
      console.log(`Space: ${space.id}, Score: ${score}, Satisfied requirements: ${satisfiedRequirements.join(', ')}`);
      return { space, score, satisfiedRequirements };
    })
    .sort((a, b) => b.score - a.score);

  console.log('Sorted result:', result);
  return result;
};

export default bestMatch;

