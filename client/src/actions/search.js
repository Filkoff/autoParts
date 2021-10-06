import axios from 'axios';
import { setResult, setSortedResult } from '../reducers/searchReducer';

export const searchParts = (category = '', model = '', name = '') => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/dealers/parts/all',
        {
          category,
          model,
          name,
        }
      );
      dispatch(setResult(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
export const searchPartsByDistance = (category, model, name, coordinates) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/dealers/parts/all/byDistance',
        {
          category,
          model,
          name,
          coordinates,
        }
      );
      console.log(response.data);
      dispatch(setSortedResult(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
