import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { string, number } from 'prop-types';
import { Button } from '@material-ui/core';
import { deleteDealerPart } from '../../../../actions/dealer';
import styles from './DealerPart.module.scss';

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
          {t('price')}: {price}
          {t('currency')}
        </p>
        <Link to={`/dealer/parts/${id}`}>
          <Button
            id="changeButton"
            className={`${styles.button}`}
            variant="contained"
            color="primary"
          >
            {t('change')}
          </Button>
        </Link>
        <Button
          id="deleteButton"
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

DealerPart.propTypes = {
  id: string,
  category: string,
  name: string,
  description: string,
  models: string,
  img: string,
  condition: string,
  price: number,
};

export default DealerPart;
