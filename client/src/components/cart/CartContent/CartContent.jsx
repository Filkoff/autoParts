import React, { useEffect } from 'react';
import shortid from 'shortid';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CartDealer from '../CartDealer/CartDealer';
import { setSortedCart } from '../../../reducers/sortedCartReducer';
import sortItems from '../../../utils/sortCartItems';
import styles from './CartContent.module.scss';

function CartContent() {
  const items = useSelector((state) => state.cart.items);
  const sortedItems = useSelector((state) => state.sortedCart.items);
  const dealers = Object.keys(sortedItems);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const total = items.reduce((acc, cur) => {
    return acc + parseFloat(cur.price) * cur.amount;
  }, 0);

  useEffect(() => {
    dispatch(setSortedCart(sortItems(items)));
  }, [items]);

  const content = (
    <div className={styles.table}>
      <div>
        <div className={styles.tableHeader}>
          <div className={styles.ceil}></div>
          <div className={styles.ceil}>{t('product')}</div>
          <div className={styles.ceil}>{t('price')}</div>
          <div className={styles.ceil}>{t('amount')}</div>
          <div className={styles.ceil}>{t('total')}</div>
        </div>
        <div>
          {dealers.map((dealer) => {
            return <CartDealer dealer={dealer} key={shortid.generate()} />;
          })}
        </div>
        <div>
          <h3 className={styles.tableTotal}>
            {t('total')}: {total.toFixed(2)}
            {t('currency')}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.cartHeader}>{t('cart')}</h2>

      {!items.length ? <p>{t('cartIsEmpty')}</p> : content}
    </div>
  );
}

export default CartContent;
