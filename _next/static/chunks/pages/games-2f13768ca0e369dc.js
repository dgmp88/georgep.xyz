(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[451],{5947:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/games",function(){return s(923)}])},347:function(e,n,s){"use strict";s.d(n,{A:function(){return c}});var r=s(5893);s(7294);function c(){return(0,r.jsx)("div",{children:(0,r.jsx)("div",{className:"fixed w-screen h-screen",style:{zIndex:"-1",backgroundColor:"#555555",backgroundImage:"url('/hex.svg')",backgroundRepeat:"no-repeat",backgroundSize:"cover"}})})}},2264:function(e,n,s){"use strict";s.d(n,{l:function(){return i}});var r=s(5893),c=s(1664),t=s.n(c),a=s(2814),l=s(9398);function i(){return(0,r.jsxs)("div",{className:"absolute navbar text-gray-100",children:[(0,r.jsxs)("div",{className:"navbar-start",children:[(0,r.jsxs)("div",{className:"dropdown",children:[(0,r.jsx)("label",{tabIndex:"0",className:"btn btn-ghost lg:hidden",children:(0,r.jsx)(a.G,{icon:l.xiG})}),(0,r.jsx)("ul",{tabIndex:"0",className:"menu menu-compact dropdown-content mt-3 p-2 shadow bg-black/75 rounded-box",children:(0,r.jsxs)("ul",{className:"menu menu-horizontal p-0",children:[(0,r.jsx)("li",{children:(0,r.jsx)(t(),{href:"/blog",children:"Blog"})}),(0,r.jsx)("li",{children:(0,r.jsx)(t(),{href:"https://itsgeometry.com",children:"Backgrounds"})}),(0,r.jsx)("li",{children:(0,r.jsx)(t(),{href:"/games",children:"Games"})}),(0,r.jsx)("li",{children:(0,r.jsx)(t(),{href:"/cv.pdf",children:"CV"})})]})})]}),(0,r.jsx)(t(),{href:"/",children:(0,r.jsx)("a",{className:"btn btn-ghost normal-case text-xl",children:"George Prichard"})})]}),(0,r.jsx)("div",{className:"navbar-end hidden lg:flex",children:(0,r.jsxs)("ul",{className:"menu menu-horizontal p-0",children:[(0,r.jsx)("li",{children:(0,r.jsx)(t(),{href:"/blog",children:"Blog"})}),(0,r.jsx)("li",{children:(0,r.jsx)(t(),{href:"https://itsgeometry.com",children:"Backgrounds"})}),(0,r.jsx)("li",{children:(0,r.jsx)(t(),{href:"/games",children:"Games"})}),(0,r.jsx)("li",{children:(0,r.jsx)(t(),{href:"/cv.pdf",children:"CV"})})]})})]})}},923:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return i}});var r=s(5893),c=s(7294);function t(e){var n=e.game,s=(0,c.useState)(""),t=s[0],a=s[1],l=(0,c.useRef)();(0,c.useEffect)((function(){var e=screen.width/screen.height;l.current.style.width="".concat(600,"px");var s=600/e;s=Math.round(s),l.current.style.height="".concat(s,"px"),a("/".concat(n,"/index.html"))}));return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{ref:l,className:"m-auto",children:(0,r.jsx)("iframe",{id:"gameIframe",width:"100%",height:"100%",src:t,onLoad:function(){var e=function(){n.requestFullscreen?n.requestFullscreen():elem.webkitRequestFullscreen?n.webkitRequestFullscreen():elem.msRequestFullscreen&&n.msRequestFullscreen()},n=document.getElementById("gameIframe"),s=n.contentWindow.document;s.onclick=e,s.ontouchstart=e,document.onfullscreenerror=function(e){console.log(e)}}})})})}var a=s(347),l=s(2264);function i(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.A,{}),(0,r.jsx)(l.l,{}),(0,r.jsx)("div",{className:"w-2/3 m-auto py-20",children:(0,r.jsxs)("div",{className:"prose text-center lg:prose-lg mx-auto px-4 py-8 bg-base-100/75 rounded-lg ",children:[(0,r.jsxs)("p",{children:["These were originally made as android apps using"," ",(0,r.jsx)("a",{href:"https://libgdx.com/",children:"LibGDX"})," several years back. They're now relatively easy to compile for the browser, so it's fun to have them here. They may be a touch buggy, but the core features seem to work."]}),(0,r.jsx)("h1",{children:"Dinowar"}),(0,r.jsxs)("p",{children:["Dinosaur strategy game made with"," ",(0,r.jsx)("a",{href:"https://www.dglencross.com/",children:"David"})," and graphics by"," ",(0,r.jsx)("a",{href:"https://emile.work",children:"Emile"}),"."]}),(0,r.jsx)(t,{game:"dinowar"}),(0,r.jsx)("h1",{className:"pt-16",children:"Lunee"}),(0,r.jsx)("p",{children:"Physics based space game. Graphics by me, sorry about that."}),(0,r.jsx)(t,{game:"lunee"})]})})]})}}},function(e){e.O(0,[523,956,774,888,179],(function(){return n=5947,e(e.s=n);var n}));var n=e.O();_N_E=n}]);