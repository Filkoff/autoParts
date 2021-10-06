import { Button } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './CartPopup.module.scss';

function CartPopup({ showPopup, setShowPopup }) {
  const items = useSelector((state) => state.cart.items);
  const { t } = useTranslation();
  const total = items.reduce((acc, cur) => {
    return acc + parseFloat(cur.price) * cur.amount;
  }, 0);

  if (showPopup) {
    return (
      <div className={styles.container} onClick={() => setShowPopup(false)}>
        <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
          <h2>{t('cart')}</h2>
          {items.length < 1 ? <p>{t('cartIsEmpty')}</p> : null}
          <div>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <div className={styles.row}>
                    <div>
                      <img className={styles.image} src={item.img} alt="" />
                    </div>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.info}>{item.price}р</p>
                    <p className={styles.info}>x {item.amount}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.infoBottom}>
            <div className={styles.info}>
              <h3>
                {t('total')}: {total.toFixed(2)}р
              </h3>
            </div>
            <NavLink to="/cart">
              <Button
                onClick={() => setShowPopup(false)}
                color="primary"
                variant="contained"
              >
                {t('more')}
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default CartPopup;
