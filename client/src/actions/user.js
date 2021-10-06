import axios from 'axios';
import { addAddress, setUser } from '../reducers/userReducer';

export const registration = async (name, email, password, type) => {
  try {
    await axios.post('http://localhost:8080/api/register', {
      name,
      email,
      password,
      type,
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
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
      const response = await axios.get('http://localhost:8080/api/auth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      console.log(e.message);
      localStorage.removeItem('token');
    }
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
        'http://localhost:8080/api/user/avatar',
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        'http://localhost:8080/api/user/avatar',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeName = (id, name) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/profile/name',

        { id, name }
      );
      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeDescription = (id, description) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/profile/description',

        { id, description }
      );
      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const setAddress = (id, address) => {
  return async (dispatch) => {
    try {
      await axios.post(
        'http://localhost:8080/api/user/profile/address',

        { id, address }
      );
      dispatch(addAddress(address));
    } catch (e) {
      console.log(e.message);
    }
  };
};
