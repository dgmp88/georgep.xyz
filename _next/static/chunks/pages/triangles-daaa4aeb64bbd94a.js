(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[575],{6431:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/triangles",function(){return n(6289)}])},8662:function(e,t,n){"use strict";n.d(t,{Cz:function(){return l},DZ:function(){return b},GW:function(){return y},O9:function(){return v},S9:function(){return f},eP:function(){return u},oF:function(){return x}});var r=n(8670),a=n.n(r);function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(c){s=!0,a=c}finally{try{i||null==n.return||n.return()}finally{if(s)throw a}}return o}}(e,t)||c(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||c(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){if(e){if("string"===typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}var l=["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"],u=["#03045E","#11488e","#032550"],f=["#B6211B, #E77833, #ECD817, #98E1F2","#03071e, #370617, #6a040f, #9d0208, #d00000, #dc2f02, #e85d04, #f48c06, #faa307, #ffba08","#d9ed92, #b5e48c, #99d98c, #76c893, #52b69a, #34a0a4, #168aad, #1a759f, #1e6091, #184e77","#5f0f40, #9a031e, #fb8b24, #e36414, #0f4c5c","#ffffff, #000000"],d=a()("white"),h=a()("black"),m=a()("gray");function b(e){if(!a().valid(e))return m;e=a()(e);var t=a().contrast(e,h);return a().contrast(e,d)>t?d:h}function y(e){var t=s(e.matchAll(/([0-9a-fA-F]{3}){1,2}/g));return t=t.map((function(e){return"#"+e[0]}))}var v={sugar:"#490A3D,#BD1550,#E97F02,#F8CA00,#8A9B0F,#490A3D,#BD1550,#E97F02",magic_forest:"#014152,#0C7871,#219C85,#48A882,#76B07A,#014152,#0C7871,#219C85",galaxy:"#4CA5A9,#46727F,#414A6D,#383158,#1C1925,#4CA5A9,#46727F,#414A6D",galaxy2:"#20345B,#C4365B,#E66E6C,#E9B08C,#F1E4A8,#20345B,#C4365B,#E66E6C",coolors1:["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"],coolors2:["99d98c","76c893","52b69a","34a0a4","168aad","1a759f","1e6091","184e77"],coolorsROYGBIV:["f94144","f3722c","f8961e","f9c74f","90be6d","43aa8b","577590"]};function p(e){return{r:parseInt(e.slice(1,3),16),g:parseInt(e.slice(3,5),16),b:parseInt(e.slice(5,7),16)}}function g(e,t,n){e=p(e),t=p(t);var r=e.r-(e.r-t.r)*n,a=e.g-(e.g-t.g)*n,o=e.b-(e.b-t.b)*n;return r=Math.round(r),a=Math.round(a),o=Math.round(o),"rgb(".concat(r,",").concat(a,",").concat(o,")")}function x(e,t){var n=e.length;1===t&&(t-=1e-5);var r=Math.floor(t*(n-1)),a=r+1,o=1/(n-1);return g(e[r],e[a],t%o/o)}var j=!0,w=!1,C=void 0;try{for(var N,A=Object.entries(v)[Symbol.iterator]();!(j=(N=A.next()).done);j=!0){var k=i(N.value,2),E=k[0],S=k[1];"string"===typeof S?v[E]=S.split(","):"object"===typeof S&&(v[E]=S.map((function(e){return"#"+e})))}}catch(O){w=!0,C=O}finally{try{j||null==A.return||A.return()}finally{if(w)throw C}}},6289:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return C}});var r=n(5893),a=n(7294),o=n(8670),i=n.n(o),s=n(5500),c=n(8662),l=n(1568);function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(c){s=!0,a=c}finally{try{i||null==n.return||n.return()}finally{if(s)throw a}}return o}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var b=function(){function e(t,n,r,a,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:200;f(this,e),h(this,"refreshPause",150),h(this,"refreshTimeout",void 0),this.draw=t,this.n=n,this.colors=r,this.edgesOn=a,this.edgeCol=o,this.border=i,this.refresh()}var t,n,r;return t=e,(n=[{key:"refresh",value:function(){this.setSize(),this.draw.clear(),this.drawTriangles()}},{key:"setSize",value:function(){this.w=window.innerWidth,this.h=window.innerHeight,this.draw.size(this.w,this.h)}},{key:"edgesOfTriangle",value:function(e){return[3*e,3*e+1,3*e+2]}},{key:"pointsOfTriangle",value:function(e){var t=this;return this.edgesOfTriangle(e).map((function(e){return t.delaunay.triangles[e]}))}},{key:"setPoints",value:function(){for(var e=this,t=[],n=function(t){return Math.round((t+2*e.border)*Math.random()-e.border)},r=0;r<this.n;r++)t.push([n(this.w),n(this.h)]);this.points=t}},{key:"drawTriangles",value:function(){this.cscale=i().scale(this.colors),this.setPoints(),this.delaunay=l.Z.from(this.points);for(var e=0;e<this.delaunay.triangles.length/3;e++){var t=this,n=m(this.pointsOfTriangle(e).map((function(e){return t.points[e]})),3),r=m(n[0],2),a=r[0],o=r[1],s=m(n[1],2),c=s[0],u=s[1],f=m(n[2],2),d=f[0],h=f[1],b=(o+u+h)/3,y=((a+c+d)/3/this.w+b/this.h)/2,v=this.cscale(y).hex();this.draw.polygon("".concat(a,",").concat(o," ").concat(c,",").concat(u," ").concat(d,",").concat(h)).fill(v).stroke({width:1,color:this.edgesOn?this.edgeCol:v})}}}])&&d(t.prototype,n),r&&d(t,r),e}(),y=n(2814),v=n(9398);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var x=c.Cz;function j(e){var t=e.colors.split(",");return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"flex flex-wrap justify-center bg-gray-100 m-2 rounded cursor-pointer",onClick:function(){return e.clickHandler(t)},children:t.map((function(e,t){return(0,r.jsx)("div",{className:"m-2 w-4 h-4 rounded-xl",style:{backgroundColor:e}},t)}))})})}function w(e){var t=(0,a.useState)(e.color),n=t[0],o=t[1],s=(0,a.useState)(e.color),l=s[0],u=s[1];return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("input",{type:"text",className:"input-sm w-28 m-2 flex-1",style:{backgroundColor:n,color:c.DZ(n)},value:l,onChange:function(t){var n=t.target.value;u(n);var r=n;i().valid(n)?e.onColorUpdate(r):r="#979797",o(r)}})})}var C=function(){var e,t=this,n=(0,a.useState)(500),o=n[0],l=n[1],u=(0,a.useState)(false),f=u[0],d=u[1],h=(0,a.useState)("#ee9b0055"),m=h[0],p=h[1],C=(0,a.useState)(g(x)),N=C[0],A=C[1],k=(0,a.useState)(void 0),E=k[0],S=k[1],O=function(t){clearTimeout(e),e=setTimeout((function(){t()}),200)};return(0,a.useEffect)((function(){var e=(0,s.Wj)().addTo("#svg"),t=new b(e,o,N,f,m);return t.refresh(),window.addEventListener("resize",(function(){return O((function(){return t.refresh()}))})),S(t),function(){e.clear(),e.remove()}}),[o,N,f,m]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"absolute -z-1",id:"svg"}),(0,r.jsx)("div",{className:"hero min-h-screen",children:(0,r.jsx)("div",{className:"hero-content text-center max-w-xl",children:(0,r.jsxs)("div",{className:"rounded p-5 bg-base-100 bg-opacity-75",children:[(0,r.jsx)("h1",{className:"text-3xl font-bold",children:"Background Designer"}),(0,r.jsx)("p",{className:"py-6",children:"Resize the window to get the export size you want"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"font-medium",children:"Number of triangles"}),(0,r.jsx)("input",{type:"range",min:"10",max:"100",defaultValue:Math.pow(500,.5),className:"range",onChange:function(e){var t=Math.pow(parseInt(e.target.value),2);O((function(){return l(t)}))}})]}),(0,r.jsxs)("div",{className:"pb-2",children:[(0,r.jsx)("div",{className:"font-medium",children:"Colors"}),(0,r.jsx)("div",{className:"flex flex-wrap justify-center",children:N.map((function(e,t){return(0,r.jsxs)("div",{children:[(0,r.jsx)(w,{color:e,onColorUpdate:function(e){N[t]=e,A(g(N))}}),(0,r.jsx)("span",{className:"btn btn-error btn-xs",onClick:function(e){var n=g(N);n.splice(t,1),A(n)},children:(0,r.jsx)(y.G,{icon:v.g82})})]},e)}))}),(0,r.jsx)("span",{className:"btn btn-secondary btn-xs m-3",onClick:function(e){var t=g(N);t.push(i().random().hex()),A(t)},children:(0,r.jsx)(y.G,{icon:v.r8p})}),(0,r.jsx)("label",{htmlFor:"my-modal",className:"btn btn-secondary btn-xs m-3 modal-button",children:(0,r.jsx)(y.G,{icon:v.Vmj})}),(0,r.jsx)("input",{type:"checkbox",id:"my-modal",className:"modal-toggle"}),(0,r.jsx)("div",{className:"modal",children:(0,r.jsxs)("div",{className:"modal-box",children:[(0,r.jsxs)("p",{className:"py-4",children:["Paste colors below. Try"," ",(0,r.jsx)("a",{className:"link",href:"https://coolors.co/",target:"_blank",children:"coolors"})," ","or"," ",(0,r.jsx)("a",{className:"link",href:"https://www.colourlovers.com/",target:"_blank",children:"Colour Lovers"})," ","."," "]}),(0,r.jsx)("textarea",{id:"colorTextArea",className:"bg-slate-200 w-full",placeholder:"#B6211B,#E77833,#ECD817,#98E1F2"}),(0,r.jsx)("p",{children:"Or try these:"}),c.S9.map((function(e,t){return(0,r.jsx)(j,{colors:e,clickHandler:function(){var t=c.GW(e);A(t)}},t)})),(0,r.jsx)("div",{className:"modal-action",children:(0,r.jsx)("label",{htmlFor:"my-modal",className:"btn",onClick:function(){var e=document.getElementById("colorTextArea").value,t=c.GW(e);t.length>1&&A(t)},children:"Done"})})]})}),(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("div",{className:"form-control w-1/3",children:(0,r.jsxs)("label",{className:"label cursor-pointer",children:[(0,r.jsx)("span",{className:"label-text font-medium",children:"Edges"}),(0,r.jsx)("input",{type:"checkbox",className:"toggle",onChange:function(){d(!f)},value:f})]})}),(0,r.jsx)("div",{className:"w-2/3 text-right ".concat(f?"opacity-1":"opacity-0"),children:(0,r.jsx)(w,{color:m,onColorUpdate:function(e){p(e)}})})]})]}),(0,r.jsxs)("div",{className:"flex justify-center",children:[(0,r.jsx)("button",{className:"btn btn-primary m-2",onClick:function(){E.refresh()},children:(0,r.jsx)(y.G,{icon:v.T80})}),(0,r.jsx)("button",{className:"btn btn-secondary m-2",onClick:function(){var e=t.draw.svg(),n=new Blob([e],{type:"plain/text"}),r=document.createElement("a"),a=URL.createObjectURL(n);r.href=a,r.download="background.svg",document.body.appendChild(r),r.click(),setTimeout((function(){document.body.removeChild(r),window.URL.revokeObjectURL(a)}),0)},children:(0,r.jsx)(y.G,{icon:v.q7m})})]})]})})})]})}}},function(e){e.O(0,[780,523,670,485,774,888,179],(function(){return t=6431,e(e.s=t);var t}));var t=e.O();_N_E=t}]);