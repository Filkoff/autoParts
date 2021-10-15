/* global ymaps */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addItem } from '../../../reducers/cartReducer';
import { setChoosenDealer } from '../../../reducers/dealerReducer';
import ModalLogin from '../../ModalLogin/ModalLogin';
import PropTypes from 'prop-types';
import styles from './Part.module.scss';

export default function Part({
  id,
  category,
  name,
  description,
  models,
  price,
  dealer,
  condition,
  img,
  children,
}) {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const [isModalShown, setIsModalShown] = useState(false);
  const { t } = useTranslation();

  const getAddress = () => {
    ymaps.ready(function () {
      let myReverseGeocoder = ymaps.geocode([
        dealer.coords.latitude,
        dealer.coords.longitude,
      ]);
      myReverseGeocoder.then(function (res) {
        dispatch(
          setChoosenDealer(
            dealer.id,
            dealer.name,
            res.geoObjects.get(0).properties.get('text')
          )
        );
      });
    });
  };

  const addToCart = () => {
    !isAuth
      ? setIsModalShown(true)
      : dispatch(
          addItem({
            id,
            category,
            name,
            description,
            models,
            price,
            dealer,
            condition,
            img,
          })
        );
  };

  return (
    <div className={styles.card}>
      <div>
        <img className={styles.image} src={img} alt={name} />
      </div>
      <div>
        <p className={styles.name}>{name}</p>
        <p>
          {t('category')}: {category}
        </p>
        <p>{description}</p>
        <p>
          {t('model')}: {models}
        </p>
        <p>
          {t('condition')}: {condition}
        </p>
        <NavLink to="/dealer/profile">
          <p onClick={getAddress}>
            {t('dealer')}: {dealer.name}
          </p>
        </NavLink>
        {children}
        <p>
          {t('price')}: {price}
          {t('currency')}
        </p>
        {isModalShown ? <ModalLogin /> : null}
        <Button
          id="addToCartButton"
          className={styles.button}
          onClick={addToCart}
          color="primary"
          variant="contained"
        >
          {t('cartButton')}
        </Button>
      </div>
    </div>
  );
}

Part.propTypes = {
  id: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  models: PropTypes.string,
  price: PropTypes.number,
  condition: PropTypes.string,
  img: PropTypes.string,
  dealer: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    coords: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
  children: PropTypes.element,
};
