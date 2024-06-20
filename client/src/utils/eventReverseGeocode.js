/* global ymaps */
import i18next from 'i18next';

ymaps.ready(init);
function init() {
  let myPlacemark,
    myMap = new ymaps.Map(
      'map',
      {
        center: [55.753994, 37.622093],
        zoom: 9,
      },
      {
        searchControlProvider: 'yandex#search',
      }
    );

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
        ]
          .filter(Boolean)
          .join(', '),
        balloonContent: firstGeoObject.getAddressLine(),
      });
    });
  }
}
