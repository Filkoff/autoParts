import axios from 'axios';
import { getAuthToken } from '../utils/getAuthToken';
import {
  addPart,
  changePart,
  deletePart,
  setDealerOrders,
  setDealerParts,
} from '../reducers/dealerReducer';
import { BASE_URL } from '../consts/index';

export const getAllDealerParts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(BASE_URL + 'dealer/parts/all', {
        headers: { Authorization: getAuthToken() },
      });
      dispatch(setDealerParts(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const deleteDealerPart = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(BASE_URL + 'dealer/parts/:id', {
        headers: { Authorization: getAuthToken() },
      });
      dispatch(deletePart(id));
    } catch (e) {
      console.error(e.message);
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
      await axios.patch(
        BASE_URL + 'dealer/parts/:id',
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
          headers: { Authorization: getAuthToken() },
        }
      );
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
      console.error(e.message);
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
  return async (dispatch) => {
    try {
      await axios.post(
        BASE_URL + 'dealer/parts/add',
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
          headers: { Authorization: getAuthToken() },
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
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const dealerOrders = (id) => {
  return async (dispatch) => {
    try {
      const orders = await axios.get(BASE_URL + `dealer/:${id}/orders`, {
        headers: { Authorization: getAuthToken() },
      });

      dispatch(setDealerOrders(orders.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};
