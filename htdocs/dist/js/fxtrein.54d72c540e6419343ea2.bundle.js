!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=143)}({143:function(t,e,n){"use strict";n.r(e);n(144);const r=13e3,i=18e3,s=5e3*Math.random()+5e3;(new class{constructor(){this.treinen=["ns-ddz-4","ns-ddz-6","ns-icm-3","ns-icm-4","ns-icr-7","ns-icr-9","flirt3-blauw","arriva","ns-virm-4","ns-virm-6","ns-sgmm-2","ns-sgmm-3","ns-flirt-3","ns-slt-6","ns-sng-4","rnet-gtw","thalys","iceje"],this.rails=document.querySelector(".rails")}get randomTrein(){return this.treinen[Math.floor(Math.random()*this.treinen.length)]}start(){setTimeout(()=>{this.stuurTrein(),setInterval(()=>{this.stuurTrein()},i)},s)}stuurTrein(){const t=document.createElement("div");t.setAttribute("class",`trein ${this.randomTrein}`),this.rails.appendChild(t),setTimeout(()=>t.remove(),r)}}).start()},144:function(t,e,n){}});
//# sourceMappingURL=fxtrein.54d72c540e6419343ea2.bundle.js.map