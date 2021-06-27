import ScheduleItem from '../base-item'

export default class InfoScheduleItem extends ScheduleItem {
    render() {
        this['_'+this.action]()
    }
    _fill(){
        let time = document.getElementById(this.callWidget._entities.info.timeId)
        time.textContent = this.callWidget._entities.info.time
    }
    _show() {
        let infoWrapper = document.getElementById(this.callWidget._entities.info.id)
        infoWrapper.style.transitionDuration = this.time+'ms'
        infoWrapper.classList.add('show')
    }
    _hide() {
        let infoWrapper = document.getElementById(this.callWidget._entities.info.id)
        infoWrapper.style.transitionDuration = this.time+'ms'
        infoWrapper.classList.remove('show')
    }
}