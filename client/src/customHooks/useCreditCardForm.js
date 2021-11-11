import validateInfo from '../utils/validateInfo';
import { customerOrders } from '../actions/customer';
import { removeOrdered } from '../reducers/cartReducer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useCreditCardForm = () => {
  const [values, setValues] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiration: '',
    cardSecurityCode: '',
    focus: '',
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.customer.tempOrders);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [errors, setErrors] = useState({});

  const handleFocus = (e) => {
    setValues({
      ...values,
      focus: e.target.name === 'cardSecurityCode' ? 'cvc' : e.target.name,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));

    if (validateInfo(values).valid) {
      dispatch(customerOrders(currentUser.id));
      dispatch(removeOrdered(orders));
      history.push('/order/success');
    }
  };

  return {
    handleChange,
    handleFocus,
    handleSubmit,
    values,
    errors,
  };
};

export default useCreditCardForm;
