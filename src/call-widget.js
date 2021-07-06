const defaultSettings = {
    id: null,
    selector: 'body',
    startedTime: '00:00:00',
}

export const EVENT_BTN_PRIMARY_CLICK = 'btn_primary:click'
export const EVENT_BTN_DANGER_CLICK = 'btn_danger:click'
export const EVENT_BTN_REDIRECT_CLICK = 'btn_redirect:click'

export const makeCallWidget = function (theme, settings = {}) {
    if (!settings.id) settings.id = 'call-widget-' + Math.round(Math.random() * 10e6)

    /**
     * @private {{}} - Настройки
     */
    const _settings = Object.assign(defaultSettings, settings)
    /**
     * @public {String} - Главный id компонента
     */
    const id = _settings.id
    /**
     * @private {{}} - Параметры сущностей имеющихся в CallWidget
     */
    let _entities = {
        widget: {id, primaryBtnId: id + '-primary-btn', dangerBtnId: id + '-danger-btn'},
        title: {id: id + '-title', wrapperId: id + '-wrapper-title', content: null},
        tel: {id: id + '-tel', wrapperId: id + '-wrapper-tel', content: null},
        info: {
            id: id + '-info',
            timeId: id + '-time',
            time: _settings.startedTime,
        },
        redirect: {
            selectShowBtnId: id + '-redirect-select-show-btn',
            selectCloseBtnId: id + '-redirect-select-close-btn',
            selectWrapperId: id + '-redirect-select-wrapper',
            selectId: id + '-redirect-select',
            id: id + '-redirect-btn',
            wrapperId: id + '-redirect-wrapper',
            numbers: []
        },
        photo: {
            id: id + '-photo',
            wrapperId: id + '-wrapper-photo',
            sizerId: id + '-sizer-photo',
            src: ''
        }
    }
    /**
     * @private {[{}]} - Очередь для управления отрисовкой, массив объектов
     */
    let _schedule = []
    /**
     * @private {{}} - объект со слушателями, добавляются через функцию CallWidget.on() и удаляются через CallWidget.off()
     */
    let _eventHandlers = {
        [EVENT_BTN_PRIMARY_CLICK]: [],
        [EVENT_BTN_DANGER_CLICK]: [],
        [EVENT_BTN_REDIRECT_CLICK]: [],
    }

    /**
     * @public {{}}
     */
    const th = {_settings, _schedule, _entities}

    const ScheduleItem = function (action, time) {
        return {
            time,
            render() {
                theme[action](th, time);
            }
        }
    }
    /**
     * ---------------------- Приватные функции ----------------------
     */

    const _handleEvent = function (name, value) {
        const handlers = _eventHandlers[name]
        // result - нужен чтобы сказать что дальнейшие действия виджета нужно остановить
        let result = true
        for (let i = 0; i < handlers.length; i++) {
            const handler = handlers[i]
            if (handler) {
                let result_ = handler(value, result)
                if (typeof result_ === "boolean") {
                    result = result_
                }
            }
        }
        return result
    }

    /**
     * Метод, который сработает при клике по кнопке принять звонок
     * @private
     */
    const _handleClickPrimaryBtn = function () {
        const result = _handleEvent(EVENT_BTN_PRIMARY_CLICK)
        if (result) {
            answerCall()
        }
    }

    /**
     * Метод, который сработает при клике по кнопке положить звонок
     * @private
     */
    const _handleClickDangerBtn = function () {
        const result = _handleEvent(EVENT_BTN_DANGER_CLICK)
        if (result) {
            hangUpCall()
        }
    }

    /**
     * Метод, который сработает при клике на кнопке перевести звонок на выбранного оператора
     * @private
     */
    const _handleRedirect = function () {
        let select = document.getElementById(_entities.redirect.selectId)
        _handleEvent(EVENT_BTN_REDIRECT_CLICK, select.value)
    }

    const _handleClickShowRedirectBtn = function () {
        _schedule.push(ScheduleItem('showRedirect', 0))
        _render()
    }

    const _handleClickHideRedirectBtn = function () {
        _schedule.push(ScheduleItem('hideRedirect', 0))
        _render()
    }

    const _attachEvents = function () {
        let primaryBtn = document.getElementById(_entities.widget.primaryBtnId)
        let dangerBtn = document.getElementById(_entities.widget.dangerBtnId)

        primaryBtn.addEventListener('click', _handleClickPrimaryBtn)
        dangerBtn.addEventListener('click', _handleClickDangerBtn)

        //

        let showRedirectBtn = document.getElementById(_entities.redirect.selectShowBtnId)
        let closeRedirectBtn = document.getElementById(_entities.redirect.selectCloseBtnId)
        let redirectBtn = document.getElementById(_entities.redirect.id)

        showRedirectBtn.addEventListener('click', _handleClickShowRedirectBtn)
        closeRedirectBtn.addEventListener('click', _handleClickHideRedirectBtn)
        redirectBtn.addEventListener('click', _handleRedirect)

        //

        let photo = document.getElementById(_entities.photo.id)

        photo.onload = function () {
            _schedule.push(ScheduleItem('loadedPhoto', 300))
            _render()
        }
    }

    const _detachEvents = function () {
        let primaryBtn = document.getElementById(_entities.widget.primaryBtnId)
        let dangerBtn = document.getElementById(_entities.widget.dangerBtnId)

        primaryBtn.removeEventListener('click', _handleClickPrimaryBtn)
        dangerBtn.removeEventListener('click', _handleClickDangerBtn)

        //

        let showRedirectBtn = document.getElementById(_entities.redirect.selectShowBtnId)
        let closeRedirectBtn = document.getElementById(_entities.redirect.selectCloseBtnId)
        let redirectBtn = document.getElementById(_entities.redirect.id)

        showRedirectBtn.removeEventListener('click', _handleClickShowRedirectBtn)
        closeRedirectBtn.removeEventListener('click', _handleClickHideRedirectBtn)
        redirectBtn.removeEventListener('click', _handleRedirect)

        //

        let photo = document.getElementById(_entities.photo.id)

        photo.onload = undefined
    }

    /**
     * Функция проходит по очереди и исполняет действия рекурсивно, пока в очереди не останется пунктов
     * @private
     */
    const _render = function () {
        let item = _schedule.shift()
        if (item) {
            if (item.time) {
                requestAnimationFrame(() => {
                    setTimeout(_render, item.time)
                    item.render()
                })
            } else {
                item.render()
                _render()
            }
        }
    }

    /**
     * ---------------------- Публичные функции ----------------------
     */
    /**
     * Инициировать звонок: покажется виджет и даст возможность ответить на звонок
     * @param {String} tel
     * @param {String} title
     * @param {String} photo
     */
    const call = function ({tel, title = null, photo = null}) {
        if (!tel) {
            throw new Error('CallWidget@call обязательно передайте номер телефона')
        }

        /**
         * Заполнение данными
         */
        _entities.tel.content = tel
        _entities.title.content = title
        _entities.photo.src = photo

        /**
         * Заполнение очереди отрисовки в зависимости от данных
         */
        _schedule.push(ScheduleItem('fillTel', 0))
        _schedule.push(ScheduleItem('showWidget', 300))
        if (title) {
            _schedule.push(ScheduleItem('fillTitle', 0))
            _schedule.push(ScheduleItem('showTitle', 300))
        } else {
            _schedule.push(ScheduleItem('hideTitle', 300))
        }
        if (photo) {
            _schedule.push(ScheduleItem('fillPhoto', 0))
            _schedule.push(ScheduleItem('showPhoto', 300))
        } else {
            _schedule.push(ScheduleItem('hidePhoto', 300))
        }

        /**
         * Вызов функции рендера очереди
         */
        _render()
    }

    /**
     * Ответить на звонок
     */
    const answerCall = function () {
        // Нужно установить начальное время, чтобы показать его, а потом уже пользователь будет его устанавливать
        _entities.info.time = _settings.startedTime

        // Нужно заблокировать кнопку "принять звонок" и установить активный статус кнопке "принять звонок"
        // Блокировка кнопок нужна, чтобы не работали события при повторных кликах
        _schedule.push(ScheduleItem('activePrimaryBtn', 0))
        _schedule.push(ScheduleItem('fillInfo', 0))
        _schedule.push(ScheduleItem('showInfo', 300))
        _render()
    }

    /**
     * Положить трубку
     */
    const hangUpCall = function () {
        // Нужно заблокировать кнопки, свернуть все дополнительный поля и скрыть виджет
        // Блокировка кнопок нужна, чтобы не работали события при повторных кликах
        _schedule.push(ScheduleItem('activeDangerBtn', 0))
        _schedule.push(ScheduleItem('hidePhoto', 300))
        _schedule.push(ScheduleItem('hideInfo', 300))
        _schedule.push(ScheduleItem('hideRedirect', 0))
        _schedule.push(ScheduleItem('hideTitle', 300))
        _schedule.push(ScheduleItem('hideWidget', 300))
        _schedule.push(ScheduleItem('normalWidget', 0))
        _render()
    }

    /**
     * Установка времени, по умолчанию формат 00:00:00
     */
    const setTime = function (time) {
        _entities.info.time = time
        _schedule.push(ScheduleItem('fillInfo', 0))
        _render()
    }

    /**
     * Установка номеров телефонов для выбора редиректа
     * @param {[String]} numbers
     */
    const setRedirectNumbers = function (numbers) {
        _entities.redirect.numbers = numbers
        _schedule.push(ScheduleItem('fillRedirect', 0))
        _render()
    }

    /**
     * Функция распечатывающая шаблон
     * @param selector - Селектор или элемент
     */
    const print = function (selector = null) {
        selector = selector || _settings.selector

        let element
        if (typeof selector === 'string' || selector instanceof String) {
            element = document.querySelector(selector)
        } else {
            element = selector
        }

        let template = document.getElementById(_entities.widget.id)
        if (!template) {
            template = theme.getTemplate(_entities)

            element.appendChild(template)

            requestAnimationFrame(() => {
                _attachEvents()
            })
        }

        return template
    }

    /**
     * Функция удаляющая шаблон
     */
    const destroy = function () {
        _schedule = []

        let element = document.getElementById(_entities.widget.id)

        if (element) {
            _detachEvents()

            if (!('remove' in Element.prototype)) {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            } else {
                element.remove();
            }
        }
    }

    const on = function (name, fun) {
        _eventHandlers[name].push(fun)
    }

    const off = function (name, fun) {
        _eventHandlers[name] = _eventHandlers[name].filter(fun_ => fun_ !== fun)
    }

    return {call, answerCall, hangUpCall, setTime, setRedirectNumbers, print, destroy, on, off}
}
