import ScheduleItem from '../base-item'

export default class TelScheduleItem extends ScheduleItem {
    render() {
        this['_'+this.action]()
    }
    _fill(){
        let tel = document.getElementById(this.callWidget._entities.tel.id)
        tel.textContent = this.callWidget._entities.tel.content
    }
}