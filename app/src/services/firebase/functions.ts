import { fireFunctions } from './init';

interface FireFunctions {
  getAllRestaurantNames: firebase.functions.HttpsCallable;
}

const backendFunctions: FireFunctions = {
  getAllRestaurantNames: fireFunctions.httpsCallable('allRestaurantNames'),
};

export default backendFunctions;
