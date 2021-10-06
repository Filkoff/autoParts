const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const ADD_ADDRESS = 'ADD_ADDRESS';

const defaultState = {
  currentUser: {},
  isAuth: false,
  address: '',
};

export default function userReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        currentUser: payload,
        isAuth: true,
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };

    case ADD_ADDRESS:
      return {
        ...state,
        address: payload,
      };

    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const logout = () => ({ type: LOGOUT });
export const addAddress = (address) => ({
  type: ADD_ADDRESS,
  payload: address,
});
