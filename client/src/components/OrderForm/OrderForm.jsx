import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Container,
  NativeSelect,
  TextField,
} from '@material-ui/core';
import Modal from '../Modal/ModalWindow';
import {
  newDeliveryData,
  tempDeliveryData,
} from '../../reducers/customerReducer';
import { customerOrders } from '../../actions/customer';
import { removeOrdered } from '../../reducers/cartReducer';
import styles from './OrderForm.module.scss';

function OrderForm() {
  const deliveryData = useSelector((state) => state.customer.deliveryData);
  const [deliveryDataList, setDeliveryDataList] = useState({
    name: deliveryData.name,
    surname: deliveryData.surname,
    address: deliveryData.address,
    phone: deliveryData.phone,
    time: deliveryData.time,
    saveData: deliveryData.savedata,
  });
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.customer.tempOrders);
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleSubmit = (event) => {
    if (deliveryDataList.saveData) {
      dispatch(newDeliveryData(deliveryDataList));
    }
    dispatch(tempDeliveryData(deliveryDataList));
    event.preventDefault();
    setIsVisible(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formDiv}>
          <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <h2>{t('orderForm')}</h2>
              <Container maxWidth="lg">
                <div className={styles.inputs}>
                  <div className={styles.inputContainer}>
                    <TextField
                      id="nameInput"
                      label={t('name')}
                      className={styles.input}
                      name="name"
                      type="text"
                      value={deliveryDataList.name}
                      onChange={(e) =>
                        setDeliveryDataList({
                          ...deliveryDataList,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <TextField
                      id="surnameInput"
                      label={t('surname')}
                      className={styles.input}
                      name="surname"
                      type="text"
                      value={deliveryDataList.surname}
                      onChange={(e) =>
                        setDeliveryDataList({
                          ...deliveryDataList,
                          surname: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <TextField
                      id="addressInput"
                      className={styles.input}
                      label={t('address')}
                      name="address"
                      type="text"
                      value={deliveryDataList.address}
                      onChange={(e) =>
                        setDeliveryDataList({
                          ...deliveryDataList,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <TextField
                      id="phoneInput"
                      className={styles.input}
                      label={t('phone')}
                      name="phone"
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '\\+[0-9-]*',
                      }}
                      value={deliveryDataList.phone}
                      helperText={`${t('format')}: +375-29-111-11-11`}
                      onChange={(e) =>
                        setDeliveryDataList({
                          ...deliveryDataList,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <NativeSelect
                      id="timeSelect"
                      name="time"
                      value={deliveryDataList.time}
                      onChange={(e) =>
                        setDeliveryDataList({
                          ...deliveryDataList,
                          time: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        {t('deliveryTime')}:
                      </option>
                      <option value="10:00-15:00">10:00-15:00</option>
                      <option value="18:00-20:00">18:00-20:00</option>
                    </NativeSelect>
                  </div>
                  <div className={styles.saveCheck}>
                    <label>
                      <Checkbox
                        name="saveData"
                        onChange={() => {
                          setDeliveryDataList({
                            ...deliveryDataList,
                            saveData: !deliveryDataList.savedata,
                          });
                        }}
                      />
                      {t('saveData')}
                    </label>
                  </div>
                </div>
                <Button
                  id="goToPayment"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  {t('toPay')}
                </Button>
              </Container>
            </form>
          </div>
          <Modal show={isVisible} setShow={setIsVisible}>
            <h3 className={styles.header}>{t('paymentType')}</h3>
            <NavLink to="/order/success">
              <Button
                id="payByCashButton"
                className={styles.button}
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(customerOrders(currentUser.id));
                  dispatch(removeOrdered(orders));
                }}
              >
                {t('cash')}
              </Button>
            </NavLink>
            <NavLink to="/order/card-data">
              <Button
                id="payByCardButton"
                className={styles.button}
                variant="contained"
                color="primary"
              >
                {t('byCard')}
              </Button>
            </NavLink>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
