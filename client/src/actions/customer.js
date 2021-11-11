import axios from 'axios';
import { setCustomerOrders } from '../reducers/customerReducer';
import { BASE_URL } from '../consts/index';

export const setDeliveryData = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(BASE_URL + 'user/delivery-data', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setDeliveryData({ data }));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const customerOrders = (id) => {
  return async (dispatch) => {
    try {
      const orders = await axios.get(BASE_URL + `user/:${id}/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setCustomerOrders(orders.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};
