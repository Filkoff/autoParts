import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setComparedParts } from '../../../reducers/compareReducer';
import styles from './ComparePart.module.scss';
import { useTranslation } from 'react-i18next';

function ComparePart({ id, name, models, category }) {
  const dispatch = useDispatch();
  const router = useHistory();
  const { t } = useTranslation();
  const parts = useSelector((state) => state.search.result);

  return (
    <div className={styles.card}>
      <div className={styles.name}>{name}</div>
      <div>
        {t('category')}: {category}
      </div>
      <div>
        {t('model')}: {models}
      </div>
      <Button
        className={styles.button}
        variant="contained"
        color="primary"
        onClick={async () => {
          const compared = await parts.filter((item) => {
            return (
              item.category === category &&
              item.name === name &&
              item.models === models
            );
          });
          dispatch(setComparedParts(compared));
          router.push(`/compare/${id}`);
        }}
      >
        {t('showVariants')}
      </Button>
    </div>
  );
}

export default ComparePart;
