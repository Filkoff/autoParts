import axios from 'axios';
import { addAddress, setUser } from '../reducers/userReducer';
import { BASE_URL } from '../consts/index';

export const registration = async (name, email, password, type) => {
  try {
    await axios.post(BASE_URL + 'register', {
      name,
      email,
      password,
      type,
    });
  } catch (e) {
    alert(e.message);
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(BASE_URL + 'login', {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      alert(e.message);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(BASE_URL + 'auth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      console.error(e.message);
      localStorage.removeItem('token');
    }
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(BASE_URL + 'user/avatar', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setUser(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(BASE_URL + 'user/avatar', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setUser(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const changeName = (id, name) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        BASE_URL + 'user/profile/name',

        { id, name }
      );
      dispatch(setUser(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const changeDescription = (id, description) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        BASE_URL + 'user/profile/description',

        { id, description }
      );
      dispatch(setUser(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const setAddress = (id, address) => {
  return async (dispatch) => {
    try {
      await axios.post(
        BASE_URL + 'user/profile/address',

        { id, address }
      );
      dispatch(addAddress(address));
    } catch (e) {
      console.error(e.message);
    }
  };
};
