import WidgetScheduleItem from "./schedule/items/widget";
import TelScheduleItem from "./schedule/items/tel";
import TitleScheduleItem from "./schedule/items/title";
import InfoScheduleItem from "./schedule/items/info";
import RedirectScheduleItem from "./schedule/items/redirect";
import h from "./utility/h"
import PhotoScheduleItem from "./schedule/items/photo";

const defaultSettings = {
    id: null,
    selector: 'body',
    startedTime: '00:00:00',
}

export const EVENT_BTN_PRIMARY_CLICK = 'btn_primary:click'
export const EVENT_BTN_DANGER_CLICK = 'btn_danger:click'
export const EVENT_BTN_REDIRECT_CLICK = 'btn_redirect:click'

const events = [EVENT_BTN_PRIMARY_CLICK, EVENT_BTN_DANGER_CLICK, EVENT_BTN_REDIRECT_CLICK]

export default class CallWidget {
    /**
     * @private {{}} - Настройки
     */
    _settings
    /**
     * @private {{}} - Параметры сущностей имеющихся в CallWidget
     */
    _entities
    /**
     * @private {[ScheduleItem]} - Очередь для управления отрисовкой, массив объектов
     */
    _schedule
    /**
     * @private - сюда помещается функция HandleClickPrimaryBtn, чтобы отвязать её по этому адресу
     */
    _funHandleClickPrimaryBtn
    /**
     * @private - сюда помещается функция HandleClickDangerBtn, чтобы отвязать её по этому адресу
     */
    _funHandleClickDangerBtn

    /**
     * @private {{}} - объект со слушателями, добавляются через функцию CallWidget.on() и удаляются через CallWidget.off()
     */
    _eventHandlers

    _funHandleClickShowRedirectBtn
    _funHandleClickHideRedirectBtn
    _funHandleClickRedirectBtn

    EVENT_BTN_PRIMARY_CLICK
    EVENT_BTN_DANGER_CLICK
    EVENT_BTN_REDIRECT_CLICK

    constructor(settings = {}) {

        this.EVENT_BTN_PRIMARY_CLICK = EVENT_BTN_PRIMARY_CLICK
        this.EVENT_BTN_DANGER_CLICK = EVENT_BTN_DANGER_CLICK
        this.EVENT_BTN_REDIRECT_CLICK = EVENT_BTN_REDIRECT_CLICK

        if(!settings.id) settings.id = 'call-widget-'+Math.round(Math.random() * 10e6)

        this._settings = Object.assign(defaultSettings, settings)

        this._setStartParams()
    }

    /**
     * Инициировать звонок: покажется виджет и даст возможность ответить на звонок
     * @param {String} tel
     * @param {String} title
     * @param {String} photo
     */
    call({tel, title = null, photo = null}) {
        if(!tel){
            throw new Error('CallWidget@call обязательно передайте номер телефона')
        }

        /**
         * Заполнение данными
         */
        this._entities.tel.content = tel
        this._entities.title.content = title
        this._entities.photo.src = photo

        /**
         * Заполнение очереди отрисовки в зависимости от данных
         */
        this._schedule.push(new TelScheduleItem('fill', 0, this))
        this._schedule.push(new WidgetScheduleItem('show', 300, this))
        if(title) {
            this._schedule.push(new TitleScheduleItem('fill', 0, this))
            this._schedule.push(new TitleScheduleItem('show', 300, this))
        }else{
            this._schedule.push(new TitleScheduleItem('hide', 150, this))
        }
        if(photo) {
            this._schedule.push(new PhotoScheduleItem('fill', 0, this))
            this._schedule.push(new PhotoScheduleItem('show', 300, this))
        }else{
            this._schedule.push(new PhotoScheduleItem('hide', 150, this))
        }

        /**
         * Вызов функции рендера очереди
         */
        this._render()
    }

    /**
     * Ответить на звонок
     */
    answerCall(){
        // Нужно установить начальное время, чтобы показать его, а потом уже пользователь будет его устанавливать
        this._entities.info.time = this._settings.startedTime

        // Нужно заблокировать кнопку "принять звонок" и установить активный статус кнопке "принять звонок"
        // Блокировка кнопок нужна, чтобы не работали события при повторных кликах
        this._schedule.push(new WidgetScheduleItem('activePrimaryBtn', 0, this))
        this._schedule.push(new InfoScheduleItem('fill', 0, this))
        this._schedule.push(new InfoScheduleItem('show', 150, this))
        this._render()
    }

    /**
     * Положить трубку
     */
    hangUpCall() {
        // Нужно заблокировать кнопки, свернуть все дополнительный поля и скрыть виджет
        // Блокировка кнопок нужна, чтобы не работали события при повторных кликах
        this._schedule.push(new WidgetScheduleItem('activeDangerBtn', 0, this))
        this._schedule.push(new PhotoScheduleItem('hide', 150, this))
        this._schedule.push(new InfoScheduleItem('hide', 150, this))
        this._schedule.push(new RedirectScheduleItem('hide', 0, this))
        this._schedule.push(new TitleScheduleItem('hide', 300, this))
        this._schedule.push(new WidgetScheduleItem('hide', 300, this))
        this._schedule.push(new WidgetScheduleItem('normal', 0, this))
        this._render()
    }

    /**
     * Установка времени, по умолчанию формат 00:00:00
     */
    setTime(time) {
        this._entities.info.time = time
        this._schedule.push(new InfoScheduleItem('fill', 0, this))
        this._render()
    }

    /**
     * Установка номеров телефонов для выбора редиректа
     * @param {[String]} numbers
     */
    setRedirectNumbers(numbers) {
        this._entities.redirect.numbers = numbers
        this._schedule.push(new RedirectScheduleItem('fill', 0, this))
        this._render()
    }

    /**
     * Функция распечатывающая шаблон
     * @param selector - Селектор или элемент
     */
    print(selector = null) {
        selector = selector || this._settings.selector

        let element
        if (typeof selector === 'string' || selector instanceof String){
            element = document.querySelector(selector)
        }else{
            element = selector
        }

        let template = document.getElementById(this._entities.widget.id)
        if(!template){
            template = this._getTemplate()

            element.appendChild(template)

            requestAnimationFrame(() => {
                this._attachEvents()
            })
        }

        return template
    }

    /**
     * Функция удаляющая шаблон
     */
    destroy() {
        this._schedule = []
        this._detachEvents()

        let element = document.getElementById(this._entities.widget.id)

        if(element){
            if (!('remove' in Element.prototype)) {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }else{
                element.remove();
            }
        }
    }

    on(name, fun) {
        this._eventHandlers[name].push(fun)
    }

    off(name, fun) {
        this._eventHandlers[name] = this._eventHandlers[name].filter(fun_ => fun_ !== fun)
    }

    _attachEvents() {
        let th = this

        let primaryBtn = document.getElementById(this._entities.widget.primaryBtnId)
        let dangerBtn = document.getElementById(this._entities.widget.dangerBtnId)

        this._funHandleClickPrimaryBtn = function () {
            th._handleClickPrimaryBtn()
        }
        this._funHandleClickDangerBtn = function () {
            th._handleClickDangerBtn()
        }

        primaryBtn.addEventListener('click', this._funHandleClickPrimaryBtn)
        dangerBtn.addEventListener('click', this._funHandleClickDangerBtn)

        //

        let showRedirectBtn = document.getElementById(this._entities.redirect.selectShowBtnId)
        let closeRedirectBtn = document.getElementById(this._entities.redirect.selectCloseBtnId)
        let redirectBtn = document.getElementById(this._entities.redirect.id)

        this._funHandleClickShowRedirectBtn = function () {
            th._schedule.push(new RedirectScheduleItem('show', 0, th))
            th._render()
        }
        this._funHandleClickHideRedirectBtn = function () {
            th._schedule.push(new RedirectScheduleItem('hide', 0, th))
            th._render()
        }
        this._funHandleClickRedirectBtn = function () {
            th._handleRedirect()
        }
        showRedirectBtn.addEventListener('click', this._funHandleClickShowRedirectBtn)
        closeRedirectBtn.addEventListener('click', this._funHandleClickHideRedirectBtn)
        redirectBtn.addEventListener('click', this._funHandleClickRedirectBtn)

        //

        let photo = document.getElementById(this._entities.photo.id)

        photo.onload = function (){
            th._schedule.push(new PhotoScheduleItem('loaded', 300, th))
            th._render()
        }
    }

    _detachEvents() {
        let primaryBtn = document.getElementById(this._entities.widget.primaryBtnId)
        let dangerBtn = document.getElementById(this._entities.widget.dangerBtnId)

        primaryBtn.removeEventListener('click', this._funHandleClickPrimaryBtn)
        dangerBtn.removeEventListener('click', this._funHandleClickDangerBtn)

        //

        let showRedirectBtn = document.getElementById(this._entities.redirect.selectShowBtnId)
        let closeRedirectBtn = document.getElementById(this._entities.redirect.selectCloseBtnId)
        let redirectBtn = document.getElementById(this._entities.redirect.id)

        showRedirectBtn.removeEventListener('click', this._funHandleClickShowRedirectBtn)
        closeRedirectBtn.removeEventListener('click', this._funHandleClickHideRedirectBtn)
        redirectBtn.removeEventListener('click', this._funHandleClickRedirectBtn)
    }

    _handleEvent(name, value){
        const handlers = this._eventHandlers[name]
        // result - нужен чтобы сказать что дальнейшие действия виджета нужно остановить
        let result = true
        for (let i = 0; i < handlers.length; i++) {
            const handler = handlers[i]
            if(handler){
                let result_ = handler(value, result)
                if(typeof result_ === "boolean"){
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
    _handleClickPrimaryBtn(){
        const result = this._handleEvent(EVENT_BTN_PRIMARY_CLICK)
        if(result){
            this.answerCall()
        }
    }

    /**
     * Метод, который сработает при клике по кнопке положить звонок
     * @private
     */
    _handleClickDangerBtn(){
        const result = this._handleEvent(EVENT_BTN_DANGER_CLICK)
        if(result){
            this.hangUpCall()
        }
    }

    /**
     * Метод, который сработает при клике на кнопке перевести звонок на выбранного оператора
     * @private
     */
    _handleRedirect(){
        let select = document.getElementById(this._entities.redirect.selectId)
        this._handleEvent(EVENT_BTN_REDIRECT_CLICK, select.value)
    }

    /**
     * Функция проходит по очереди и исполняет действия рекурсивно, пока в очереди не останется пунктов
     * @private
     */
    _render() {
        let item = this._schedule.shift()
        if(item){
            if(item.time){
                requestAnimationFrame(() => {
                    setTimeout(() => {this._render()}, item.time)
                    item.render()
                })
            }else{
                item.render()
                this._render()
            }
        }
    }

    /**
     * @returns {HTMLElement}
     * @private
     */
    _getTemplate() {
        return h('div', {id: this._entities.widget.id, class: 'call-widget'}, [
            h('div', {
                id: this._entities.photo.wrapperId,
                class: 'call-widget__photo',
            }, [
                h('div', {
                    id: this._entities.photo.sizerId,
                    class: 'call-widget__photo-sizer',
                }),
                h('img', {
                    id: this._entities.photo.id,
                    src: ''
                }),
            ]),
            h('div', {id: this._entities.info.id, class: 'call-widget__box-info'}, [
                h('div', {
                    id: this._entities.redirect.wrapperId,
                    class: 'call-widget__redirect',
                    style: 'display: none;'
                }, [
                    h('button', {
                        id: this._entities.redirect.selectShowBtnId,
                        class: 'call-widget__btn call-widget__btn-redirect',
                        type: 'button'
                    }),
                    h('button', {
                        id: this._entities.redirect.selectCloseBtnId,
                        class: 'call-widget__btn call-widget__btn-close',
                        type: 'button',
                        style: 'display: none;'
                    }),
                    h('span', null, 'Перевести на'),
                    h('label', {
                        id: this._entities.redirect.selectWrapperId,
                        class: 'call-widget__redirect__select-wrapper',
                        'aria-label': 'Перевести на оператора',
                        style: 'display: none;'
                    }, [
                        h('select', {
                            class: 'call-widget__select',
                            id: this._entities.redirect.selectId,
                        }, [
                            h('option', {value: '-'}, '-'),
                        ]),
                    ]),
                    h('button', {
                        class: 'call-widget__btn call-widget__btn-redirect call-widget__btn--warning',
                        type: 'button',
                        style: 'display: none;',
                        id: this._entities.redirect.id,
                    }),
                ]),
                h('div', {
                    id: this._entities.info.timeId,
                    class: 'call-widget__time'
                })
            ]),
            h('div', {id: this._entities.title.wrapperId, class: 'call-widget__box-title'}, [
                h('div', {id: this._entities.title.id, class: 'call-widget__title'})
            ]),
            h('div', {class: 'call-widget__box-phone'}, [
                h('div', {id: this._entities.tel.wrapperId, class: 'call-widget__tel-wrapper'}, [
                    h('div', {id: this._entities.tel.id, class: 'call-widget__tel'})
                ]),
                h('button', {
                    id: this._entities.widget.dangerBtnId,
                    class: 'call-widget__btn call-widget__btn-circle call-widget__btn-circle--danger',
                    type: 'button'
                }),
                h('button', {
                    id: this._entities.widget.primaryBtnId,
                    class: 'call-widget__btn call-widget__btn-circle call-widget__btn-circle--primary',
                    type: 'button'
                })
            ])
        ])
    }

    /**
     * Функция устанавливающая начальные параметры
     * @private
     */
    _setStartParams() {
        this._entities = this._getEntities()

        this._schedule = []

        this._eventHandlers = {}
        for (let i = 0; i < events.length; i++) {
            let event = events[i]
            this._eventHandlers[event] = []
        }
    }

    _getEntities() {
        const id = this._settings.id

        return {
            widget: { id, primaryBtnId: id+'-primary-btn', dangerBtnId: id+'-danger-btn' },
            title: { id: id+'-title', wrapperId: id+'-wrapper-title', content: null },
            tel: { id: id+'-tel', wrapperId: id+'-wrapper-tel', content: null },
            info: {
                id: id+'-info',
                timeId: id+'-time',
                time: this._settings.startedTime,
            },
            redirect: {
                selectShowBtnId: id+'-redirect-select-show-btn',
                selectCloseBtnId: id+'-redirect-select-close-btn',
                selectWrapperId: id+'-redirect-select-wrapper',
                selectId: id+'-redirect-select',
                id: id+'-redirect-btn',
                wrapperId: id+'-redirect-wrapper',
                numbers: []
            },
            photo: {
                id: id+'-photo',
                wrapperId: id+'-wrapper-photo',
                sizerId: id+'-sizer-photo',
                src: ''
            }
        }
    }
}
