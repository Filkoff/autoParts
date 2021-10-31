import axios from 'axios';
import { setParts } from '../reducers/partsReducer';
import { BASE_URL } from '../consts/index';

export const getAllModels = async () => {
  try {
    await axios.get(BASE_URL + 'models/all');
  } catch (e) {
    console.error(e.message);
  }
};

export const getAllParts = () => {
  return async (dispatch) => {
    try {
      const parts = await axios.get(BASE_URL + 'parts/all');
      dispatch(setParts(parts.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};
