(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[141],{8685:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/play",function(){return n(1675)}])},1675:function(e,t,n){"use strict";n.r(t);var r=n(5893),o=n(7294);function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e){return i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},i(e)}function a(e,t){return!t||"object"!==f(t)&&"function"!==typeof t?u(e):t}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}var f=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=i(e);if(t){var o=i(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}var h=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(f,e);var t,n,i,a=s(f);function f(e){var t,n,r,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),t=a.call(this,e),n=u(t),c=600,(r="width")in n?Object.defineProperty(n,r,{value:c,enumerable:!0,configurable:!0,writable:!0}):n[r]=c,t.state={url:""},t.iframeContainer=(0,o.createRef)(),t}return t=f,(n=[{key:"componentDidMount",value:function(){var e=screen.width/screen.height;this.iframeContainer.current.style.width="".concat(this.width,"px");var t=this.width/e;t=Math.round(t),this.iframeContainer.current.style.height="".concat(t,"px");var n=new Proxy(new URLSearchParams(window.location.search),{get:function(e,t){return e.get(t)}});this.state.url="/".concat(n.game,"/index.html")}},{key:"setupOnClick",value:function(){var e=function(){t.requestFullscreen?t.requestFullscreen():elem.webkitRequestFullscreen?t.webkitRequestFullscreen():elem.msRequestFullscreen&&t.msRequestFullscreen()},t=document.getElementById("gameIframe"),n=t.contentWindow.document;n.onclick=e,n.ontouchstart=e,document.onfullscreenerror=function(e){console.log(e)}}},{key:"render",value:function(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{ref:this.iframeContainer,className:"m-auto",children:(0,r.jsx)("iframe",{id:"gameIframe",width:"100%",height:"100%",src:this.state.url,onLoad:this.setupOnClick})})})}}])&&c(t.prototype,n),i&&c(t,i),f}(o.Component);t.default=h}},function(e){e.O(0,[774,888,179],(function(){return t=8685,e(e.s=t);var t}));var t=e.O();_N_E=t}]);