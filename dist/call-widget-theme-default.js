!function(){"use strict";function t(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=document.createElement(t);if(e)for(var d in e)n.setAttribute(d,e[d]);if(i)if("string"==typeof i||i instanceof String)n.textContent=i;else if(Array.isArray(i))for(var l=0;l<i.length;l++)n.appendChild(i[l]);return n}var e={fillRedirect:function(e){var i=e._entities.redirect.numbers,n=document.getElementById(e._entities.redirect.wrapperId),d=document.getElementById(e._entities.redirect.selectId);d.innerHTML="";for(var l=0;l<i.length;l++){var s=i[l];d.appendChild(t("option",{value:s},s))}i[0]?(d.value=i[0],n.removeAttribute("style")):n.setAttribute("style","display: none;")},showRedirect:function(t){var e=document.getElementById(t._entities.redirect.selectShowBtnId),i=document.getElementById(t._entities.redirect.selectCloseBtnId),n=document.getElementById(t._entities.redirect.selectWrapperId),d=document.getElementById(t._entities.redirect.id);e.setAttribute("style","display: none;"),i.removeAttribute("style"),n.removeAttribute("style"),d.removeAttribute("style")},hideRedirect:function(t){var e=document.getElementById(t._entities.redirect.selectShowBtnId),i=document.getElementById(t._entities.redirect.selectCloseBtnId),n=document.getElementById(t._entities.redirect.selectWrapperId),d=document.getElementById(t._entities.redirect.id);e.removeAttribute("style"),i.setAttribute("style","display: none;"),n.setAttribute("style","display: none;"),d.setAttribute("style","display: none;")},fillInfo:function(t){document.getElementById(t._entities.info.timeId).textContent=t._entities.info.time},showInfo:function(t,e){var i=document.getElementById(t._entities.info.id);i.style.transitionDuration=e+"ms",i.classList.add("show")},hideInfo:function(t,e){var i=document.getElementById(t._entities.info.id);i.style.transitionDuration=e+"ms",i.classList.remove("show")},fillPhoto:function(t){var e=document.getElementById(t._entities.photo.wrapperId),i=document.getElementById(t._entities.photo.id),n=document.getElementById(t._entities.photo.sizerId),d=t._entities.photo.src;n.removeAttribute("style"),e.classList.add("loading"),i.setAttribute("src",d)},loadedPhoto:function(t){var e=document.getElementById(t._entities.photo.wrapperId),i=document.getElementById(t._entities.photo.id),n=document.getElementById(t._entities.photo.sizerId),d=document.createElement("img");d.onload=function(){n.style.transitionDuration=t.time+"ms",e.classList.remove("loading"),n.style.paddingTop=d.height/d.width*100+"%"},d.src=i.src},showPhoto:function(t,e){var i=document.getElementById(t._entities.photo.wrapperId);document.getElementById(t._entities.photo.sizerId).style.transitionDuration=e+"ms",i.classList.add("show")},hidePhoto:function(t,e){var i=document.getElementById(t._entities.photo.wrapperId),n=document.getElementById(t._entities.photo.sizerId);n.removeAttribute("style"),n.style.transitionDuration=e+"ms",i.classList.remove("loading"),i.classList.remove("show")},fillTel:function(t){document.getElementById(t._entities.tel.id).textContent=t._entities.tel.content},fillTitle:function(t){document.getElementById(t._entities.title.id).textContent=t._entities.title.content},showTitle:function(t,e){var i=document.getElementById(t._entities.title.wrapperId);i.style.transitionDuration=e+"ms",i.classList.add("show")},hideTitle:function(t,e){var i=document.getElementById(t._entities.title.wrapperId);i.style.transitionDuration=e+"ms",i.classList.remove("show")},showWidget:function(t,e){var i=document.getElementById(t._entities.widget.id);i.style.transitionDuration=e+"ms",i.classList.add("show")},hideWidget:function(t,e){var i=document.getElementById(t._entities.widget.id);i.style.transitionDuration=e+"ms",i.classList.remove("show")},activePrimaryBtn:function(t){var e=document.getElementById(t._entities.widget.dangerBtnId),i=document.getElementById(t._entities.widget.primaryBtnId);i.disabled=!0,e.disabled=!1,i.classList.add("active")},activeDangerBtn:function(t){var e=document.getElementById(t._entities.widget.primaryBtnId),i=document.getElementById(t._entities.widget.dangerBtnId);e.disabled=!0,i.disabled=!0,e.classList.remove("active")},normalWidget:function(t){var e=document.getElementById(t._entities.widget.primaryBtnId),i=document.getElementById(t._entities.widget.dangerBtnId);e.disabled=!1,i.disabled=!1,e.classList.remove("active")},getTemplate:function(e){return t("div",{id:e.widget.id,class:"call-widget"},[t("div",{id:e.photo.wrapperId,class:"call-widget__photo"},[t("div",{id:e.photo.sizerId,class:"call-widget__photo-sizer"}),t("img",{id:e.photo.id,src:""})]),t("div",{id:e.info.id,class:"call-widget__box-info"},[t("div",{id:e.redirect.wrapperId,class:"call-widget__redirect",style:"display: none;"},[t("button",{id:e.redirect.selectShowBtnId,class:"call-widget__btn call-widget__btn-redirect",type:"button"}),t("button",{id:e.redirect.selectCloseBtnId,class:"call-widget__btn call-widget__btn-close",type:"button",style:"display: none;"}),t("span",null,"Перевести на"),t("label",{id:e.redirect.selectWrapperId,class:"call-widget__redirect__select-wrapper","aria-label":"Перевести на оператора",style:"display: none;"},[t("select",{class:"call-widget__select",id:e.redirect.selectId},[t("option",{value:"-"},"-")])]),t("button",{class:"call-widget__btn call-widget__btn-redirect call-widget__btn--warning",type:"button",style:"display: none;",id:e.redirect.id})]),t("div",{id:e.info.timeId,class:"call-widget__time"})]),t("div",{id:e.title.wrapperId,class:"call-widget__box-title"},[t("div",{id:e.title.id,class:"call-widget__title"})]),t("div",{class:"call-widget__box-phone"},[t("div",{id:e.tel.wrapperId,class:"call-widget__tel-wrapper"},[t("div",{id:e.tel.id,class:"call-widget__tel"})]),t("button",{id:e.widget.dangerBtnId,class:"call-widget__btn call-widget__btn-circle call-widget__btn-circle--danger",type:"button"}),t("button",{id:e.widget.primaryBtnId,class:"call-widget__btn call-widget__btn-circle call-widget__btn-circle--primary",type:"button"})])])}};window.CallWidgetDefaultTheme=e}();
//# sourceMappingURL=call-widget-theme-default.js.map