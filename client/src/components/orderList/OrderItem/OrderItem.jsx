import React from 'react';
import styles from './OrderItem.module.scss';
import { useTranslation } from 'react-i18next';

function OrderItem({ item, children }) {
  const { t } = useTranslation();

  return (
    <div className={styles.item}>
      <div>
        <p className={styles.name}>{item.name}</p>
        <p>{item.description}</p>
        <p>
          {t('price')}: {item.price}р
        </p>
        <p>
          {t('amount')}: {item.amount}
        </p>
        <div>{children}</div>
      </div>
      <div>
        <img src={item.img} alt={item.name} className={styles.image} />
      </div>
    </div>
  );
}

export default OrderItem;
