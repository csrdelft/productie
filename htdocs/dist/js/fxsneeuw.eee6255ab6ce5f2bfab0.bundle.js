!function(t){function e(e){for(var o,u,c=e[0],s=e[1],a=e[2],d=0,f=[];d<c.length;d++)u=c[d],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&f.push(r[u][0]),r[u]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o]);for(l&&l(e);f.length;)f.shift()();return i.push.apply(i,a||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,c=1;c<n.length;c++){var s=n[c];0!==r[s]&&(o=!1)}o&&(i.splice(e--,1),t=u(u.s=n[0]))}return t}var o={},r={35:0},i=[];function u(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=t,u.c=o,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)u.d(n,o,function(e){return t[e]}.bind(null,o));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/dist/";var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var a=0;a<c.length;a++)e(c[a]);var l=s;i.push([198,3]),n()}({198:function(t,e,n){"use strict";n.r(e);var o=n(11),r=n(4);let i,u,c;const s=[];let a;Object(r.f)(()=>{const t=Object(r.o)();try{!function(){const n=document.createElement("div");Object.assign(n.style,{position:"fixed",left:"0",right:"0",bottom:"0",top:"0",zIndex:"-1",background:"transparent"}),document.body.appendChild(n),i=new o.j(75,window.innerWidth/window.innerHeight,1,2e3),i.position.z=1e3,u=new o.o,t&&(u.background=new o.c(1,1,1));u.fog=new o.f(0,8e-4);const r=new o.b,l=[],d=new o.r,f=d.load("/images/sneeuw/snowflake1.png"),p=d.load("/images/sneeuw/snowflake2.png"),h=d.load("/images/sneeuw/snowflake3.png"),w=d.load("/images/sneeuw/snowflake4.png"),g=d.load("/images/sneeuw/snowflake5.png");for(let t=0;t<1e4;t++)l.push(2e3*Math.random()-1e3,2e3*Math.random()-1e3,2e3*Math.random()-1e3);r.setAttribute("position",new o.d(l,3)),a=[{color:[.55,.2,.5],sprite:p,size:20},{color:[.45,.1,.5],sprite:h,size:15},{color:[.4,.05,.5],sprite:f,size:10},{color:[.35,0,.5],sprite:g,size:8},{color:[.3,0,.5],sprite:w,size:5}];for(let e=0;e<a.length;e++){const{color:n,sprite:i,size:c}=a[e];s[e]=new o.n({size:c,map:i,blending:t?o.q:o.a,depthTest:!1,transparent:!0});const l=t?(n[0]+.5)%1:n[0];s[e].color.setHSL(l,n[1],n[2]);const d=new o.m(r,s[e]);d.rotation.x=6*Math.random(),d.rotation.y=6*Math.random(),d.rotation.z=6*Math.random(),u.add(d)}c=new o.t,c.setPixelRatio(window.devicePixelRatio),c.setSize(window.innerWidth,window.innerHeight),n.appendChild(c.domElement),window.addEventListener("resize",e,!1)}(),function t(){requestAnimationFrame(t),function(){const t=5e-5*Date.now();i.position.x+=.05*i.position.x,i.position.y+=.05*i.position.y,i.lookAt(u.position);for(let e=0;e<u.children.length;e++){const n=u.children[e];n instanceof o.m&&(n.rotation.y=t*(e<4?e+1:-(e+1)))}c.render(u,i)}()}()}catch(t){console.log(t)}function e(){i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight)}})},4:function(t,e,n){"use strict";function o(t){return t.replace(/\\/g,"/").replace(/\/[^/]*\/?$/,"")}function r(t,e=""){let n=t;const o=n.charAt(n.length-1);return"/"!==o&&"\\"!==o||(n=n.slice(0,-1)),n=n.replace(/^.*[/\\]/g,""),""!==e&&n.substr(n.length-e.length)===e&&(n=n.substr(0,n.length-e.length)),n}function i(t,e){window.location.pathname.startsWith(t)&&e()}function u(t,e){if(0===t.length)return!0;const[n,o]=t.split(" "),r=parseInt(o,10);return{"!=":(t,e)=>t!==e,"<":(t,e)=>t<e,"<=":(t,e)=>t<=e,"==":(t,e)=>t===e,">":(t,e)=>t>e,">=":(t,e)=>t>=e}[n](e,r)}function c(t){let e=0,n=Number(t);for(;n>=1024;)n/=1024,++e;return n.toFixed(1)+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][e]}function s(t){return t>0?"€"+(t/100).toFixed(2):"-€"+(t/-100).toFixed(2)}function a(t,...e){let n="";const o=[];for(let r=0;r<e.length;r++){n+=t[r];const i=e[r];i instanceof Node?(n+=`<div id="_node_html_${r}"></div>`,o.push(["_node_html_"+r,i])):n+=i}n+=t[e.length];const r=document.createElement("div");r.innerHTML=n;for(const[t,e]of o)r.querySelector("#"+t).replaceWith(e);return r.firstElementChild}function l(t){return jQuery.parseHTML(t,null,!0)}function d(t){return new Promise((e,n)=>{const o=new Image;o.src=t,o.onload=e,o.onerror=n})}async function f(t,e){const n=await fetch(t),o=await n.blob(),r=o.type.split("/").pop();return new File([o],`${e}.${r}`,{type:o.type})}function p(t){const e=t.dataset,n={};for(const t of Object.keys(e))"false"===e[t]?n[t]=!1:"true"===e[t]?n[t]=!0:isNaN(Number(e[t]))?n[t]=e[t]:n[t]=Number(e[t]);return n}function h(t){const e=document.createElement("textarea");return e.innerHTML=t,e.value}function w(t){return String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function g(t,e,n){let o;return function(...r){const i=n&&!o;clearTimeout(o),o=window.setTimeout(()=>{o=void 0,n||t.apply(this,r)},e),i&&t.apply(this,r)}}function m(t){"complete"===document.readyState||"interactive"===document.readyState?t():document.addEventListener("DOMContentLoaded",t)}function y(){const t=document.querySelector("meta[property='X-CSR-LOGGEDIN']");return!!t&&"true"===t.getAttribute("content")}function b(t){throw new Error(t)}n.d(e,"e",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"u",(function(){return i})),n.d(e,"g",(function(){return u})),n.d(e,"j",(function(){return c})),n.d(e,"i",(function(){return s})),n.d(e,"k",(function(){return a})),n.d(e,"n",(function(){return l})),n.d(e,"t",(function(){return d})),n.d(e,"b",(function(){return f})),n.d(e,"s",(function(){return p})),n.d(e,"l",(function(){return h})),n.d(e,"m",(function(){return w})),n.d(e,"r",(function(){return g})),n.d(e,"f",(function(){return m})),n.d(e,"p",(function(){return y})),n.d(e,"v",(function(){return b})),n.d(e,"q",(function(){return v})),n.d(e,"h",(function(){return x})),n.d(e,"o",(function(){return O})),n.d(e,"a",(function(){return j})),n.d(e,"w",(function(){return M})),n.d(e,"d",(function(){return S})),n.d(e,"x",(function(){return k}));const v=t=>{let e,n=!1;return(...o)=>(n||(n=!0,e=t(...o)),e)},x=async(t,e)=>{const n=`opacity ${e}ms`;t.style.transition?t.style.transition+=", "+n:t.style.transition=n,t.style.opacity="0",await(t=>new Promise(e=>setTimeout(e,t)))(e),t.remove()},O=()=>{const t=window.getComputedStyle(document.body).backgroundColor,e=t.indexOf(",")>-1?",":" ",n=t.substr(4).split(")")[0].split(e);return Number(n[0])>124&&Number(n[1])>124&&Number(n[2])>124},j=t=>{const e=()=>{t.style.height="auto",t.style.height=t.scrollHeight+"px"};t.setAttribute("style","height:"+t.scrollHeight+"px;overflow-y:hidden;"),t.addEventListener("input",e,!1),setTimeout(e)},M=t=>t.slice(0,1).toUpperCase()+t.slice(1),S=t=>t.filter(t=>t),k=t=>4==t.length}});
//# sourceMappingURL=fxsneeuw.eee6255ab6ce5f2bfab0.bundle.js.map