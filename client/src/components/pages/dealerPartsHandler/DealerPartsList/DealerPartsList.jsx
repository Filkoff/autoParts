import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DealerPart from '../DealerPart/DealerPart';
import styles from './DealerPartsList.module.scss';

const DealerPartsList = () => {
  const { t } = useTranslation();
  const dealerParts = useSelector((state) => state.dealer.result);

  return (
    <div className={styles.container}>
      <h2>{t('yourParts')}</h2>
      <div className={styles.flexContainer}>
        {dealerParts.map((item) => {
          return <DealerPart key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};
export default DealerPartsList;
