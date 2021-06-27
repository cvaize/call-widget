export default class ScheduleItem {
    action
    time
    callWidget
    constructor(action, time, callWidget) {
        this.action = action
        this.time = time || 0
        this.callWidget = callWidget
    }
    render() {
        throw new Error('ScheduleItem@render Обязательно определите метод рендера')
    }
}