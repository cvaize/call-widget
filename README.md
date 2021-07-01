# Веб виджет приема звонков
Веб виджет приема звонков представляет собой компонент пользовательского интерфейса.
Виджет не реализует логику звонка, а дает только интерфейс приема звонков для пользователей.
Вы сами должны реализовать логику звонка. Используйте публичные методы, чтобы взаимодействовать с компонентом.
Изначально данный виджет написан для работы с виджетом звонков от сервиса Zadarma, так как Zadarma не предоставляет 
виджет приема звонков.


[![NPM Version](https://img.shields.io/npm/v/@cvaize/call-widget.svg?style=flat-square)](https://www.npmjs.com/package/@cvaize/call-widget)

## Установка

В браузере:
```html
<link rel="stylesheet" href="call-widget.css">
<script src="call-widget.js"></script>
```

Используя npm:
```shell
$ npm i @cvaize/call-widget
```

## Использование

```javascript
// Инициализация компонента
let callWidget = new CallWidget({
    id: null, // id, если не указано, сгенерируется автоматически
    selector: 'body', // Вставить шаблон в <body/>
    startedTime: '00:00:00', // Время начинается с 00:00:00
})
// Вставка шаблона в <body/> для работы
callWidget.print()

// Подписаться на событие
callWidget.on(callWidget.EVENT_BTN_PRIMARY_CLICK, function (){
    // Реагировать на нажатие кнопки принять звонок
})
callWidget.on(callWidget.EVENT_BTN_DANGER_CLICK, function (){
    // Реагировать на нажатие кнопки отклонить звонок
})
callWidget.on(callWidget.EVENT_BTN_REDIRECT_CLICK, function (){
    // Реагировать на нажатие кнопки перенаправить звонок
})

// Чтобы отписаться используйте метод callWidget.off

// Установка списка внутренних номеров для перенаправления звонка, 
// в Zadarma внутренние номера имеют формат чисел от 100 до ...
callWidget.setRedirectNumbers(['102', '103', '104', '105', '110', '140'])
// Если не вызывать метод setRedirectNumbers или вызвать с пустым массивом,
// то перенаправления показываться не будут

// Скажем виджету, что поступил звонок с номера
// с номер +79998883322, 
callWidget.call({
    tel: '+79998883322',
})

// После получения с сервера пользователя с номером +79998883322
// вызовем тот же метод и дополним информацию, укажем что звонок был
// от Орлова Дмитрия Александровича,
// у которого есть фотография https://via.placeholder.com/700x200
callWidget.call({
    tel: '+79998883322', 
    title: 'Орлов Дмитрий Александрович', 
    photo: 'https://via.placeholder.com/700x200'
})

// Для изменения времени вы должны вызывать метод setTime
callWidget.setTime('00:03:20')
// реализовано именно так, потому что виджет не знает когда сторонний интерфейс начнет звонок

// Ответить на звонок
callWidget.answerCall()
// Положить трубку
callWidget.hangUpCall()

// Удалить шаблон из document
callWidget.destroy()

// Чтобы заново вставить
callWidget.print()
```

## Лицензия
Эта библиотека выпущена под [лицензией MIT](https://github.com/cvaize/call-widget/blob/master/LICENSE).