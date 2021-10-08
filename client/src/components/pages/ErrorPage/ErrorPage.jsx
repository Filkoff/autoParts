import React from 'react';
import styles from './ErrorPage.module.scss';

function ErrorPage() {
  return (
    <div className={styles.container}>
      <h2>Страница не найдена</h2>
      <p>Запрашиваемый вами адрес не сущесвует</p>
      <img src="/assets/images/broken.png" alt="broken" />
    </div>
  );
}

export default ErrorPage;
