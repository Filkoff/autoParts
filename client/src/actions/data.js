import axios from 'axios';
import { setParts } from '../reducers/partsReducer';

export const getAllModels = async () => {
  try {
    await axios.get('http://localhost:8080/api/models/all');
  } catch (e) {
    console.log(e.message);
  }
};

export const getAllParts = () => {
  return async (dispatch) => {
    try {
      const parts = await axios.get('http://localhost:8080/api/parts/all');
      dispatch(setParts(parts.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
