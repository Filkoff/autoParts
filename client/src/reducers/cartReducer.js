const CLEAR_CART = 'CLEAR_CART';
const REMOVE_ITEM = 'REMOVE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const PLUS_ITEM = 'PLUS_ITEM';
const MINUS_ITEM = 'MINUS_ITEM';
const REMOVE_ORDERED = 'REMOVE_ORDERED';
let sameItem;
let addingdItem;
let subtractionItem;
let result;

const defaultState = {
  items: [],
};

export default function cartReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      };

    case ADD_ITEM:
      sameItem = state.items.find((i) => i.id === payload.id);
      if (sameItem) {
        sameItem.amount += 1;
        return {
          ...state,
          items: [...state.items],
        };
      } else
        return {
          ...state,
          items: [...state.items, payload],
        };

    case PLUS_ITEM:
      addingdItem = state.items.find((item) => item.id === payload);
      addingdItem.amount += 1;
      return {
        ...state,
        items: [...state.items],
      };

    case MINUS_ITEM:
      subtractionItem = state.items.find((item) => item.id === payload);
      subtractionItem.amount -= 1;
      if (subtractionItem.amount < 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== payload),
        };
      } else {
        return {
          ...state,
          items: [...state.items],
        };
      }

    case REMOVE_ORDERED:
      result = state.items;
      for (let i of payload) {
        result = result.filter((item) => item.id !== i.id);
      }
      return {
        ...state,
        items: [...result],
      };

    default:
      return state;
  }
}

export const clearCart = () => ({ type: CLEAR_CART });
export const removeItem = (id) => ({ type: REMOVE_ITEM, payload: id });
export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: { ...item, amount: 1 },
});
export const plusItem = (id) => ({ type: PLUS_ITEM, payload: id });
export const minusItem = (id) => ({ type: MINUS_ITEM, payload: id });
export const removeOrdered = (items) => ({
  type: REMOVE_ORDERED,
  payload: items,
});
