/* global ymaps */
import React, { useState } from 'react';
import i18next from 'i18next';
import { setAddress } from '../../actions/user';
import { store } from '../../reducers/index';
import styles from './MapWindow.module.scss';

const state = store.getState();
const currentUser = state.user.currentUser;

function init() {
  let myPlacemark;
  let myMap = new ymaps.Map(
    'map',
    {
      center: [53.902662, 27.556201],
      zoom: 12,
    },
    {
      searchControlProvider: 'yandex#search',
    }
  );

  ymaps.geolocation
    .get({
      provider: 'browser',
      mapStateAutoApply: true,
    })
    .then(function (result) {
      result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
      myMap.geoObjects.add(result.geoObjects);
    });

  myMap.events.add('click', function (e) {
    let coords = e.get('coords');
    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(coords);
    } else {
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);
      myPlacemark.events.add('dragend', function () {
        getAddress(myPlacemark.geometry.getCoordinates());
      });
    }
    getAddress(coords);
  });

  function createPlacemark(coords) {
    return new ymaps.Placemark(
      coords,
      {
        iconCaption: i18next.t('map.search'),
      },
      {
        preset: 'islands#violetDotIconWithCaption',
        draggable: true,
      }
    );
  }

  function getAddress(coords) {
    myPlacemark.properties.set('iconCaption', i18next.t('map.search'));
    ymaps.geocode(coords).then(function (res) {
      let firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties.set({
        iconCaption: [
          firstGeoObject.getLocalities().length
            ? firstGeoObject.getLocalities()
            : firstGeoObject.getAdministrativeAreas(),

          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
        ]
          .filter(Boolean)
          .join(', '),
        balloonContent: firstGeoObject.getAddressLine(),
      });
      const address = firstGeoObject.getAddressLine();
      store.dispatch(setAddress(currentUser.id, address));
    });
  }
}

function MapWindow() {
  useState(() => {
    ymaps.ready(init);
  }, []);

  return <div id="map" className={styles.map}></div>;
}

export default MapWindow;
