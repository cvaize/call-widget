import ScheduleItem from '../base-item'

export default class WidgetScheduleItem extends ScheduleItem {
    render() {
        this['_'+this.action]()
    }
    _show(){
        let widget = document.getElementById(this.callWidget._entities.widget.id)
        widget.style.transitionDuration = this.time+'ms'
        widget.classList.add('show')
    }
    _hide(){
        let widget = document.getElementById(this.callWidget._entities.widget.id)
        widget.style.transitionDuration = this.time+'ms'
        widget.classList.remove('show')
    }
    _activePrimaryBtn() {
        // Нужно заблокировать кнопку "принять звонок" и установить активный статус кнопке "принять звонок"
        // Блокировка кнопок нужна, чтобы не работали события при повторных кликах
        let dangerBtn = document.getElementById(this.callWidget._entities.widget.dangerBtnId)
        let primaryBtn = document.getElementById(this.callWidget._entities.widget.primaryBtnId)
        primaryBtn.disabled = true
        dangerBtn.disabled = false
        primaryBtn.classList.add('active')
    }
    _activeDangerBtn() {
        // Нужно заблокировать кнопки, свернуть все дополнительный поля и скрыть виджет
        // Блокировка кнопок нужна, чтобы не работали события при повторных кликах
        let primaryBtn = document.getElementById(this.callWidget._entities.widget.primaryBtnId)
        let dangerBtn = document.getElementById(this.callWidget._entities.widget.dangerBtnId)
        primaryBtn.disabled = true
        dangerBtn.disabled = true
        primaryBtn.classList.remove('active')
    }
    _normal() {
        // Вернуть в начальное состояние весь виджет
        let primaryBtn = document.getElementById(this.callWidget._entities.widget.primaryBtnId)
        let dangerBtn = document.getElementById(this.callWidget._entities.widget.dangerBtnId)
        primaryBtn.disabled = false
        dangerBtn.disabled = false
        primaryBtn.classList.remove('active')
    }
}