(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{14:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var o=n(0),r=n.n(o),i=n(13),a=n(19),c=n(3),s=n(7);function d(e){if("string"!=typeof e)return;if("<!DOCTYPE"===(e=e.trim()).substring(0,9))throw alert("response error"),new Error(e);const t=Object(c.j)(e);for(const e of t){if(!(e instanceof HTMLElement))return;const t=e.id,n=e.getAttribute("parentid"),o=document.querySelector("#"+t),d=document.querySelector("#"+n);o?e.classList.contains("remove")?Object(c.e)(o,400):r()(o).replaceWith(r()(e)):d?d.append(e):e instanceof HTMLScriptElement?document.head.append(e):Object(s.b)("#maalcie-tabel tbody:visible:first").append(e),Object(i.b)(e),"modal"===t?Object(a.b)():Object(a.a)()}}},19:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return a}));var o=n(0),r=n.n(o);function i(e=""){const t=r()("#modal"),n=r()(".modal-backdrop");return(""!==t.html()||""!==e)&&(n.length&&n.remove(),""!==e&&(t.replaceWith(e),t.find("input:visible:first").trigger("focus")),t.modal("show"),r()(document.body).trigger("modalOpen"),!0)}function a(){r()("#modal").modal("hide"),r()(document.body).trigger("modalClose")}},238:function(e,t,n){"use strict";n.r(t);var o=n(12),r=n.n(o),i=n(183),a=n(187),c=n(51),s=n(3);t.default=e=>class extends e{constructor(e,t){super(e,t),this.root=t.root||"";const n=Object(a.a)(Object(i.a)('<span class="j-gallery-icon"><i class="fa fa-wrench"></i></span>'),{style:{color:t.backgroundColor,background:t.textColor,transform:"translateY(-8px)"},content:"Beheer"});n.addEventListener("click",()=>{b.style.display="flex"}),n.addEventListener("mouseleave",()=>{b.style.display="none"});const o=Object(i.a)('<div><i class="fa fa-redo"></i>&nbsp;Draai met de klok mee</div>',{style:{padding:"0.2em"}});o.addEventListener("click",()=>{const e=this.getUrl();r.a.post("/fotoalbum/roteren"+Object(s.b)(e),{foto:Object(s.a)(e),rotation:90}).then(c.b)});const d=Object(i.a)('<div><i class="fa fa-undo"></i>&nbsp;Draai tegen de klok in</div>',{style:{padding:"0.2em"}});d.addEventListener("click",()=>{const e=this.getUrl();r.a.post("/fotoalbum/roteren"+Object(s.b)(e),{foto:Object(s.a)(e),rotation:-90}).then(c.b)});const l=Object(i.a)('<div><i class="fa fa-folder"></i>&nbsp;Instellen als albumcover</div>',{style:{padding:"0.2em"}});l.addEventListener("click",()=>{const e=this.getUrl();r.a.post("/fotoalbum/albumcover"+Object(s.b)(e),{foto:Object(s.a)(e)}).then(e=>Object(c.a)(e.data))});const u=Object(i.a)('<div><i class="fa fa-times"></i>&nbsp;Verwijderen</div>',{style:{padding:"0.2em"}});u.addEventListener("click",()=>{if(!confirm("Foto definitief verwijderen. Weet u het zeker?"))return!1;const e=this.getUrl();r.a.post("/fotoalbum/verwijderen"+Object(s.b)(e),{foto:decodeURI(Object(s.a)(e))}).then(c.b)});const b=Object(i.a)('<div class="j-gallery-dropdown"></div>',{style:{background:t.backgroundColor,display:"none",flexDirection:"column",left:"0",position:"absolute",top:"0",whiteSpace:"nowrap"},children:[o,d,l,u]});n.appendChild(b),this.appendControlsElements([n])}goToItem(e){return this.currentItem=e,super.goToItem(e)}getUrl(){return this.currentItem.fullUrl.replace(this.root,"")}}},51:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return i}));var o=n(14);function r(e){"string"!=typeof e||'<div id="modal" '!==e.substring(0,16)?location.reload():Object(o.a)(e)}function i(e){'<div id="modal" '!==e.substring(0,16)?window.location.href=e:Object(o.a)(e)}}}]);
//# sourceMappingURL=fotoalbum-with-admin-buttons.2cf7779ac75f4661d908.chunk.js.map