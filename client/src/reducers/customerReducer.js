const SET_CUSTOMER_ORDERS = 'SET_CUSTOMER_ORDERS';
const SET_DELIVERY_DATA = 'SET_DELIVERY_DATA';
const SET_TEMPORARY_CUSTOMER_ORDER = 'SET_TEMPORARY_CUSTOMER_ORDER';
const SET_TEMP_DELIVERY_DATA = 'SET_TEMP_DELIVERY_DATA';
const defaultState = {
  orders: [],
  tempOrders: {},
  tempDeliveryData: {},
  deliveryData: {
    name: '',
    surname: '',
    address: '',
    phone: '',
    time: '',
    saveData: false,
  },
};

export default function customerReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case SET_TEMPORARY_CUSTOMER_ORDER:
      return {
        ...state,
        tempOrders: payload,
      };

    case SET_CUSTOMER_ORDERS:
      return {
        ...state,
        orders: payload,
      };

    case SET_TEMP_DELIVERY_DATA:
      return {
        ...state,
        tempDeliveryData: payload,
      };

    case SET_DELIVERY_DATA:
      return {
        ...state,
        deliveryData: payload,
      };

    default:
      return state;
  }
}
export const tempDeliveryData = (data) => ({
  type: SET_TEMP_DELIVERY_DATA,
  payload: data,
});

export const newDeliveryData = (data) => ({
  type: SET_DELIVERY_DATA,
  payload: data,
});

export const setCustomerOrders = (orders) => ({
  type: SET_CUSTOMER_ORDERS,
  payload: orders,
});

export const setTempCustomerOrder = (order) => ({
  type: SET_TEMPORARY_CUSTOMER_ORDER,
  payload: order,
});
