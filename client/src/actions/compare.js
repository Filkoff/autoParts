import axios from 'axios';
import { BASE_URL } from '../consts/index';

export const getComparedParts = async (category, name, models) => {
  try {
    await axios.post(BASE_URL + 'dealers/parts/compare', {
      category,
      name,
      models,
    });
  } catch (e) {
    console.error(e.message);
  }
};
