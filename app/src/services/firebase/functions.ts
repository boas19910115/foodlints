import { fireFunctions } from './init';

interface FireFunctions {
  getAllRestaurantNames: firebase.functions.HttpsCallable;
  getRestaurant: (
    where: string,
    is: string
  ) => Promise<firebase.functions.HttpsCallableResult>;
}

const backendFunctions: FireFunctions = {
  getAllRestaurantNames: fireFunctions.httpsCallable('allRestaurantNames'),
  getRestaurant: (where, is) => {
    const getRestaurant = fireFunctions.httpsCallable(`restaurant`);
    return getRestaurant({ where, is });
  },
};

export default backendFunctions;
