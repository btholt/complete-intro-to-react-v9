(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{1118:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(8314)}])},6691:function(e,t){"use strict";var n,r,o,i;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{ACTION_FAST_REFRESH:function(){return f},ACTION_NAVIGATE:function(){return s},ACTION_PREFETCH:function(){return u},ACTION_REFRESH:function(){return l},ACTION_RESTORE:function(){return a},ACTION_SERVER_ACTION:function(){return d},ACTION_SERVER_PATCH:function(){return c},PrefetchCacheEntryStatus:function(){return r},PrefetchKind:function(){return n},isThenable:function(){return h}});let l="refresh",s="navigate",a="restore",c="server-patch",u="prefetch",f="fast-refresh",d="server-action";function h(e){return e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}(o=n||(n={})).AUTO="auto",o.FULL="full",o.TEMPORARY="temporary",(i=r||(r={})).fresh="fresh",i.reusable="reusable",i.expired="expired",i.stale="stale",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4318:function(e,t,n){"use strict";function r(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return r}}),n(8364),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9577:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return b}});let r=n(8754),o=n(5893),i=r._(n(7294)),l=n(1401),s=n(2045),a=n(7420),c=n(7201),u=n(1443),f=n(9953),d=n(5320),h=n(2905),p=n(4318),x=n(953),j=n(6691),v=new Set;function g(e,t,n,r,o,i){if(i||(0,s.isLocalURL)(t)){if(!r.bypassPrefetchedCheck){let o=t+"%"+n+"%"+(void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0);if(v.has(o))return;v.add(o)}(async()=>i?e.prefetch(t,o):e.prefetch(t,n,r))().catch(e=>{})}}function m(e){return"string"==typeof e?e:(0,a.formatUrl)(e)}let b=i.default.forwardRef(function(e,t){let n,r;let{href:a,as:v,children:b,prefetch:y=null,passHref:w,replace:_,shallow:k,scroll:C,locale:P,onClick:N,onMouseEnter:O,onTouchStart:E,legacyBehavior:A=!1,...M}=e;n=b,A&&("string"==typeof n||"number"==typeof n)&&(n=(0,o.jsx)("a",{children:n}));let T=i.default.useContext(f.RouterContext),R=i.default.useContext(d.AppRouterContext),L=null!=T?T:R,S=!T,I=!1!==y,H=null===y?j.PrefetchKind.AUTO:j.PrefetchKind.FULL,{href:z,as:U}=i.default.useMemo(()=>{if(!T){let e=m(a);return{href:e,as:v?m(v):e}}let[e,t]=(0,l.resolveHref)(T,a,!0);return{href:e,as:v?(0,l.resolveHref)(T,v):t||e}},[T,a,v]),B=i.default.useRef(z),F=i.default.useRef(U);A&&(r=i.default.Children.only(n));let V=A?r&&"object"==typeof r&&r.ref:t,[Z,D,K]=(0,h.useIntersection)({rootMargin:"200px"}),G=i.default.useCallback(e=>{(F.current!==U||B.current!==z)&&(K(),F.current=U,B.current=z),Z(e),V&&("function"==typeof V?V(e):"object"==typeof V&&(V.current=e))},[U,V,z,K,Z]);i.default.useEffect(()=>{L&&D&&I&&g(L,z,U,{locale:P},{kind:H},S)},[U,z,D,P,I,null==T?void 0:T.locale,L,S,H]);let X={ref:G,onClick(e){A||"function"!=typeof N||N(e),A&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),L&&!e.defaultPrevented&&function(e,t,n,r,o,l,a,c,u){let{nodeName:f}=e.currentTarget;if("A"===f.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!u&&!(0,s.isLocalURL)(n)))return;e.preventDefault();let d=()=>{let e=null==a||a;"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:l,locale:c,scroll:e}):t[o?"replace":"push"](r||n,{scroll:e})};u?i.default.startTransition(d):d()}(e,L,z,U,_,k,C,P,S)},onMouseEnter(e){A||"function"!=typeof O||O(e),A&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),L&&(I||!S)&&g(L,z,U,{locale:P,priority:!0,bypassPrefetchedCheck:!0},{kind:H},S)},onTouchStart:function(e){A||"function"!=typeof E||E(e),A&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),L&&(I||!S)&&g(L,z,U,{locale:P,priority:!0,bypassPrefetchedCheck:!0},{kind:H},S)}};if((0,c.isAbsoluteUrl)(U))X.href=U;else if(!A||w||"a"===r.type&&!("href"in r.props)){let e=void 0!==P?P:null==T?void 0:T.locale,t=(null==T?void 0:T.isLocaleDomain)&&(0,p.getDomainLocale)(U,e,null==T?void 0:T.locales,null==T?void 0:T.domainLocales);X.href=t||(0,x.addBasePath)((0,u.addLocale)(U,e,null==T?void 0:T.defaultLocale))}return A?i.default.cloneElement(r,X):(0,o.jsx)("a",{...M,...X,children:n})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2905:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return a}});let r=n(7294),o=n(3815),i="function"==typeof IntersectionObserver,l=new Map,s=[];function a(e){let{rootRef:t,rootMargin:n,disabled:a}=e,c=a||!i,[u,f]=(0,r.useState)(!1),d=(0,r.useRef)(null),h=(0,r.useCallback)(e=>{d.current=e},[]);return(0,r.useEffect)(()=>{if(i){if(c||u)return;let e=d.current;if(e&&e.tagName)return function(e,t,n){let{id:r,observer:o,elements:i}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=s.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=l.get(r)))return t;let o=new Map;return t={id:n,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:o},s.push(n),l.set(n,t),t}(n);return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),l.delete(r);let e=s.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&s.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:n})}else if(!u){let e=(0,o.requestIdleCallback)(()=>f(!0));return()=>(0,o.cancelIdleCallback)(e)}},[c,n,t,u,d.current]),[h,u,(0,r.useCallback)(()=>{f(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5712:function(){},9672:function(){},881:function(){},4588:function(){},7381:function(){},9008:function(e,t,n){e.exports=n(7828)},1664:function(e,t,n){e.exports=n(9577)},5213:function(e,t,n){"use strict";n.d(t,{_y:function(){return i},zt:function(){return o}});let r=(0,n(7294).createContext)([{},()=>{}]),o=r.Provider;r.Consumer;let i=r},2920:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=JSON.parse('{"author":{"name":"Brian Holt","company":"Neon"},"title":"Complete Intro to React","subtitle":"v9","frontendMastersLink":"https://frontendmasters.com/courses/complete-react-v9/","social":{"linkedin":"btholt","github":"btholt","twitter":"holtbt","bluesky":"brianholt.me"},"description":"Discover the Complete Intro to React, version 9, a comprehensive course designed by Brian Holt to take you from beginner to job-ready in React development. Learn essential React concepts, tools like Vite, JSX, and ecosystem integration at your own pace, with guidance on using GitHub for collaborative learning and support. Ideal for anyone looking to enhance their React skills, this course offers practical, real-world experience from a seasoned developer.","keywords":["Brian Holt","React","Meta","Facebook","tanstack","testing","web development","javascript","frontend","front end","testing"],"csvPath":"./out/lessons.csv"}');let o={author:{name:"An Author",company:"An Author's Company"},title:"A Superb Course",subtitle:"That Teaches Nice Things",frontendMastersLink:"",description:"A nice course for nice people.",keywords:["a nice course","for people","to learn","nice things"],social:{linkedin:"btholt",github:"btholt",twitter:"holtbt"}};function i(){return Object.assign({},o,r)}},8314:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(5893),o=n(9008);n(5712),n(9672),n(7381),n(4588),n(881);var i=n(7294);function l(){return(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"32",height:"32",viewBox:"0 0 32 32",children:[(0,r.jsx)("defs",{children:(0,r.jsx)("clipPath",{id:"clip-github-social",children:(0,r.jsx)("rect",{width:"32",height:"32"})})}),(0,r.jsx)("g",{id:"github-social",clipPath:"url(#clip-github-social)",children:(0,r.jsxs)("g",{id:"Group_272","data-name":"Group 272",transform:"translate(13522.5 -6994)",children:[(0,r.jsx)("path",{id:"Subtraction_33","data-name":"Subtraction 33",d:"M-24967.5,8041a15.9,15.9,0,0,1-11.312-4.688A15.893,15.893,0,0,1-24983.5,8025a15.893,15.893,0,0,1,4.689-11.315A15.894,15.894,0,0,1-24967.5,8009a15.894,15.894,0,0,1,11.313,4.686A15.893,15.893,0,0,1-24951.5,8025a15.893,15.893,0,0,1-4.689,11.313A15.9,15.9,0,0,1-24967.5,8041Zm-3.781-4.571h0v3.918h7.895v-6.665a1.836,1.836,0,0,0-1.2-1.718c5.1-.617,7.467-2.975,7.467-7.424a7.176,7.176,0,0,0-1.637-4.728,6.74,6.74,0,0,0,.275-1.812,4.34,4.34,0,0,0-.52-2.452.574.574,0,0,0-.359-.1c-1.061,0-3.465,1.411-3.936,1.694a16.644,16.644,0,0,0-4.2-.489,16.379,16.379,0,0,0-3.969.445c-.846-.5-2.91-1.649-3.859-1.649a.566.566,0,0,0-.354.095,4.3,4.3,0,0,0-.521,2.452,6.7,6.7,0,0,0,.244,1.718,7.346,7.346,0,0,0-1.6,4.822,7.263,7.263,0,0,0,1.533,4.985c1.193,1.359,3.115,2.165,5.871,2.464a1.826,1.826,0,0,0-1.129,1.693v.5h0l-.006,0a7.121,7.121,0,0,1-2.033.363,2.608,2.608,0,0,1-.965-.158,4.438,4.438,0,0,1-1.836-1.881,2.361,2.361,0,0,0-1.248-1.091,3.472,3.472,0,0,0-1.217-.3.584.584,0,0,0-.545.224.282.282,0,0,0,.027.367,1.875,1.875,0,0,0,.447.307,4.732,4.732,0,0,1,.561.355,10.726,10.726,0,0,1,1.682,2.755c.043.092.078.163.105.217a3.876,3.876,0,0,0,2.42,1.185,6.036,6.036,0,0,0,.607.025c.875,0,1.988-.124,2-.125Z",transform:"translate(11461 -1015)",fill:"var(--footer-icons)"}),(0,r.jsxs)("g",{id:"Ellipse_670","data-name":"Ellipse 670",transform:"translate(-13522.5 6994)",fill:"none",stroke:"var(--footer-icons)",strokeWidth:"1",children:[(0,r.jsx)("circle",{cx:"16",cy:"16",r:"16",stroke:"none"}),(0,r.jsx)("circle",{cx:"16",cy:"16",r:"15.5",fill:"none"})]})]})})]})}function s(){return(0,r.jsx)("svg",{fill:"none",height:"auto",width:"32",xmlns:"http://www.w3.org/2000/svg",viewBox:"0.254 0.25 500 451.95400000000006",children:(0,r.jsx)("path",{d:"M394.033.25h76.67L303.202 191.693l197.052 260.511h-154.29L225.118 294.205 86.844 452.204H10.127l179.16-204.77L.254.25H158.46l109.234 144.417zm-26.908 406.063h42.483L135.377 43.73h-45.59z",fill:"var(--footer-icons)"})})}function a(){return(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"32",height:"32",viewBox:"0 0 32 32",children:[(0,r.jsx)("defs",{children:(0,r.jsx)("clipPath",{id:"clip-linkedin-social",children:(0,r.jsx)("rect",{width:"32",height:"32"})})}),(0,r.jsx)("g",{id:"linkedin-social",clipPath:"url(#clip-linkedin-social)",children:(0,r.jsx)("g",{id:"Group_270","data-name":"Group 270",transform:"translate(-86.349 -633.073)",children:(0,r.jsx)("path",{id:"Path_375","data-name":"Path 375",d:"M115.789,633.073a2.324,2.324,0,0,1,1.682.676,2.194,2.194,0,0,1,.695,1.627V662.8a2.131,2.131,0,0,1-.695,1.609,2.314,2.314,0,0,1-1.646.659H88.69a2.307,2.307,0,0,1-1.646-.659,2.128,2.128,0,0,1-.695-1.609V635.376a2.19,2.19,0,0,1,.695-1.627,2.322,2.322,0,0,1,1.682-.676h27.063Zm-20.224,9.672a2.561,2.561,0,0,0,0-3.584,2.658,2.658,0,0,0-1.938-.712,2.724,2.724,0,0,0-1.957.712,2.371,2.371,0,0,0-.75,1.792,2.4,2.4,0,0,0,.731,1.792,2.605,2.605,0,0,0,1.9.713h.037A2.7,2.7,0,0,0,95.565,642.745ZM96,645.434H91.213V659.88H96Zm17.3,6.144a7.007,7.007,0,0,0-1.573-4.9,5.68,5.68,0,0,0-6.839-.769,5.663,5.663,0,0,0-1.426,1.573v-2.048H98.674q.036.841,0,7.717v6.728h4.791V651.8a3.592,3.592,0,0,1,.146-1.17,2.913,2.913,0,0,1,.878-1.206,2.429,2.429,0,0,1,1.609-.549,2.108,2.108,0,0,1,1.865.914,4.265,4.265,0,0,1,.549,2.341v7.752H113.3Z",fill:"var(--footer-icons)"})})})]})}function c(){return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 -3.268 64 68.414",width:"38",height:"auto",children:(0,r.jsx)("path",{fill:"var(--footer-icons)",d:"M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z"})})}function u(e){let{twitter:t,linkedin:n,github:o,bluesky:i}=e;return(0,r.jsx)("footer",{className:"footer",children:(0,r.jsxs)("ul",{className:"socials",children:[t?(0,r.jsx)("li",{className:"social",children:(0,r.jsx)("a",{href:"https://twitter.com/".concat(t),children:(0,r.jsx)(s,{})})}):null,i?(0,r.jsx)("li",{className:"social",children:(0,r.jsx)("a",{href:"https://bsky.app/profile/".concat(i),children:(0,r.jsx)(c,{})})}):null,o?(0,r.jsx)("li",{className:"social",children:(0,r.jsx)("a",{href:"https://github.com/".concat(o),children:(0,r.jsx)(l,{})})}):null,n?(0,r.jsx)("li",{className:"social",children:(0,r.jsx)("a",{href:"https://linkedin.com/in/".concat(n),children:(0,r.jsx)(a,{})})}):null,(0,r.jsx)("li",{className:"social",children:(0,r.jsxs)("div",{className:"terms",children:[(0,r.jsx)("p",{children:"Content Licensed Under CC-BY-NC-4.0"}),(0,r.jsx)("p",{children:"Code Samples and Exercises Licensed Under Apache 2.0"}),(0,r.jsxs)("p",{children:["Site Designed by"," ",(0,r.jsx)("a",{href:"https://www.alexdanielson.com/",children:"Alex Danielson"})]})]})})]})})}var f=n(1664),d=n(5213);let h=(0,i.createContext)([{},()=>{}]),p=h.Provider;function x(e){let[{section:t,title:n,icon:o}]=(0,i.useContext)(d._y),{frontendMastersLink:l}=(0,i.useContext)(h);return(0,r.jsxs)("header",{className:"navbar",children:[(0,r.jsx)("h1",{className:"navbar-brand",children:(0,r.jsx)(f,{href:"/",children:e.title})}),(0,r.jsxs)("div",{className:"navbar-info",children:[l?(0,r.jsx)("a",{href:l,className:"cta-btn",children:"Watch on Frontend Masters"}):null,t?(0,r.jsxs)("h2",{children:[t," ",(0,r.jsx)("i",{className:"fas fa-".concat(o)})," ",n]}):null]})]})}h.Consumer;var j=n(2920);function v(e){let{children:t}=e,n=(0,j.Z)(),o=(0,i.useState)({});return(0,r.jsx)(p,{value:n,children:(0,r.jsxs)(d.zt,{value:o,children:[(0,r.jsxs)("div",{className:"remix-app",children:[(0,r.jsx)(x,{title:n.title}),(0,r.jsx)("div",{className:"content-container",children:(0,r.jsx)("div",{className:"main",children:t})}),(0,r.jsx)("script",{async:!0,defer:!0,src:"https://a.holt.courses/latest.js"}),(0,r.jsx)("noscript",{children:(0,r.jsx)("img",{src:"https://a.holt.courses/noscript.gif",alt:"",referrerPolicy:"no-referrer-when-downgrade"})}),(0,r.jsx)(u,{twitter:n.social.twitter,github:n.social.github,linkedin:n.social.linkedin,bluesky:n.social.bluesky})]}),(0,r.jsx)("script",{async:!0,defer:!0,src:"https://a.holt.courses/latest.js"}),(0,r.jsx)("noscript",{children:(0,r.jsx)("img",{src:"https://a.holt.courses/noscript.gif",alt:"",referrerPolicy:"no-referrer-when-downgrade"})})]})})}function g(e){let{children:t}=e;return(0,r.jsx)(v,{children:t})}function m(e){let{Component:t,pageProps:n}=e;return(0,r.jsxs)(g,{children:[(0,r.jsxs)(o,{children:[(0,r.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/images/apple-touch-icon.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/images/favicon-32x32.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/images/favicon-16x16.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/images/favicon-16x16.png"}),(0,r.jsx)("link",{rel:"icon",type:"image/x-icon",href:"/images/favicon.ico"})]}),(0,r.jsx)(t,{...n})]})}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(1118),t(9090)}),_N_E=e.O()}]);