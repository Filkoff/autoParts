import React from 'react';
import { useSelector } from 'react-redux';
import ComparePart from '../ComparePart/ComparePart';
import styles from './CompareParts.module.scss';
import { useTranslation } from 'react-i18next';

function CompareParts() {
  const parts = useSelector((state) => state.parts.result);
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h2>{t('compareOffers')}</h2>
      <div className={styles.partsField}>
        {parts.map((item) => (
          <ComparePart key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default CompareParts;
