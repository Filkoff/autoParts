const SET_PARTS = 'SET_PARTS';

const defaultState = {
  result: [],
};

export default function partsReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case SET_PARTS:
      return {
        ...state,
        result: payload,
      };

    default:
      return state;
  }
}

export const setParts = (res) => ({ type: SET_PARTS, payload: res });
