import axios from 'axios';
import {
  addPart,
  changePart,
  deletePart,
  setDealerOrders,
  setDealerParts,
} from '../reducers/dealerReducer';

export const getAllDealerParts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/dealer/parts/all',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(setDealerParts(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const deleteDealerPart = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete('http://localhost:8080/api/dealer/parts/:id', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(deletePart(id));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const changeDealerPart = (
  id,
  category,
  name,
  description,
  models,
  img,
  condition,
  price,
  production
) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        'http://localhost:8080/api/dealer/parts/:id',
        {
          id,
          category,
          name,
          description,
          models,
          img,
          condition,
          price,
          production,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      console.log(response);
      dispatch(
        changePart({
          id,
          category,
          name,
          description,
          models,
          img,
          condition,
          price,
          production,
        })
      );
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const addNewPart = (
  id,
  category,
  name,
  description,
  models,
  img,
  condition,
  price,
  production
) => {
  try {
    async (dispatch) => {
      await axios.post(
        'http://localhost:8080/api/dealer/parts/add',
        {
          id,
          category,
          name,
          description,
          models,
          img,
          condition,
          price,
          production,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(
        addPart({
          id,
          category,
          name,
          description,
          models,
          img,
          condition,
          price,
          production,
        })
      );
    };
  } catch (e) {
    console.log(e.message);
  }
};

export const dealerOrders = (id) => {
  return async (dispatch) => {
    try {
      const orders = await axios.get(
        `http://localhost:8080/api/dealer/:${id}/orders`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      dispatch(setDealerOrders(orders.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
