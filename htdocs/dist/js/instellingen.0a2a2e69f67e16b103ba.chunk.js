(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{312:function(e,n,t){"use strict";t.r(n);var l=t(12),a=t.n(l),c=t(3);const o=async e=>{e.preventDefault();const n=e.target;let t=null,l=null;if(n.classList.add("loading"),n instanceof HTMLInputElement||n instanceof HTMLSelectElement){if(!n.checkValidity())return!1;t=n.dataset.href,l=n.value}else n instanceof HTMLAnchorElement&&(t=n.href);if(!t)throw new Error("Geen url gevonden voor instelling");return await a.a.post(t,{waarde:l}),document.querySelectorAll(".instellingen-bericht").forEach(e=>e.classList.remove("d-none")),n.classList.remove("loading"),!1};Object(c.c)(()=>{document.querySelectorAll(".instellingKnop").forEach(e=>e.addEventListener("click",o)),document.querySelectorAll(".change-opslaan").forEach(e=>e.addEventListener("change",o))})}}]);
//# sourceMappingURL=instellingen.0a2a2e69f67e16b103ba.chunk.js.map