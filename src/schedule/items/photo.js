import ScheduleItem from '../base-item'

export default class PhotoScheduleItem extends ScheduleItem {
    render() {
        this['_'+this.action]()
    }
    _fill(){
        let wrapper = document.getElementById(this.callWidget._entities.photo.wrapperId)
        let img = document.getElementById(this.callWidget._entities.photo.id)
        let sizer = document.getElementById(this.callWidget._entities.photo.sizerId)
        let src = this.callWidget._entities.photo.src

        sizer.removeAttribute('style')
        wrapper.classList.add('loading')
        img.setAttribute('src', src)
    }
    _loaded() {
        let wrapper = document.getElementById(this.callWidget._entities.photo.wrapperId)
        let img = document.getElementById(this.callWidget._entities.photo.id)
        let sizer = document.getElementById(this.callWidget._entities.photo.sizerId)

        let img_ = document.createElement('img')
        let th = this
        img_.onload = function (){
            sizer.style.transitionDuration = th.time+'ms'
            wrapper.classList.remove('loading')
            sizer.style.paddingTop = (img_.height / img_.width * 100) + '%'
        }
        img_.src = img.src
    }
    _show(){
        let wrapper = document.getElementById(this.callWidget._entities.photo.wrapperId)
        let sizer = document.getElementById(this.callWidget._entities.photo.sizerId)
        sizer.style.transitionDuration = this.time+'ms'
        wrapper.classList.add('show')
    }
    _hide() {
        let wrapper = document.getElementById(this.callWidget._entities.photo.wrapperId)
        let sizer = document.getElementById(this.callWidget._entities.photo.sizerId)
        sizer.removeAttribute('style')
        sizer.style.transitionDuration = this.time+'ms'
        wrapper.classList.remove('loading')
        wrapper.classList.remove('show')
    }
}