(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{212:function(e,n,t){"use strict";t.r(n);var a=t(8),c=t.n(a),l=t(3);const o=async e=>{e.preventDefault();const n=e.target;let t="",a="";if(n.classList.add("loading"),n instanceof HTMLInputElement||n instanceof HTMLSelectElement){if(!n.checkValidity())return!1;t=n.dataset.href,a=n.value}else n instanceof HTMLAnchorElement&&(t=n.href);return await c.a.post(t,{waarde:a}),document.querySelectorAll(".instellingen-bericht").forEach(e=>e.classList.remove("d-none")),n.classList.remove("loading"),!1};Object(l.c)(()=>{document.querySelectorAll(".instellingKnop").forEach(e=>e.addEventListener("click",o)),document.querySelectorAll(".change-opslaan").forEach(e=>e.addEventListener("change",o))})}}]);
//# sourceMappingURL=instellingen.5e9081756593ab4bea65.chunk.js.map