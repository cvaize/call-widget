import ScheduleItem from '../base-item'

export default class WidgetScheduleItem extends ScheduleItem {
    render() {
        this['_'+this.action]()
    }
    _show(){
        let widget = document.getElementById(this.callWidget._entities.widget.id)
        widget.style.transitionDuration = this.time+'ms'
        widget.style.transform = 'translateX(0)'
    }
}