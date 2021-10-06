import { Button } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './SinglePart.module.scss';

export default function SinglePart({
  id,
  category,
  name,
  description,
  models,
}) {
  const { t } = useTranslation();
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p>
          {t('category')}: {category}
        </p>
        <p>{description}</p>
        <p>
          {t('model')}: {models}
        </p>
      </div>
      <NavLink to={`/dealer/parts/add/${id}`}>
        <Button className={styles.button} variant="contained" color="primary">
          {t('select')}
        </Button>
      </NavLink>
    </div>
  );
}
