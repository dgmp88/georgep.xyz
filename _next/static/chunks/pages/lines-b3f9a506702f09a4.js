(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[0],{3433:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/lines",function(){return n(5753)}])},8662:function(e,t,n){"use strict";n.d(t,{Cz:function(){return u},DZ:function(){return y},GW:function(){return b},O9:function(){return m},S9:function(){return f},eP:function(){return l},oF:function(){return g}});var r=n(8670),i=n.n(r);function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,o=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);a=!0);}catch(c){s=!0,i=c}finally{try{a||null==n.return||n.return()}finally{if(s)throw i}}return o}}(e,t)||c(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||c(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){if(e){if("string"===typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}var u=["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"],l=["#03045E","#11488e","#032550"],f=["#B6211B, #E77833, #ECD817, #98E1F2","#03071e, #370617, #6a040f, #9d0208, #d00000, #dc2f02, #e85d04, #f48c06, #faa307, #ffba08","#d9ed92, #b5e48c, #99d98c, #76c893, #52b69a, #34a0a4, #168aad, #1a759f, #1e6091, #184e77","#5f0f40, #9a031e, #fb8b24, #e36414, #0f4c5c","#ffffff, #000000"],h=i()("white"),d=i()("black"),v=i()("gray");function y(e){if(!i().valid(e))return v;e=i()(e);var t=i().contrast(e,d);return i().contrast(e,h)>t?h:d}function b(e){var t=s(e.matchAll(/([0-9a-fA-F]{3}){1,2}/g));return t=t.map((function(e){return"#"+e[0]}))}var m={sugar:"#490A3D,#BD1550,#E97F02,#F8CA00,#8A9B0F,#490A3D,#BD1550,#E97F02",magic_forest:"#014152,#0C7871,#219C85,#48A882,#76B07A,#014152,#0C7871,#219C85",galaxy:"#4CA5A9,#46727F,#414A6D,#383158,#1C1925,#4CA5A9,#46727F,#414A6D",galaxy2:"#20345B,#C4365B,#E66E6C,#E9B08C,#F1E4A8,#20345B,#C4365B,#E66E6C",coolors1:["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"],coolors2:["99d98c","76c893","52b69a","34a0a4","168aad","1a759f","1e6091","184e77"],coolorsROYGBIV:["f94144","f3722c","f8961e","f9c74f","90be6d","43aa8b","577590"]};function p(e){return{r:parseInt(e.slice(1,3),16),g:parseInt(e.slice(3,5),16),b:parseInt(e.slice(5,7),16)}}function w(e,t,n){e=p(e),t=p(t);var r=e.r-(e.r-t.r)*n,i=e.g-(e.g-t.g)*n,o=e.b-(e.b-t.b)*n;return r=Math.round(r),i=Math.round(i),o=Math.round(o),"rgb(".concat(r,",").concat(i,",").concat(o,")")}function g(e,t){var n=e.length;1===t&&(t-=1e-5);var r=Math.floor(t*(n-1)),i=r+1,o=1/(n-1);return w(e[r],e[i],t%o/o)}var x=!0,j=!1,k=void 0;try{for(var P,A=Object.entries(m)[Symbol.iterator]();!(x=(P=A.next()).done);x=!0){var C=a(P.value,2),N=C[0],E=C[1];"string"===typeof E?m[N]=E.split(","):"object"===typeof E&&(m[N]=E.map((function(e){return"#"+e})))}}catch(O){j=!0,k=O}finally{try{x||null==A.return||A.return()}finally{if(j)throw k}}},5753:function(e,t,n){"use strict";n.r(t);var r=n(5893),i=n(7294),o=n(5500),a=n(8670),s=n.n(a),c=(n(6486),n(8662));function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}function y(e,t){return!t||"object"!==m(t)&&"function"!==typeof t?u(e):t}function b(e,t){return b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},b(e,t)}var m=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function p(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var i=v(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return y(this,n)}}var w=c.eP,g=function(){function e(t,n){l(this,e),this.x=Math.round(t),this.y=Math.round(n)}return h(e,[{key:"negate",value:function(){return new e(-this.x,-this.y)}}]),e}();var x=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:300,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:w,u=this;l(this,e),d(this,"refreshPause",200),d(this,"debug",!1),d(this,"refreshTimeout",void 0),this.nLines=t,this.nPointsPerLine=n,this.bzMinY=r,this.bzMaxY=i,this.xOffsetMax=a,this.colors=c,this.cscale=s().scale(c).mode("lch"),this.draw=(0,o.Wj)().addTo("#svg"),this.setSize(),this.drawLines(),window.onresize=function(){var e=u;window.setTimeout((function(){e.setSize(),e.drawLines()})),u.refreshPause}}return h(e,[{key:"log",value:function(e){this.debug&&console.log(e)}},{key:"setSize",value:function(){this.w=window.innerWidth,this.h=window.innerHeight,this.xGap=this.w/this.nPointsPerLine,this.draw.size(this.w,this.h)}},{key:"bezierBetween",value:function(e,t,n){var r=this,i=new g(Math.random()*r.xGap,Math.max(Math.random()*r.bzMaxY,r.bzMinY)),o={x:e.x+i.x,y:e.y+i.y};return{str:"S".concat(o.x," ").concat(o.y,"\n    ").concat(t.x," ").concat(t.y),p1:e,p2:t,c:o}}},{key:"getLinePoints",value:function(e,t){for(var n=[],r=e+(t-e)/2,i=0;i<this.nPointsPerLine;i++){var o=i/(this.nPointsPerLine-1)*this.w;o+=Math.random()*this.xOffsetMax,n.push(new g(o,r))}return n}},{key:"drawLines",value:function(){this.draw.rect(this.w,this.h).fill(this.cscale(0).hex());for(var e=this.h/this.nLines,t=0;t<this.nLines;t+=1){for(var n=[],r=t*e,i=r+e,o=this.getLinePoints(r,i),a="M0 ".concat(this.h," V").concat(o[0].y," "),s=0;s<this.nPointsPerLine-1;s++){var c=o[s],u=o[s+1],l=s%2==0?1:-1,f=this.bezierBetween(c,u,l);a+=f.str,animStr+=f.anim,n.push(f)}var h="H".concat(this.w," V").concat(this.h," z");a+=h,animStr+=h;var d=(t+1)/this.nLines,v=this.cscale(d).hex();if(this.draw.path(a).fill(v),this.debug){var y=!0,b=!1,m=void 0;try{for(var p,w=n[Symbol.iterator]();!(y=(p=w.next()).done);y=!0){var g=p.value,x=g.p1,j=g.p2,k=g.c;this.draw.circle(5).move(x.x,x.y).fill("white"),this.draw.circle(5).move(j.x,j.y).fill("white"),this.draw.circle(5).move(k.x,k.y).fill("green")}}catch(P){b=!0,m=P}finally{try{y||null==w.return||w.return()}finally{if(b)throw m}}}}}},{key:"refreshAfterPause",value:function(){var e=this;clearTimeout(this.refreshTimeout),this.refreshTimeout=setTimeout((function(){e.refresh()}),this.refreshPause)}},{key:"refresh",value:function(){this.draw.clear(),this.drawLines()}},{key:"setN",value:function(e){this.n=e}},{key:"download",value:function(){var e=this.draw.svg(),t=new Blob([e],{type:"plain/text"}),n=document.createElement("a"),r=URL.createObjectURL(t);n.href=r,n.download="background.svg",document.body.appendChild(n),n.click(),setTimeout((function(){document.body.removeChild(n),window.URL.revokeObjectURL(r)}),0)}}]),e}(),j=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(n,e);var t=p(n);function n(e){var r;return l(this,n),(r=t.call(this,e)).state={mounted:!1},r.download=r.download.bind(u(r)),r.refresh=r.refresh.bind(u(r)),r.changeN=r.changeN.bind(u(r)),r}return h(n,[{key:"componentDidMount",value:function(){if(!this.state.mounted){var e=new x;this.state.lines=e,this.state.mounted=!0}}},{key:"download",value:function(){this.state.lines.download()}},{key:"refresh",value:function(){this.state.lines.refresh()}},{key:"changeN",value:function(e){var t=parseInt(e.target.value);this.state.lines.setN(t),this.state.lines.refreshAfterPause()}},{key:"render",value:function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"absolute -z-1",id:"svg"}),(0,r.jsx)("div",{className:"hero min-h-screen hidden",children:(0,r.jsx)("div",{className:"hero-content text-center",children:(0,r.jsxs)("div",{className:"rounded p-5",style:{"background-color":"rgba(255, 255, 255, 0.5)"},children:[(0,r.jsx)("h1",{className:"text-3xl font-bold",children:"Background Designer"}),(0,r.jsx)("p",{className:"py-6",children:"Resize the window to get the export size you want"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"font-medium",children:"Number of lines"}),(0,r.jsx)("input",{type:"range",min:"20",max:"3000",defaultValue:3,className:"range",onChange:this.changeN})]}),(0,r.jsx)("div",{className:"pb-2",children:(0,r.jsx)("div",{className:"font-medium",children:"Colors"})}),(0,r.jsx)("button",{className:"btn btn-secondary",onClick:this.refresh,children:"Refresh"}),(0,r.jsx)("button",{className:"btn btn-primary",onClick:this.download,children:"Download SVG"})]})})})]})}}]),n}(i.Component);t.default=j}},function(e){e.O(0,[662,780,670,774,888,179],(function(){return t=3433,e(e.s=t);var t}));var t=e.O();_N_E=t}]);