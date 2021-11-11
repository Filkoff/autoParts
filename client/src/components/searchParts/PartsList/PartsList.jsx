import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import haversine from 'haversine-distance';
import Part from '../Part/Part';
import { setSortedResult } from '../../../reducers/searchReducer';
import styles from './PartsList.module.scss';

export default function PartsList() {
  const dispatch = useDispatch();
  const [isSorted, setIsSorted] = useState(false);
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
            <p>
              {t('distance')}: {(item.distance / 1000).toFixed(2)}
              {t('km')}
            </p>
          </Part>
        );
      })}
    </div>
  );

  return (
    <section className={styles.container}>
      <h2>{t('searchResults')}</h2>
      <Button
        id="sortByDistButton"
        className={styles.button}
        color={isSorted ? 'primary' : 'default'}
        variant="contained"
        onClick={() => {
          sortSearch();
          setIsSorted(!isSorted);
        }}
      >
        {t('sortByDist')}
      </Button>
      <NavLink to="/main">
        <Button className={styles.button} variant="contained" color="primary">
          {t('closeButton')}
        </Button>
      </NavLink>
      {!isSorted ? parts : sortedParts}
    </section>
  );
}
