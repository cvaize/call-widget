(()=>{"use strict";var t,e={510:(t,e,n)=>{n.d(e,{Z:()=>v});var r=n(653),i=n(620),o=n(722);function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f={id:null,selector:"body"},d={loading:!1,showing:!1,showed:!0,id:null},h="btn_primary:click",p="btn_danger:click",y=[h,p],v=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};a(this,t),s(this,"_settings",void 0),s(this,"_entities",void 0),s(this,"_schedule",void 0),s(this,"_funHandleClickPrimaryBtn",void 0),s(this,"_funHandleClickDangerBtn",void 0),s(this,"_eventHandlers",void 0),s(this,"EVENT_BTN_PRIMARY_CLICK",void 0),s(this,"EVENT_BTN_DANGER_CLICK",void 0),this.EVENT_BTN_PRIMARY_CLICK=h,this.EVENT_BTN_DANGER_CLICK=p,e.id||(e.id="call-widget-"+Math.round(1e7*Math.random())),this._settings=Object.assign(f,e),this._setStartParams()}var e,n,l;return e=t,(n=[{key:"call",value:function(t){var e=t.tel,n=t.title,l=void 0===n?null:n;if(!e)throw new Error("CallWidget@call обязательно передайте номер телефона");this._entities.tel.content=e,this._entities.title.content=l,this._schedule.push(new i.Z("fill",0,this)),this._schedule.push(new r.Z("show",300,this)),l&&(this._schedule.push(new o.Z("fill",0,this)),this._schedule.push(new o.Z("show",300,this))),this._render()}},{key:"print",value:function(){var t,e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t="string"==typeof(n=n||this._settings.selector)||n instanceof String?document.querySelector(n):n;var r=this._getTemplate();return t.appendChild(r),requestAnimationFrame((function(){e._attachEvents()})),r}},{key:"on",value:function(t,e){this._eventHandlers[t].push(e)}},{key:"off",value:function(t,e){this._eventHandlers[t]=this._eventHandlers[t].filter((function(t){return t!==e}))}},{key:"_attachEvents",value:function(){var t=document.getElementById(this._entities.widget.primaryBtnId),e=document.getElementById(this._entities.widget.dangerBtnId),n=this;this._funHandleClickPrimaryBtn=function(){n._handleClickPrimaryBtn()},this._funHandleClickDangerBtn=function(){n._handleClickDangerBtn()},t.addEventListener("click",this._funHandleClickPrimaryBtn),e.addEventListener("click",this._funHandleClickDangerBtn)}},{key:"_handleEvent",value:function(t){for(var e=this._eventHandlers[t],n=!0,r=0;r<e.length;r++){var i=e[r];if(i){var o=i(n);"boolean"==typeof o&&(n=o)}}return n}},{key:"_handleClickPrimaryBtn",value:function(){this._handleEvent(h)}},{key:"_handleClickDangerBtn",value:function(){this._handleEvent(p)}},{key:"_render",value:function(){var t=this,e=this._schedule.shift();e&&(console.log(e,e.action,e.time),e.time?requestAnimationFrame((function(){setTimeout((function(){t._render()}),e.time),e.render()})):(e.render(),this._render()))}},{key:"_h",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=document.createElement(t);if(e)for(var i in e)r.setAttribute(i,e[i]);if(n)if("string"==typeof n||n instanceof String)r.textContent=n;else if(Array.isArray(n))for(var o=0;o<n.length;o++)r.appendChild(n[o]);return r}},{key:"_getTemplate",value:function(){var t=this._h;return t("div",{id:this._entities.widget.id,class:"call-widget",style:"transform: translateX(25em);"},[t("div",{id:this._entities.title.wrapperId,class:"call-widget__title-wrapper",style:"height: 0;"},[t("div",{id:this._entities.title.id,class:"call-widget__title"})]),t("div",{class:"call-widget__box-phone"},[t("div",{id:this._entities.tel.wrapperId,class:"call-widget__tel-wrapper"},[t("div",{id:this._entities.tel.id,class:"call-widget__tel"})]),t("button",{id:this._entities.widget.dangerBtnId,class:"call-widget__btn call-widget__btn-circle call-widget__btn-circle--danger",type:"button"}),t("button",{id:this._entities.widget.primaryBtnId,class:"call-widget__btn call-widget__btn-circle call-widget__btn-circle--primary",type:"button"})])])}},{key:"_setStartParams",value:function(){this._entities=this._getEntities(),this._schedule=[],this._eventHandlers={};for(var t=0;t<y.length;t++){var e=y[t];this._eventHandlers[e]=[]}}},{key:"_getEntities",value:function(){var t=this._settings.id;return{widget:c(c({},d),{},{id:t,primaryBtnId:t+"-primary-btn",dangerBtnId:t+"-danger-btn"}),title:c(c({},d),{},{id:t+"-title",wrapperId:t+"-wrapper-title",content:null}),tel:c(c({},d),{},{id:t+"-tel",wrapperId:t+"-wrapper-tel",content:null})}}}])&&u(e.prototype,n),l&&u(e,l),t}()},623:(t,e,n)=>{var r=n(510);window.CallWidget=r.Z},184:(t,e,n)=>{function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,{Z:()=>o});var o=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),i(this,"action",void 0),i(this,"time",void 0),i(this,"callWidget",void 0),this.action=e,this.time=n||0,this.callWidget=r}var e,n,o;return e=t,(n=[{key:"render",value:function(){throw new Error("ScheduleItem@render Обязательно определите метод рендера")}}])&&r(e.prototype,n),o&&r(e,o),t}()},620:(t,e,n)=>{function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var i=u(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}n.d(e,{Z:()=>s});var s=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(u,t);var e,n,r,a=c(u);function u(){return i(this,u),a.apply(this,arguments)}return e=u,(n=[{key:"render",value:function(){this["_"+this.action]()}},{key:"_fill",value:function(){document.getElementById(this.callWidget._entities.tel.id).textContent=this.callWidget._entities.tel.content}}])&&o(e.prototype,n),r&&o(e,r),u}(n(184).Z)},722:(t,e,n)=>{function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var i=u(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}n.d(e,{Z:()=>s});var s=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(u,t);var e,n,r,a=c(u);function u(){return i(this,u),a.apply(this,arguments)}return e=u,(n=[{key:"render",value:function(){this["_"+this.action]()}},{key:"_fill",value:function(){document.getElementById(this.callWidget._entities.title.id).textContent=this.callWidget._entities.title.content}},{key:"_show",value:function(){var t=document.getElementById(this.callWidget._entities.title.wrapperId);t.style.transitionDuration=this.time+"ms",t.style.height="3em"}}])&&o(e.prototype,n),r&&o(e,r),u}(n(184).Z)},653:(t,e,n)=>{function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var i=u(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}n.d(e,{Z:()=>s});var s=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(u,t);var e,n,r,a=c(u);function u(){return i(this,u),a.apply(this,arguments)}return e=u,(n=[{key:"render",value:function(){this["_"+this.action]()}},{key:"_show",value:function(){var t=document.getElementById(this.callWidget._entities.widget.id);t.style.transitionDuration=this.time+"ms",t.style.transform="translateX(0)"}}])&&o(e.prototype,n),r&&o(e,r),u}(n(184).Z)},869:()=>{}},n={};function r(t){var i=n[t];if(void 0!==i)return i.exports;var o=n[t]={exports:{}};return e[t](o,o.exports,r),o.exports}r.m=e,t=[],r.O=(e,n,i,o)=>{if(!n){var l=1/0;for(u=0;u<t.length;u++){for(var[n,i,o]=t[u],c=!0,a=0;a<n.length;a++)(!1&o||l>=o)&&Object.keys(r.O).every((t=>r.O[t](n[a])))?n.splice(a--,1):(c=!1,o<l&&(l=o));c&&(t.splice(u--,1),e=i())}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[n,i,o]},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={165:0,867:0,836:0};r.O.j=e=>0===t[e];var e=(e,n)=>{var i,o,[l,c,a]=n,u=0;for(i in c)r.o(c,i)&&(r.m[i]=c[i]);if(a)var s=a(r);for(e&&e(n);u<l.length;u++)o=l[u],r.o(t,o)&&t[o]&&t[o][0](),t[l[u]]=0;return r.O(s)},n=self.webpackChunkcall_widget=self.webpackChunkcall_widget||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})(),r.O(void 0,[836],(()=>r(623)));var i=r.O(void 0,[836],(()=>r(869)));i=r.O(i)})();
//# sourceMappingURL=call-widget.lib.js.map