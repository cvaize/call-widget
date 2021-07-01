import ScheduleItem from '../base-item'
import h from "../../utility/h";

export default class RedirectScheduleItem extends ScheduleItem {
    render() {
        this['_' + this.action]()
    }

    _fill() {
        let numbers = this.callWidget._entities.redirect.numbers
        let wrapper = document.getElementById(this.callWidget._entities.redirect.wrapperId)
        let select = document.getElementById(this.callWidget._entities.redirect.selectId)

        select.innerHTML = ''

        for (let i = 0; i < numbers.length; i++) {
            let number = numbers[i]
            select.appendChild(h('option', {value: number}, number))
        }
        if (numbers[0]) {
            select.value = numbers[0]
            wrapper.removeAttribute('style')
        } else {
            wrapper.setAttribute('style', 'display: none;')
        }
    }

    _toggle(show){
        let showBtn = document.getElementById(this.callWidget._entities.redirect.selectShowBtnId)
        let closeBtn = document.getElementById(this.callWidget._entities.redirect.selectCloseBtnId)
        let selectWrapper = document.getElementById(this.callWidget._entities.redirect.selectWrapperId)
        let btn = document.getElementById(this.callWidget._entities.redirect.id)

        if(show){
            showBtn.setAttribute('style', 'display: none;')
            closeBtn.removeAttribute('style')
            selectWrapper.removeAttribute('style')
            btn.removeAttribute('style')
        }else{
            showBtn.removeAttribute('style')
            closeBtn.setAttribute('style', 'display: none;')
            selectWrapper.setAttribute('style', 'display: none;')
            btn.setAttribute('style', 'display: none;')
        }
    }

    _show(){
        this._toggle(true)
    }

    _hide(){
        this._toggle(false)
    }
}