(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{238:function(e,t,i){"use strict";i.r(t),i.d(t,"loadBbImage",(function(){return a}));var r=i(4);const a=e=>{const t=r.j`<img
													class="bb-img"
													alt="${e.getAttribute("title")}"
													style="${e.getAttribute("style")}"
													src="${e.getAttribute("src")}"/>`,i=e.getAttribute("src");if(!i)throw new Error("Bb image heeft geen src");Object(r.s)(i,()=>{var a,l;const n=i.indexOf("/plaetjes/fotoalbum/")>=0,s=null===(l=null===(a=e.parentElement)||void 0===a?void 0:a.parentElement)||void 0===l?void 0:l.classList.contains("bb-video-preview"),o=0!==$(e).closest("a").length,c=e.parentElement;if(!c)throw new Error("BBimage heeft geen parent.");if(n||s||o)c.replaceChild(t,e);else{const i=null==e.getAttribute("bb-href")?e.getAttribute("src"):e.getAttribute("bb-href"),a=r.j`<a class="lightbox-link" href="${i}" data-lightbox="page-lightbox"></a>`;a.appendChild(t),c.replaceChild(a,e)}},()=>{e.replaceWith(r.j`<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-triangle"></i> Afbeelding kan niet geladen worden.</div>`)})}}}]);
//# sourceMappingURL=bbcode.be2f05c3dc9c21cdfb99.chunk.js.map