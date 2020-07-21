import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import { useCallback } from 'react';
import backendFunctions from 'services/firebase/functions';
import { setAllRestaurantNames } from 'store/actions/restaurantActions';

function useRestaurant() {
  const dp = useDispatch();
  const { allRestaurantNames } = useSelector((state: RootState) => {
    return state.restaurant;
  });
  const setRestaurantNameList = useCallback(async () => {
    try {
      const res = await backendFunctions.getAllRestaurantNames();
      const names = res.data.names.sort();
      dp(setAllRestaurantNames(names));
    } catch (error) {
      console.log(error);
    }
  }, [dp]);
  const getRestaurantByName = useCallback(async (name) => {
    const res = await backendFunctions.getRestaurant('name', name);
    const restaurant = res.data;
    console.log(restaurant);

    return restaurant;
  }, []);
  return {
    allRestaurantNames,
    setRestaurantNameList,
    getRestaurantByName,
  };
}

export { useRestaurant };
