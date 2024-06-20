const ADD_COMPARED_PART = 'ADD_COMPARED_PART';

const defaultState = {
  result: [],
};

export default function compareReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case ADD_COMPARED_PART:
      return {
        ...state,
        result: payload,
      };

    default:
      return state;
  }
}

export const setComparedParts = (res) => ({
  type: ADD_COMPARED_PART,
  payload: res,
});
