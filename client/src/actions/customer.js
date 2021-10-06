import { setCustomerOrders } from '../reducers/customerReducer';
import axios from 'axios';

export const setDeliveryData = (data) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:8080/api/user/delivery-data', {
        data,
      });
      dispatch(setDeliveryData({ data }));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const customerOrders = (id) => {
  return async (dispatch) => {
    try {
      const orders = await axios.get(
        `http://localhost:8080/api/user/:${id}/orders`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(setCustomerOrders(orders.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
