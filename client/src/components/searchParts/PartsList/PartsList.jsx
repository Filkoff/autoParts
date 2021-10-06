import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Part from '../Part/Part';
import styles from './PartsList.module.scss';
import haversine from 'haversine-distance';
import { setSortedResult } from '../../../reducers/searchReducer';

export default function PartsList() {
  const dispatch = useDispatch();
  const [sorted, setSorted] = useState(false);
  let searchResult = useSelector((state) => state.search.result);
  let sortedResult = useSelector((state) => state.search.sortedResult);
  const { t } = useTranslation();
  const parts = (
    <div id="searchResults" className={styles.partsField}>
      {searchResult.map((item) => {
        return <Part key={item.id} {...item} />;
      })}
    </div>
  );

  const sortSearch = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      const partsWithDistance = searchResult.map((item) => {
        return {
          ...item,
          distance: haversine(item.dealer.coords, coordinates),
        };
      });
      const sortedParts = partsWithDistance.sort(
        (a, b) => a.distance - b.distance
      );
      dispatch(setSortedResult(sortedParts));
    });
  };

  const sortedParts = (
    <div id="searchResults" className={styles.partsField}>
      {sortedResult.map((item) => {
        return (
          <Part key={item.id} {...item}>
            {' '}
            <p>
              {t('distance')}: {(item.distance / 1000).toFixed(2)}км
            </p>
          </Part>
        );
      })}
    </div>
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>{t('searchResults')}</h2>
      <Button
        id="sortByDistButton"
        className={styles.button}
        color={sorted ? 'primary' : 'default'}
        variant="contained"
        onClick={() => {
          sortSearch();
          setSorted(!sorted);
        }}
      >
        {' '}
        {t('sortByDist')}
      </Button>
      <NavLink to="/">
        <Button className={styles.button} variant="contained" color="primary">
          {t('closeButton')}
        </Button>
      </NavLink>
      {!sorted ? parts : sortedParts}
    </section>
  );
}
