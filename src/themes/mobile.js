import h from "../utility/h";

const MobileTheme = {
    // Redirect
    fillRedirect(th) {
        let numbers = th._entities.redirect.numbers
        let wrapper = document.getElementById(th._entities.redirect.wrapperId)
        let select = document.getElementById(th._entities.redirect.selectId)

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
    },
    showRedirect(th){
        let showBtn = document.getElementById(th._entities.redirect.selectShowBtnId)
        let closeBtn = document.getElementById(th._entities.redirect.selectCloseBtnId)
        let selectWrapper = document.getElementById(th._entities.redirect.selectWrapperId)
        let btn = document.getElementById(th._entities.redirect.id)

        showBtn.setAttribute('style', 'display: none;')
        closeBtn.removeAttribute('style')
        selectWrapper.removeAttribute('style')
        btn.removeAttribute('style')
    },
    hideRedirect(th){
        let showBtn = document.getElementById(th._entities.redirect.selectShowBtnId)
        let closeBtn = document.getElementById(th._entities.redirect.selectCloseBtnId)
        let selectWrapper = document.getElementById(th._entities.redirect.selectWrapperId)
        let btn = document.getElementById(th._entities.redirect.id)

        showBtn.removeAttribute('style')
        closeBtn.setAttribute('style', 'display: none;')
        selectWrapper.setAttribute('style', 'display: none;')
        btn.setAttribute('style', 'display: none;')
    },
    // Info
    fillInfo(th){
        let time = document.getElementById(th._entities.info.timeId)
        time.textContent = th._entities.info.time
    },
    showInfo(th, time) {
        let infoWrapper = document.getElementById(th._entities.info.id)
        infoWrapper.style.transitionDuration = time+'ms'
        infoWrapper.classList.add('show')
    },
    hideInfo(th, time) {
        let infoWrapper = document.getElementById(th._entities.info.id)
        infoWrapper.style.transitionDuration = time+'ms'
        infoWrapper.classList.remove('show')
    },
    // Photo
    fillPhoto(th){
        let wrapper = document.getElementById(th._entities.photo.wrapperId)
        let img = document.getElementById(th._entities.photo.id)
        let sizer = document.getElementById(th._entities.photo.sizerId)
        let src = th._entities.photo.src

        sizer.removeAttribute('style')
        wrapper.classList.add('loading')
        img.setAttribute('src', src)
    },
    loadedPhoto(th) {
        let wrapper = document.getElementById(th._entities.photo.wrapperId)
        let img = document.getElementById(th._entities.photo.id)
        let sizer = document.getElementById(th._entities.photo.sizerId)

        let img_ = document.createElement('img')
        img_.onload = function (){
            sizer.style.transitionDuration = th.time+'ms'
            wrapper.classList.remove('loading')
            sizer.style.paddingTop = (img_.height / img_.width * 100) + '%'
        }
        img_.src = img.src
    },
    showPhoto(th, time){
        let wrapper = document.getElementById(th._entities.photo.wrapperId)
        let sizer = document.getElementById(th._entities.photo.sizerId)
        sizer.style.transitionDuration = time+'ms'
        wrapper.classList.add('show')
    },
    hidePhoto(th, time) {
        let wrapper = document.getElementById(th._entities.photo.wrapperId)
        let sizer = document.getElementById(th._entities.photo.sizerId)
        sizer.removeAttribute('style')
        sizer.style.transitionDuration = time+'ms'
        wrapper.classList.remove('loading')
        wrapper.classList.remove('show')
    },
    // Tel
    fillTel(th){
        let tel = document.getElementById(th._entities.tel.id)
        tel.textContent = th._entities.tel.content
    },
    // Title
    fillTitle(th) {
        let title = document.getElementById(th._entities.title.id)
        title.textContent = th._entities.title.content
    },
    showTitle(th, time) {
        let titleWrapper = document.getElementById(th._entities.title.wrapperId)
        titleWrapper.style.transitionDuration = time+'ms'
        titleWrapper.classList.add('show')
    },
    hideTitle(th, time) {
        let titleWrapper = document.getElementById(th._entities.title.wrapperId)
        titleWrapper.style.transitionDuration = time+'ms'
        titleWrapper.classList.remove('show')
    },
    // Widget
    showWidget(th, time){
        let widget = document.getElementById(th._entities.widget.id)
        widget.style.transitionDuration = time+'ms'
        widget.classList.add('show')
    },
    hideWidget(th, time){
        let widget = document.getElementById(th._entities.widget.id)
        widget.style.transitionDuration = time+'ms'
        widget.classList.remove('show')
    },
    activePrimaryBtn(th) {
        // Нужно заблокировать кнопку "принять звонок" и установить активный статус кнопке "принять звонок"
        // Блокировка кнопок нужна, чтобы не работали события при повторных кликах
        let dangerBtn = document.getElementById(th._entities.widget.dangerBtnId)
        let primaryBtn = document.getElementById(th._entities.widget.primaryBtnId)
        primaryBtn.disabled = true
        dangerBtn.disabled = false
        primaryBtn.classList.add('active')
    },
    activeDangerBtn(th) {
        // Нужно заблокировать кнопки, свернуть все дополнительный поля и скрыть виджет
        // Блокировка кнопок нужна, чтобы не работали события при повторных кликах
        let primaryBtn = document.getElementById(th._entities.widget.primaryBtnId)
        let dangerBtn = document.getElementById(th._entities.widget.dangerBtnId)
        primaryBtn.disabled = true
        dangerBtn.disabled = true
        primaryBtn.classList.remove('active')
    },
    normalWidget(th) {
        // Вернуть в начальное состояние весь виджет
        let primaryBtn = document.getElementById(th._entities.widget.primaryBtnId)
        let dangerBtn = document.getElementById(th._entities.widget.dangerBtnId)
        primaryBtn.disabled = false
        dangerBtn.disabled = false
        primaryBtn.classList.remove('active')
    },
    //
    getTemplate(entities){
        return h('div', {id: entities.widget.id, class: 'call-widget-mobile'}, [
            h('div', {
                id: entities.photo.wrapperId,
                class: 'call-widget-mobile__photo',
            }, [
                h('div', {
                    id: entities.photo.sizerId,
                    class: 'call-widget-mobile__photo-sizer',
                }),
                h('img', {
                    id: entities.photo.id,
                    src: ''
                }),
            ]),
            h('div', {id: entities.info.id, class: 'call-widget-mobile__box-info'}, [
                h('div', {
                    id: entities.redirect.wrapperId,
                    class: 'call-widget-mobile__redirect',
                    style: 'display: none;'
                }, [
                    h('button', {
                        id: entities.redirect.selectShowBtnId,
                        class: 'call-widget-mobile__btn call-widget-mobile__btn-redirect',
                        type: 'button'
                    }),
                    h('button', {
                        id: entities.redirect.selectCloseBtnId,
                        class: 'call-widget-mobile__btn call-widget-mobile__btn-close',
                        type: 'button',
                        style: 'display: none;'
                    }),
                    h('span', null, 'Перевести на'),
                    h('label', {
                        id: entities.redirect.selectWrapperId,
                        class: 'call-widget-mobile__redirect__select-wrapper',
                        'aria-label': 'Перевести на оператора',
                        style: 'display: none;'
                    }, [
                        h('select', {
                            class: 'call-widget-mobile__select',
                            id: entities.redirect.selectId,
                        }, [
                            h('option', {value: '-'}, '-'),
                        ]),
                    ]),
                    h('button', {
                        class: 'call-widget-mobile__btn call-widget-mobile__btn-redirect call-widget-mobile__btn--warning',
                        type: 'button',
                        style: 'display: none;',
                        id: entities.redirect.id,
                    }),
                ]),
                h('div', {
                    id: entities.info.timeId,
                    class: 'call-widget-mobile__time'
                })
            ]),
            h('div', {id: entities.title.wrapperId, class: 'call-widget-mobile__box-title'}, [
                h('div', {id: entities.title.id, class: 'call-widget-mobile__title'})
            ]),
            h('div', {class: 'call-widget-mobile__box-phone'}, [
                h('div', {id: entities.tel.wrapperId, class: 'call-widget-mobile__tel-wrapper'}, [
                    h('div', {id: entities.tel.id, class: 'call-widget-mobile__tel'})
                ]),
                h('button', {
                    id: entities.widget.dangerBtnId,
                    class: 'call-widget-mobile__btn call-widget-mobile__btn-circle call-widget-mobile__btn-circle--danger',
                    type: 'button'
                }),
                h('button', {
                    id: entities.widget.primaryBtnId,
                    class: 'call-widget-mobile__btn call-widget-mobile__btn-circle call-widget-mobile__btn-circle--primary',
                    type: 'button'
                })
            ])
        ])
    }
}

export default MobileTheme