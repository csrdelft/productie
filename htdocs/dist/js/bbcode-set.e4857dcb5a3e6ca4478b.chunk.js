(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{14:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return domUpdate}));var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),jquery__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__),_ctx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(13),_modal__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(18),_util__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(3),_dom__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(9);function domUpdate(htmlString){if("string"!=typeof htmlString)return;if(htmlString=htmlString.trim(),"<!DOCTYPE"===htmlString.substring(0,9))throw alert("response error"),new Error(htmlString);const elements=Object(_util__WEBPACK_IMPORTED_MODULE_3__.j)(htmlString);for(const element of elements){if(!(element instanceof HTMLElement))continue;const id=element.id,parentId=element.getAttribute("parentid");if(!id&&element instanceof HTMLScriptElement)return eval(element.innerText),void Object(_modal__WEBPACK_IMPORTED_MODULE_2__.a)();const target=id?document.querySelector("#"+id):null,targetParent=parentId?document.querySelector("#"+parentId):null;target?element.classList.contains("remove")?Object(_util__WEBPACK_IMPORTED_MODULE_3__.e)(target,400):jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).replaceWith(jquery__WEBPACK_IMPORTED_MODULE_0___default()(element)):targetParent?targetParent.append(element):element instanceof HTMLScriptElement?document.head.append(element):Object(_dom__WEBPACK_IMPORTED_MODULE_4__.b)("#maalcie-tabel tbody:visible:first").append(element),Object(_ctx__WEBPACK_IMPORTED_MODULE_1__.b)(element),"modal"===id?Object(_modal__WEBPACK_IMPORTED_MODULE_2__.b)():Object(_modal__WEBPACK_IMPORTED_MODULE_2__.a)()}}},174:function(e,t,a){"use strict";a.r(t),a.d(t,"bbCodeSet",(function(){return n}));var _=a(12),o=a.n(_),i=a(14),r=a(3);const n={markupSet:[{className:"ico text_bold",name:"Dikgedrukt",key:"B",openWith:"[b]",closeWith:"[/b]"},{className:"ico text_italic",name:"Cursief",key:"I",openWith:"[i]",closeWith:"[/i]"},{className:"ico text_underline",name:"Onderstreept",key:"U",openWith:"[u]",closeWith:"[/u]"},{className:"ico text_strikethrough",name:"Doorgestreept",key:"S",openWith:"[s]",closeWith:"[/s]"},{separator:"|"},{className:"ico text_smallcaps",name:"Offtopic",key:"O",openWith:"[offtopic]",closeWith:"[/offtopic]"},{className:"ico comments",closeWith:"[/citaat]",key:"Q",name:"Citaat",openWith:"[citaat=Naam_of_lidnummer]"},{separator:"|"},{className:"ico link",closeWith:"[/url]",key:"L",name:"Link",openWith:"[url=[![Url]!]]",placeHolder:"Link tekst"},{className:"ico email_link",closeWith:"[/email]",key:"E",name:"Email",openWith:"[email=[![Email adres]!]]",placeHolder:"Link tekst"},{separator:"|"},{className:"ico photos",name:"Fotoalbum",replaceWith:e=>{let t=window.prompt("Url","");if(t){t=decodeURIComponent(t.trim());const e=t.indexOf("/fotoalbum/");if(e>0)return t=t.substring(e+10),"[fotoalbum]"+t+"[/fotoalbum]";alert("Ongeldige url!")}return e.selection}},{className:"ico photo",name:"Poster of foto uit album",replaceWith:e=>{let t=window.prompt("Url","");if(t){t=decodeURIComponent(t.trim());const e=t.indexOf("/fotoalbum/");if(e>0)return t=t.substring(e+10).replace("_resized/","").replace("_thumbs/","").replace("#",""),"[foto]"+t+"[/foto]";alert("Ongeldige url!")}return e.selection}},Object(r.l)()?{className:"ico picture",name:"Plaatje",closeWith:()=>(o.a.get("/forum/plaatjes/upload").then(e=>{Object(i.a)(e.data)}),"")}:{className:"ico picture",name:"Afbeelding",replaceWith:"[img][![Url]!][/img]"},{className:"ico film",name:"Video",replaceWith:"[video][![Url]!][/video]"},{separator:"|"},{className:"ico map",name:"Kaart",openWith:"[locatie]",closeWith:"[/locatie]",placeHolder:"C.S.R. Delft"},{className:"ico sound_mute",name:"Verklapper",openWith:"[verklapper]",closeWith:"[/verklapper]"},{className:"ico shield",closeWith:"[/prive]",name:"Privé",openWith:"[prive]",placeHolder:"Afgeschermde gegevens"},{separator:"|"},{className:"ico script_code_red",name:"Code",openWith:"[code]",closeWith:"[/code]"},{className:"ico tag",name:"Opmaakcode tonen",openWith:"[tekst]",closeWith:"[/tekst]"}],nameSpace:"CsrBB",previewParserPath:"/tools/bbcode"}},18:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return r}));var _=a(0),o=a.n(_);function i(e=""){const t=o()("#modal"),a=o()(".modal-backdrop");return(""!==t.html()||""!==e)&&(a.length&&a.remove(),""!==e&&(t.replaceWith(e),t.find("input:visible:first").trigger("focus")),t.modal("show"),o()(document.body).trigger("modalOpen"),!0)}function r(){o()("#modal").modal("hide"),o()(document.body).trigger("modalClose")}}}]);
//# sourceMappingURL=bbcode-set.e4857dcb5a3e6ca4478b.chunk.js.map