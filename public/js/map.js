let myMap;

// Дождёмся загрузки API и готовности DOM.

function createMap(a, b) {
  // eslint-disable-next-line prefer-arrow-callback
  ymaps.ready(function () {
    myMap?.destroy();
    myMap = null;
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [55.76, 37.64], // Москва
      zoom: 10,
      controls: ['zoomControl', 'searchControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl'],
    }, {
      searchControlProvider: 'yandex#search',
    });

    const multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        a,
        b,
      ],
      params: {
        // Тип маршрутизации - пешеходная маршрутизация.
        routingMode: 'bicycle',
      },
    }, {
      // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
      boundsAutoApply: true,
    });

    myMap.geoObjects.add(multiRoute);
  });
}
// createMap([55.76, 37.64], [55.76, 37.69]);
// createMap();
