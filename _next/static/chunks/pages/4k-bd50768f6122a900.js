(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[435],{5807:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/4k",function(){return n(5537)}])},1621:function(t,e,n){"use strict";n.d(e,{Cz:function(){return u},GW:function(){return f},O9:function(){return s},S9:function(){return i},oF:function(){return b}});var r=n(828),o=n(9815),a=n(8670),c=n.n(a),u=["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"],i=["#B6211B, #E77833, #ECD817, #98E1F2","#03071e, #370617, #6a040f, #9d0208, #d00000, #dc2f02, #e85d04, #f48c06, #faa307, #ffba08","#d9ed92, #b5e48c, #99d98c, #76c893, #52b69a, #34a0a4, #168aad, #1a759f, #1e6091, #184e77","#5f0f40, #9a031e, #fb8b24, #e36414, #0f4c5c","#ffffff, #000000"];c()("white"),c()("black"),c()("gray");function f(t){var e=(0,o.Z)(t.matchAll(/([0-9a-fA-F]{3}){1,2}/g));return e=e.map((function(t){return"#"+t[0]}))}var s={sugar:"#490A3D,#BD1550,#E97F02,#F8CA00,#8A9B0F,#490A3D,#BD1550,#E97F02",magic_forest:"#014152,#0C7871,#219C85,#48A882,#76B07A,#014152,#0C7871,#219C85",galaxy:"#4CA5A9,#46727F,#414A6D,#383158,#1C1925,#4CA5A9,#46727F,#414A6D",galaxy2:"#20345B,#C4365B,#E66E6C,#E9B08C,#F1E4A8,#20345B,#C4365B,#E66E6C",coolors1:["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"],coolors2:["99d98c","76c893","52b69a","34a0a4","168aad","1a759f","1e6091","184e77"],coolorsROYGBIV:["f94144","f3722c","f8961e","f9c74f","90be6d","43aa8b","577590"]};function l(t){return{r:parseInt(t.slice(1,3),16),g:parseInt(t.slice(3,5),16),b:parseInt(t.slice(5,7),16)}}function d(t,e,n){t=l(t),e=l(e);var r=t.r-(t.r-e.r)*n,o=t.g-(t.g-e.g)*n,a=t.b-(t.b-e.b)*n;return r=Math.round(r),o=Math.round(o),a=Math.round(a),"rgb(".concat(r,",").concat(o,",").concat(a,")")}function b(t,e){var n=t.length;1===e&&(e-=1e-5);var r=Math.floor(e*(n-1)),o=r+1,a=1/(n-1);return d(t[r],t[o],e%a/a)}var p=!0,v=!1,h=void 0;try{for(var y,m=Object.entries(s)[Symbol.iterator]();!(p=(y=m.next()).done);p=!0){var w=(0,r.Z)(y.value,2),g=w[0],E=w[1];"string"===typeof E?s[g]=E.split(","):"object"===typeof E&&(s[g]=E.map((function(t){return"#"+t})))}}catch(_){v=!0,h=_}finally{try{p||null==m.return||m.return()}finally{if(v)throw h}}},5537:function(t,e,n){"use strict";n.r(e);var r=n(1438),o=n(2951),a=n(8029),c=n(6567),u=n(5893),i=n(1621),f=n(7294),s=(n(6486),function(t){(0,a.Z)(n,t);var e=(0,c.Z)(n);function n(){return(0,r.Z)(this,n),e.apply(this,arguments)}return(0,o.Z)(n,[{key:"componentDidMount",value:function(){var t=function(t){a.clearRect(0,0,e.width,e.height);var u=c,f=(n-24)/51,s=(r-24)/(u-1),l=1,d=52*u,b=!0;0==t&&(b=!1);for(var p=0;p<u;p+=1)for(var v=p*s+12,h=0;h<52;h+=1){var y=(0,i.oF)(o,p/u/2+h/52/2),m=h*f+12,w=4,g=void 0;l/d<t?g=function(){return a.stroke()}:(b&&(w*=.5,b=!1),g=function(){return a.fill()}),a.beginPath(),a.ellipse(m,v,w,w,0,0,2*Math.PI),a.fillStyle=y,a.strokeStyle=y,g(),l+=1}},e=document.getElementById("canvas"),n=600,r=800;e.width=n,e.height=r;var o=i.O9.coolorsROYGBIV,a=e.getContext("2d"),c=80;a.fillStyle="white",a.fillRect(0,0,e.width,e.height),t(0);var u=1e3,f=null,s=document.getElementById("dob");s.addEventListener("change",(function(){var e=new Date(s.value),n=(new Date-e)/864e5/365.25/c;n>0&n<1&&(clearTimeout(f),f=setTimeout((function(){t(n)}),u))}))}},{key:"render",value:function(){return(0,u.jsxs)("div",{id:"app",className:"m-5",children:[(0,u.jsxs)("div",{className:"flex",children:[(0,u.jsx)("div",{className:"w-1/4"}),(0,u.jsx)("div",{className:"w-1/4",children:"Your DOB"}),(0,u.jsx)("div",{className:"w-1/4",children:(0,u.jsx)("input",{type:"date",id:"dob",name:"trip-start",min:"1900-01-01",max:"2020-12-31"})})]}),(0,u.jsx)("div",{children:(0,u.jsx)("canvas",{id:"canvas",className:"m-auto"})})]})}}]),n}(f.Component));e.default=s},1438:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,{Z:function(){return r}})},2951:function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}n.d(e,{Z:function(){return o}})},6567:function(t,e,n){"use strict";function r(t){return r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},r(t)}function o(t){return r(t)}function a(t,e){return!e||"object"!==((n=e)&&n.constructor===Symbol?"symbol":typeof n)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e;var n}function c(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=o(t);if(e){var c=o(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return a(this,n)}}n.d(e,{Z:function(){return c}})},8029:function(t,e,n){"use strict";function r(t,e){return r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(t,e)}function o(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}n.d(e,{Z:function(){return o}})},9815:function(t,e,n){"use strict";n.d(e,{Z:function(){return c}});var r=n(943);var o=n(3375);var a=n(1566);function c(t){return function(t){if(Array.isArray(t))return(0,r.Z)(t)}(t)||(0,o.Z)(t)||(0,a.Z)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}},function(t){t.O(0,[662,669,774,888,179],(function(){return e=5807,t(t.s=e);var e}));var e=t.O();_N_E=e}]);