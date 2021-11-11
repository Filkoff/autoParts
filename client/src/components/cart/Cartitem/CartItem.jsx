import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { shape, string, number } from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { minusItem, plusItem, removeItem } from '../../../reducers/cartReducer';
import styles from './CartItem.module.scss';

function CartItem({ part }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const partTotalPrice = (part.amount * part.price).toFixed(2);
  return (
    <>
      <div className={styles.row}>
        <div className={styles.ceil}>
          <img className={styles.image} src={part.img} alt={part.name} />
        </div>
        <div className={styles.ceil}>
          <p className={styles.name}>{part.name}</p>

          <p>{part.description}</p>
          <p>
            {t('condition')}: {part.condition}
          </p>
        </div>
        <div className={styles.ceil}>
          <p>
            {part.price}
            {t('currency')}
          </p>
        </div>
        <div className={styles.ceil}>
          <div>
            <Button
              className={styles.amountHandler}
              onClick={() => dispatch(minusItem(part.id))}
            >
              -
            </Button>
            x{part.amount}
            <Button
              className={styles.amountHandler}
              onClick={() => dispatch(plusItem(part.id))}
            >
              +
            </Button>
          </div>
        </div>
        <div className={styles.ceil}>
          <b>
            {partTotalPrice}
            {t('currency')}
          </b>
        </div>
        <CloseIcon
          className={styles.deleteIcon}
          onClick={() => dispatch(removeItem(part.id))}
          variant="contained"
          color="secondary"
        >
          {t('delete')}
        </CloseIcon>
      </div>
    </>
  );
}

CartItem.propTypes = {
  part: shape({
    id: string,
    category: string,
    name: string,
    description: string,
    price: number,
    condition: string,
    amount: number,
    img: string,
  }),
};

export default CartItem;
