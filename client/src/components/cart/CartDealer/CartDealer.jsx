import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import shortid from 'shortid';
import { setTempCustomerOrder } from '../../../reducers/customerReducer';
import styles from './CartDealer.module.scss';
import PropTypes from 'prop-types';
import CartItem from '../Cartitem/CartItem';

function CartDealer({ dealer }) {
  let sortedItems = useSelector((state) => state.sortedCart.items);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.dealer}>
        <h3 className={styles.dealerName}>
          {t('dealerParts')} {dealer}
        </h3>
        <div>
          {sortedItems[dealer].map((part) => {
            return <CartItem part={part} key={shortid.generate()} />;
          })}
        </div>
        <div className={styles.orderButtonContainer}>
          <NavLink to="/order">
            <Button
              id="orderButton"
              className={styles.orderButton}
              onClick={() => {
                dispatch(setTempCustomerOrder(sortedItems[dealer]));
              }}
              color="primary"
              variant="contained"
            >
              {t('buy')}
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

CartDealer.propTypes = {
  dealer: PropTypes.string,
};

export default CartDealer;
