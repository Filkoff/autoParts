import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SinglePart from '../SinglePart/SinglePart';
import { getAllParts } from '../../../actions/data';
import styles from './PartsSet.module.scss';

function PartsSet() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllParts());
  }, []);
  const parts = useSelector((state) => state.parts.result);

  return (
    <section className={styles.container}>
      <div className={styles.partsField}>
        {parts.map((item) => {
          return <SinglePart key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}

export default PartsSet;
