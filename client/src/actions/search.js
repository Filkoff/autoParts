import axios from 'axios';
import { setResult, setSortedResult } from '../reducers/searchReducer';
import { BASE_URL } from '../consts/baseURL';

export const searchParts = (category = '', model = '', name = '') => {
  return async (dispatch) => {
    console.log('dis:', category, model, name);
    try {
      const response = await axios.post(BASE_URL + 'dealers/parts/all', {
        category,
        model,
        name,
      });
      dispatch(setResult(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};
export const searchPartsByDistance = (category, model, name, coordinates) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        BASE_URL + 'dealers/parts/all/byDistance',
        {
          category,
          model,
          name,
          coordinates,
        }
      );
      dispatch(setSortedResult(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};
