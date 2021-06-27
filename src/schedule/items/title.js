import ScheduleItem from '../base-item'

export default class TitleScheduleItem extends ScheduleItem {
    render() {
        this['_'+this.action]()
    }
    _fill() {
        let title = document.getElementById(this.callWidget._entities.title.id)
        title.textContent = this.callWidget._entities.title.content
    }
    _show() {
        let titleWrapper = document.getElementById(this.callWidget._entities.title.wrapperId)
        titleWrapper.style.transitionDuration = this.time+'ms'
        titleWrapper.classList.add('show')
    }
    _hide() {
        let titleWrapper = document.getElementById(this.callWidget._entities.title.wrapperId)
        titleWrapper.style.transitionDuration = this.time+'ms'
        titleWrapper.classList.remove('show')
    }
}