import WidgetScheduleItem from "./schedule/items/widget";
import TelScheduleItem from "./schedule/items/tel";
import TitleScheduleItem from "./schedule/items/title";
import InfoScheduleItem from "./schedule/items/info";

const defaultSettings = {
    id: null,
    selector: 'body',
    startedTime: '00:00:00'
}

const defaultEntityVars = {
    loading: false,
    showing: false,
    showed: true,
    id: null,
}

const EVENT_BTN_PRIMARY_CLICK = 'btn_primary:click'
const EVENT_BTN_DANGER_CLICK = 'btn_danger:click'

const events = [EVENT_BTN_PRIMARY_CLICK, EVENT_BTN_DANGER_CLICK]

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

    EVENT_BTN_PRIMARY_CLICK
    EVENT_BTN_DANGER_CLICK

    constructor(settings = {}) {

        this.EVENT_BTN_PRIMARY_CLICK = EVENT_BTN_PRIMARY_CLICK
        this.EVENT_BTN_DANGER_CLICK = EVENT_BTN_DANGER_CLICK

        if(!settings.id) settings.id = 'call-widget-'+Math.round(Math.random() * 10e6)

        this._settings = Object.assign(defaultSettings, settings)

        this._setStartParams()
    }

    /**
     * Инициировать звонок: покажется виджет и даст возможность ответить на звонок
     * @param {String} tel
     * @param {String} title
     */
    call({tel, title = null}) {
        if(!tel){
            throw new Error('CallWidget@call обязательно передайте номер телефона')
        }

        /**
         * Заполнение данными
         */
        this._entities.tel.content = tel
        this._entities.title.content = title

        /**
         * Заполнение очереди отрисовки в зависимости от данных
         */
        this._schedule.push(new TelScheduleItem('fill', 0, this))
        this._schedule.push(new WidgetScheduleItem('show', 300, this))
        if(title) {
            this._schedule.push(new TitleScheduleItem('fill', 0, this))
            this._schedule.push(new TitleScheduleItem('show', 300, this))
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
        this._schedule.push(new InfoScheduleItem('hide', 150, this))
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

        let template = this._getTemplate()

        element.appendChild(template)

        requestAnimationFrame(() => {
            this._attachEvents()
        })

        return template
    }

    on(name, fun) {
        this._eventHandlers[name].push(fun)
    }

    off(name, fun) {
        this._eventHandlers[name] = this._eventHandlers[name].filter(fun_ => fun_ !== fun)
    }

    _attachEvents() {
        let primaryBtn = document.getElementById(this._entities.widget.primaryBtnId)
        let dangerBtn = document.getElementById(this._entities.widget.dangerBtnId)

        let th = this
        this._funHandleClickPrimaryBtn = function () {
            th._handleClickPrimaryBtn()
        }
        this._funHandleClickDangerBtn = function () {
            th._handleClickDangerBtn()
        }

        primaryBtn.addEventListener('click', this._funHandleClickPrimaryBtn)
        dangerBtn.addEventListener('click', this._funHandleClickDangerBtn)
    }

    _handleEvent(name){
        const handlers = this._eventHandlers[name]
        // result - нужен чтобы сказать что дальнейшие действия виджета нужно остановить
        let result = true
        for (let i = 0; i < handlers.length; i++) {
            const handler = handlers[i]
            if(handler){
                let result_ = handler(result)
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
     * Функция проходит по очереди и исполняет действия рекурсивно, пока в очереди не останется пунктов
     * @private
     */
    _render() {
        let item = this._schedule.shift()
        if(item){
            console.log(item, item.action, item.time)
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
     *
     * @param {String} name - имя элемента, например div, h1, a
     * @param {{}} attrs - объект с атрибутами
     * @param {[HTMLElement]|String} children - Массив элементов или textContent
     * @returns {HTMLElement}
     * @private
     */
    _h(name, attrs = null, children = null){
        let elem = document.createElement(name)

        if(attrs){
            for (const attrsKey in attrs) {
                elem.setAttribute(attrsKey, attrs[attrsKey])
            }
        }

        if(children){
            if (typeof children === 'string' || children instanceof String){
                elem.textContent = children;
            }else if(Array.isArray(children)){
                for (let i = 0; i < children.length; i++) {
                    elem.appendChild(children[i])
                }
            }
        }

        return elem
    }

    /**
     * @returns {HTMLElement}
     * @private
     */
    _getTemplate() {
        const h = this._h

        return h('div', {id: this._entities.widget.id, class: 'call-widget'}, [
            h('div', {id: this._entities.info.id, class: 'call-widget__box-info'}, [
                h('div', {class: 'call-widget__redirect'}),
                h('div', {id: this._entities.info.timeId, class: 'call-widget__time'})
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
            widget: { ...defaultEntityVars, id, primaryBtnId: id+'-primary-btn', dangerBtnId: id+'-danger-btn' },
            title: { ...defaultEntityVars, id: id+'-title', wrapperId: id+'-wrapper-title', content: null },
            tel: { ...defaultEntityVars, id: id+'-tel', wrapperId: id+'-wrapper-tel', content: null },
            info: { ...defaultEntityVars, id: id+'-info', timeId: id+'-time', time: this._settings.startedTime },
        }
    }
}
