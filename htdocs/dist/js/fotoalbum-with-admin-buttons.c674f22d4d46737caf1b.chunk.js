(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{14:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return domUpdate}));var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),jquery__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__),_ctx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(13),_modal__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(18),_util__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(3),_dom__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(9);function domUpdate(htmlString){if("string"!=typeof htmlString)return;if(htmlString=htmlString.trim(),"<!DOCTYPE"===htmlString.substring(0,9))throw alert("response error"),new Error(htmlString);const elements=Object(_util__WEBPACK_IMPORTED_MODULE_3__.j)(htmlString);for(const element of elements){if(!(element instanceof HTMLElement))continue;const id=element.id,parentId=element.getAttribute("parentid");if(!id&&element instanceof HTMLScriptElement)return eval(element.innerText),void Object(_modal__WEBPACK_IMPORTED_MODULE_2__.a)();const target=id?document.querySelector("#"+id):null,targetParent=parentId?document.querySelector("#"+parentId):null;target?element.classList.contains("remove")?Object(_util__WEBPACK_IMPORTED_MODULE_3__.e)(target,400):jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).replaceWith(jquery__WEBPACK_IMPORTED_MODULE_0___default()(element)):targetParent?targetParent.append(element):element instanceof HTMLScriptElement?document.head.append(element):Object(_dom__WEBPACK_IMPORTED_MODULE_4__.b)("#maalcie-tabel tbody:visible:first").append(element),Object(_ctx__WEBPACK_IMPORTED_MODULE_1__.b)(element),"modal"===id?Object(_modal__WEBPACK_IMPORTED_MODULE_2__.b)():Object(_modal__WEBPACK_IMPORTED_MODULE_2__.a)()}}},18:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return a}));var r=n(0),_=n.n(r);function o(e=""){const t=_()("#modal"),n=_()(".modal-backdrop");return(""!==t.html()||""!==e)&&(n.length&&n.remove(),""!==e&&(t.replaceWith(e),t.find("input:visible:first").trigger("focus")),t.modal("show"),_()(document.body).trigger("modalOpen"),!0)}function a(){_()("#modal").modal("hide"),_()(document.body).trigger("modalClose")}},241:function(e,t,n){"use strict";n.r(t);var r=n(12),_=n.n(r),o=n(186),a=n(190),i=n(53),c=n(3);t.default=e=>class extends e{constructor(e,t){super(e,t),this.root=t.root||"";const n=Object(a.a)(Object(o.a)('<span class="j-gallery-icon"><i class="fa fa-wrench"></i></span>'),{style:{color:t.backgroundColor,background:t.textColor,transform:"translateY(-8px)"},content:"Beheer"});n.addEventListener("click",()=>{u.style.display="flex"}),n.addEventListener("mouseleave",()=>{u.style.display="none"});const r=Object(o.a)('<div><i class="fa fa-redo"></i>&nbsp;Draai met de klok mee</div>',{style:{padding:"0.2em"}});r.addEventListener("click",()=>{const e=this.getUrl();_.a.post("/fotoalbum/roteren"+Object(c.b)(e),{foto:Object(c.a)(e),rotation:90}).then(i.b)});const l=Object(o.a)('<div><i class="fa fa-undo"></i>&nbsp;Draai tegen de klok in</div>',{style:{padding:"0.2em"}});l.addEventListener("click",()=>{const e=this.getUrl();_.a.post("/fotoalbum/roteren"+Object(c.b)(e),{foto:Object(c.a)(e),rotation:-90}).then(i.b)});const d=Object(o.a)('<div><i class="fa fa-folder"></i>&nbsp;Instellen als albumcover</div>',{style:{padding:"0.2em"}});d.addEventListener("click",()=>{const e=this.getUrl();_.a.post("/fotoalbum/albumcover"+Object(c.b)(e),{foto:Object(c.a)(e)}).then(e=>Object(i.a)(e.data))});const s=Object(o.a)('<div><i class="fa fa-times"></i>&nbsp;Verwijderen</div>',{style:{padding:"0.2em"}});s.addEventListener("click",()=>{if(!confirm("Foto definitief verwijderen. Weet u het zeker?"))return!1;const e=this.getUrl();_.a.post("/fotoalbum/verwijderen"+Object(c.b)(e),{foto:decodeURI(Object(c.a)(e))}).then(i.b)});const u=Object(o.a)('<div class="j-gallery-dropdown"></div>',{style:{background:t.backgroundColor,display:"none",flexDirection:"column",left:"0",position:"absolute",top:"0",whiteSpace:"nowrap"},children:[r,l,d,s]});n.appendChild(u),this.appendControlsElements([n])}goToItem(e){return this.currentItem=e,super.goToItem(e)}getUrl(){return this.currentItem.fullUrl.replace(this.root,"")}}},53:function(e,t,n){"use strict";n.d(t,"b",(function(){return _})),n.d(t,"a",(function(){return o}));var r=n(14);function _(e){"string"!=typeof e||'<div id="modal" '!==e.substring(0,16)?location.reload():Object(r.a)(e)}function o(e){'<div id="modal" '!==e.substring(0,16)?window.location.href=e:Object(r.a)(e)}}}]);
//# sourceMappingURL=fotoalbum-with-admin-buttons.c674f22d4d46737caf1b.chunk.js.map