(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[195],{677:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog",function(){return t(8547)}])},347:function(e,r,t){"use strict";t.d(r,{A:function(){return o}});var n=t(5893);t(7294);function o(){return(0,n.jsx)("div",{children:(0,n.jsx)("div",{className:"fixed w-screen h-screen",style:{zIndex:"-1",backgroundImage:"url('/curves.svg')",backgroundRepeat:"no-repeat",backgroundSize:"cover"}})})}},2264:function(e,r,t){"use strict";t.d(r,{l:function(){return u}});var n=t(5893),o=t(1664),a=t.n(o);function u(){return(0,n.jsxs)("div",{className:"navbar text-gray-100 ",children:[(0,n.jsx)("div",{className:"flex-1",children:(0,n.jsx)(a(),{href:"/",children:(0,n.jsx)("a",{className:"btn btn-ghost normal-case text-xl",children:"George Prichard"})})}),(0,n.jsx)("div",{className:"flex-none",children:(0,n.jsx)("ul",{className:"menu menu-horizontal p-0",children:(0,n.jsxs)("li",{children:[(0,n.jsx)(a(),{href:"/backgrounds",children:"Backgrounds"}),(0,n.jsx)(a(),{href:"/blog",children:"Blog"})]})})})]})}},1551:function(e,r,t){"use strict";function n(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function o(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,o,a=[],u=!0,l=!1;try{for(t=t.call(e);!(u=(n=t.next()).done)&&(a.push(n.value),!r||a.length!==r);u=!0);}catch(c){l=!0,o=c}finally{try{u||null==t.return||t.return()}finally{if(l)throw o}}return a}}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return n(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return n(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var a,u=(a=t(7294))&&a.__esModule?a:{default:a},l=t(1003),c=t(880),i=t(9246);var s={};function f(e,r,t,n){if(e&&l.isLocalURL(r)){e.prefetch(r,t,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;s[r+"%"+t+(o?"%"+o:"")]=!0}}var d=function(e){var r,t=!1!==e.prefetch,n=c.useRouter(),a=u.default.useMemo((function(){var r=o(l.resolveHref(n,e.href,!0),2),t=r[0],a=r[1];return{href:t,as:e.as?l.resolveHref(n,e.as):a||t}}),[n,e.href,e.as]),d=a.href,p=a.as,v=u.default.useRef(d),h=u.default.useRef(p),y=e.children,b=e.replace,m=e.shallow,g=e.scroll,x=e.locale;"string"===typeof y&&(y=u.default.createElement("a",null,y));var j=(r=u.default.Children.only(y))&&"object"===typeof r&&r.ref,w=o(i.useIntersection({rootMargin:"200px"}),3),_=w[0],k=w[1],E=w[2],N=u.default.useCallback((function(e){h.current===p&&v.current===d||(E(),h.current=p,v.current=d),_(e),j&&("function"===typeof j?j(e):"object"===typeof j&&(j.current=e))}),[p,j,d,E,_]);u.default.useEffect((function(){var e=k&&t&&l.isLocalURL(d),r="undefined"!==typeof x?x:n&&n.locale,o=s[d+"%"+p+(r?"%"+r:"")];e&&!o&&f(n,d,p,{locale:r})}),[p,d,k,x,t,n]);var I={ref:N,onClick:function(e){r.props&&"function"===typeof r.props.onClick&&r.props.onClick(e),e.defaultPrevented||function(e,r,t,n,o,a,u,c){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var r=e.currentTarget.target;return r&&"_self"!==r||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&l.isLocalURL(t))&&(e.preventDefault(),r[o?"replace":"push"](t,n,{shallow:a,locale:c,scroll:u}))}(e,n,d,p,b,m,g,x)},onMouseEnter:function(e){r.props&&"function"===typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),l.isLocalURL(d)&&f(n,d,p,{priority:!0})}};if(e.passHref||"a"===r.type&&!("href"in r.props)){var A="undefined"!==typeof x?x:n&&n.locale,M=n&&n.isLocaleDomain&&l.getDomainLocale(p,A,n&&n.locales,n&&n.domainLocales);I.href=M||l.addBasePath(l.addLocale(p,A,n&&n.defaultLocale))}return u.default.cloneElement(r,I)};r.default=d,("function"===typeof r.default||"object"===typeof r.default&&null!==r.default)&&(Object.assign(r.default,r),e.exports=r.default)},9246:function(e,r,t){"use strict";function n(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function o(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,o,a=[],u=!0,l=!1;try{for(t=t.call(e);!(u=(n=t.next()).done)&&(a.push(n.value),!r||a.length!==r);u=!0);}catch(c){l=!0,o=c}finally{try{u||null==t.return||t.return()}finally{if(l)throw o}}return a}}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return n(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return n(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(r,"__esModule",{value:!0}),r.useIntersection=function(e){var r=e.rootRef,t=e.rootMargin,n=e.disabled||!l,s=a.useRef(),f=o(a.useState(!1),2),d=f[0],p=f[1],v=o(a.useState(r?r.current:null),2),h=v[0],y=v[1],b=a.useCallback((function(e){s.current&&(s.current(),s.current=void 0),n||d||e&&e.tagName&&(s.current=function(e,r,t){var n=function(e){var r,t={root:e.root||null,margin:e.rootMargin||""},n=i.find((function(e){return e.root===t.root&&e.margin===t.margin}));n?r=c.get(n):(r=c.get(t),i.push(t));if(r)return r;var o=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var r=o.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;r&&t&&r(t)}))}),e);return c.set(t,r={id:t,observer:a,elements:o}),r}(t),o=n.id,a=n.observer,u=n.elements;return u.set(e,r),a.observe(e),function(){if(u.delete(e),a.unobserve(e),0===u.size){a.disconnect(),c.delete(o);var r=i.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));r>-1&&i.splice(r,1)}}}(e,(function(e){return e&&p(e)}),{root:h,rootMargin:t}))}),[n,h,t,d]),m=a.useCallback((function(){p(!1)}),[]);return a.useEffect((function(){if(!l&&!d){var e=u.requestIdleCallback((function(){return p(!0)}));return function(){return u.cancelIdleCallback(e)}}}),[d]),a.useEffect((function(){r&&y(r.current)}),[r]),[b,d,m]};var a=t(7294),u=t(4686),l="undefined"!==typeof IntersectionObserver;var c=new Map,i=[];("function"===typeof r.default||"object"===typeof r.default&&null!==r.default)&&(Object.assign(r.default,r),e.exports=r.default)},8547:function(e,r,t){"use strict";t.r(r),t.d(r,{__N_SSG:function(){return c}});var n=t(5893),o=t(1664),a=t.n(o),u=t(2264),l=t(347);var c=!0;r.default=function(e){var r=e.posts;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.A,{}),(0,n.jsx)(u.l,{}),(0,n.jsx)("div",{className:"overflow-x-auto w-2/3 m-auto py-20",children:(0,n.jsx)("table",{className:"table w-full bg-red-100 rounded-lg",children:(0,n.jsx)("tbody",{children:r.map((function(e){return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{className:"bg-red-500",children:e.date}),(0,n.jsx)("td",{children:(0,n.jsx)(a(),{href:"blog/"+e.id,children:(0,n.jsx)("a",{className:"block font-bold",children:e.title})})})]},e.id)}))})})})]})}},1664:function(e,r,t){e.exports=t(1551)}},function(e){e.O(0,[774,888,179],(function(){return r=677,e(e.s=r);var r}));var r=e.O();_N_E=r}]);