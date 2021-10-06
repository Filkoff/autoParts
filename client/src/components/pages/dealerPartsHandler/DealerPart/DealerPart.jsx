import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDealerPart } from '../../../../actions/dealer';
import styles from './DealerPart.module.scss';
import { useTranslation } from 'react-i18next';

function DealerPart({
  id,
  category,
  name,
  description,
  models,
  img,
  condition,
  price,
}) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div>
        <img className={styles.img} src={img} alt={name} />
      </div>
      <div>
        <p className={styles.name}>{name}</p>
        <p className={styles.info}>
          {t('category')}: {category}
        </p>
        <p className={styles.info}>{description}</p>
        <p className={styles.info}>
          {t('model')}: {models}
        </p>
        <p className={styles.info}>
          {t('condition')}: {condition}
        </p>
        <p className={styles.info}>
          {t('price')}: {price}р
        </p>
        <Link to={`/dealer/parts/${id}`}>
          <Button className={styles.button} variant="contained" color="primary">
            {t('change')}
          </Button>
        </Link>
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          onClick={() => dispatch(deleteDealerPart(id))}
        >
          {t('delete')}
        </Button>
      </div>
    </div>
  );
}

export default DealerPart;
