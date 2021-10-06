/* global ymaps */
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addItem } from '../../../reducers/cartReducer';
import { setChoosenDealer } from '../../../reducers/dealerReducer';
import ModalLogin from '../../ModalLogin/ModalLogin';
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
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img className={styles.img} src={img} alt={name} />
      </div>
      <div className={styles.content}>
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
          <p
            onClick={() => {
              ymaps.ready(function () {
                var myReverseGeocoder = ymaps.geocode([
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
            }}
          >
            {t('dealer')}: {dealer.name}
          </p>
        </NavLink>
        {children}
        <p>
          {t('price')}: {price}р
        </p>
        {showModal ? <ModalLogin /> : null}
        <Button
          className={styles.button}
          onClick={() => {
            !isAuth
              ? setShowModal(true)
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
          }}
          color="primary"
          variant="contained"
        >
          {t('cartButton')}
        </Button>
      </div>
    </div>
  );
}
