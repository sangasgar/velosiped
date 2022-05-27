const inputStart = document.getElementsByName('start')[0];
const inputEnd = document.getElementsByName('finish')[0];
const inputLength = document.getElementsByName('lengthRoad')[0];

ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.753994, 37.622093],
    zoom: 12,
    controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routePanelControl'],
  }, {
    searchControlProvider: 'yandex#search',
  });

  const control = myMap.controls.get('routePanelControl');

  // Зададим состояние панели для построения машрутов.
  control.routePanel.state.set({
    // Тип маршрутизации.
    type: 'bicycle',
    // Выключим возможность задавать пункт отправления в поле ввода.
    fromEnabled: true,
    // Адрес или координаты пункта отправления.
    // from:"г. Москва ул. Орджоникидзе 25" ,
    // Включим возможность задавать пункт назначения в поле ввода.
    toEnabled: true,
    // Адрес или координаты пункта назначения.
    // to: 'г. Москва ул. Орджоникидзе 18'
  });

  // Зададим опции панели для построения машрутов.
  control.routePanel.options.set({
    // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
    allowSwitch: false,
    // Включим определение адреса по координатам клика.
    reverseGeocoding: true,
    // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
    types: {
      masstransit: false, pedestrian: false, taxi: false, bicycle: true,
    },
  });

  // Получение мультимаршрута.
  const multiRoutePromise = control.routePanel.getRouteAsync();

  multiRoutePromise.then((multiRoute) => {
    // Подписка на событие обновления мультимаршрута.
    multiRoute.model.events.add('requestsuccess', () => {
      // Получение ссылки на активный маршрут.
      const activeRoute = multiRoute.getActiveRoute();
      // Когда панель добавляется на карту, она
      // создает маршрут с изначально пустой геометрией.
      // Только когда пользователь выберет начальную и конечную точки,
      // маршрут будет перестроен с непустой геометрией.
      // Поэтому для избежания ошибки нужно добавить проверку,
      // что маршрут не пустой.
      if (activeRoute) {
        // Вывод информации об активном маршруте.
        console.log(`Длина: ${activeRoute.properties.get('distance').text}`);
        inputLength.value = `${activeRoute.properties.get('distance').text}`;
        // console.log(activeRoute);
        // console.log(multiRoute);
        inputStart.value = multiRoute.properties._data.waypoints[0].address;
        inputEnd.value = multiRoute.properties._data.waypoints[1].address;
      }
    });
  }, (err) => {
    console.log(err);
  });
}
