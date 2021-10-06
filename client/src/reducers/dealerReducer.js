const SET_DEALER_PARTS = 'SET_DEALER_PARTS';
const DELETE_PART = 'DELETE_PART';
const CHANGE_PART = 'CHANGE_PART';
const ADD_PART = 'ADD_PART';
const SET_DEALER_ORDERS = 'SET_DEALER_ORDERS';
const SET_CHOOSEN_DEALER = 'SET_CHOOSEN_DEALER';
let index;

const defaultState = {
  result: [],
  orders: [],
  choosenDealer: {},
};

export default function dealerReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case SET_DEALER_PARTS:
      return {
        ...state,
        result: payload,
      };

    case DELETE_PART:
      return {
        ...state,
        result: state.result.filter((item) => item.id !== payload),
      };

    case CHANGE_PART:
      index = state.result.findIndex((item) => item.id === payload.id);
      state.result[index] = payload;

      return {
        ...state,
        result: [...state.result],
      };

    case ADD_PART:
      return {
        ...state,
        result: [...state.result, payload],
      };

    case SET_DEALER_ORDERS:
      return {
        ...state,
        orders: payload,
      };

    case SET_CHOOSEN_DEALER:
      return {
        ...state,
        choosenDealer: {
          id: payload.id,
          name: payload.name,
          address: payload.address,
        },
      };

    default:
      return state;
  }
}

export const setDealerParts = (res) => ({
  type: SET_DEALER_PARTS,
  payload: res,
});

export const deletePart = (id) => ({ type: DELETE_PART, payload: id });

export const changePart = (part) => ({ type: CHANGE_PART, payload: part });

export const addPart = (part) => ({ type: ADD_PART, payload: part });

export const setDealerOrders = (orders) => ({
  type: SET_DEALER_ORDERS,
  payload: orders,
});
export const setChoosenDealer = (id, name, address) => ({
  type: SET_CHOOSEN_DEALER,
  payload: { id, name, address },
});
