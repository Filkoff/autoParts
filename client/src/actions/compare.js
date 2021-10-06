import axios from 'axios';

export const getComparedParts = async (category, name, models) => {
  try {
    await axios.post('http://localhost:8080/api/dealers/parts/compare', {
      category,
      name,
      models,
    });
  } catch (e) {
    console.log(e.message);
  }
};
