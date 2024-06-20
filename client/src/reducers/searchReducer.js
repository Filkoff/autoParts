const SET_RESULT = 'SET_RESULT';
const SET_SORTED_RESULT = 'SET_SORTED_RESULT';

const defaultState = {
  result: [],
  sortedResult: [],
};

export default function searchReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case SET_RESULT:
      return {
        ...state,
        result: payload,
      };
    case SET_SORTED_RESULT:
      return {
        ...state,
        sortedResult: payload,
      };

    default:
      return state;
  }
}

export const setResult = (res) => ({ type: SET_RESULT, payload: res });
export const setSortedResult = (res) => ({
  type: SET_SORTED_RESULT,
  payload: res,
});
