import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Part from '../../searchParts/Part/Part';
import styles from './CompareResult.module.scss';

function CompareResult() {
  const parts = useSelector((state) => state.compare.result);
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h2>{t('compareParts')}</h2>
      <div className={styles.compare}>
        {parts.map((item) => {
          return <Part key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
}

export default CompareResult;
