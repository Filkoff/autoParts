import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortedCart } from '../../../reducers/sortedCartReducer';
import styles from './CartContent.module.scss';
import shortid from 'shortid';
import { useTranslation } from 'react-i18next';
import CartDealer from '../CartDealer/CartDealer';

function CartContent() {
  const items = useSelector((state) => state.cart.items);
  const sortedItems = useSelector((state) => state.sortedCart.items);
  const dealers = Object.keys(sortedItems);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const total = items.reduce((acc, cur) => {
    return acc + parseFloat(cur.price) * cur.amount;
  }, 0);

  let ob = {};
  for (let i of items) {
    if (!(i.dealer.name in ob)) {
      ob[i.dealer.name] = [i];
    } else {
      ob[i.dealer.name].push(i);
    }
  }
  useEffect(() => {
    dispatch(setSortedCart(ob));
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
            {t('total')}: {total.toFixed(2)}р
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.cartHeader}>{t('cart')}</h2>

      {items.length < 1 ? <p>{t('cartIsEmpty')}</p> : content}
    </div>
  );
}

export default CartContent;
