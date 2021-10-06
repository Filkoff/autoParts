const SET_ITEMS_BY_DEALER = 'SET_ITEMS_BY_DEALER';

const defaultState = {
  items: [],
};

export default function sortedCartReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case SET_ITEMS_BY_DEALER:
      return {
        ...state,
        items: payload,
      };

    default:
      return state;
  }
}

export const setSortedCart = (orders) => ({
  type: SET_ITEMS_BY_DEALER,
  payload: orders,
});
