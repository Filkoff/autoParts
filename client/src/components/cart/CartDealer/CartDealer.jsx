import React from 'react';
import shortid from 'shortid';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { string } from 'prop-types';
import CartItem from '../Cartitem/CartItem';
import { setTempCustomerOrder } from '../../../reducers/customerReducer';
import styles from './CartDealer.module.scss';

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
  dealer: string,
};

export default CartDealer;
