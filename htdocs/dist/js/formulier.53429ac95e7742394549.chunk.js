(window.webpackJsonp=window.webpackJsonp||[]).push([[25,15],{14:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var a=n(0),r=n.n(a),i=n(13),o=n(19),s=n(3),c=n(7);function l(t){if("string"!=typeof t)return;if("<!DOCTYPE"===(t=t.trim()).substring(0,9))throw alert("response error"),new Error(t);const e=Object(s.j)(t);for(const t of e){if(!(t instanceof HTMLElement))return;const e=t.id,n=t.getAttribute("parentid"),a=document.querySelector("#"+e),l=document.querySelector("#"+n);a?t.classList.contains("remove")?Object(s.e)(a,400):r()(a).replaceWith(r()(t)):l?l.append(t):t instanceof HTMLScriptElement?document.head.append(t):Object(c.b)("#maalcie-tabel tbody:visible:first").append(t),Object(i.b)(t),"modal"===e?Object(o.b)():Object(o.a)()}}},19:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return o}));var a=n(0),r=n.n(a);function i(t=""){const e=r()("#modal"),n=r()(".modal-backdrop");return(""!==e.html()||""!==t)&&(n.length&&n.remove(),""!==t&&(e.replaceWith(t),e.find("input:visible:first").trigger("focus")),e.modal("show"),r()(document.body).trigger("modalOpen"),!0)}function o(){r()("#modal").modal("hide"),r()(document.body).trigger("modalClose")}},20:function(t,e,n){"use strict";n.d(e,"a",(function(){return l})),n.d(e,"b",(function(){return u}));var a=n(0),r=n.n(a),i=n(19),o=n(12),s=n.n(o),c=n(7);function l(t,e,n,a,o,l,u){if(a)if(a.classList.contains("noanim"))if(a.classList.contains("InlineForm"))try{Object.assign(Object(c.b)(".FormElement:first",a).style,{backgroundImage:'url("/images/loading-fb.gif")',backgroundPosition:"center right",backgroundRepeat:"no-repeat"})}catch(t){}else a.classList.add("loading");else r()(a).replaceWith(`<img alt="Laden" id="${a.id}" title="${e}" src="/images/loading-arrows.gif" />`),a=Object(c.b)(`img[title="${e}"]`);s()({method:t,data:n,url:e}).then(t=>{a&&(r()(a).hasClass("noanim")?r()(a).hasClass("InlineForm")&&r()(a).find(".FormElement:first").css({"background-image":"","background-position":"","background-repeat":""}):r()(a).hide(),a.classList.remove("loading")),o(t.data)}).catch(t=>{a?r()(a).replaceWith('<img alt="Mislukt" title="'+t.message+'" src="/plaetjes/famfamfam/cancel.png" />'):Object(i.a)(),l&&(t.message.startsWith("<!DOC")&&l("Er ging iets fout, code is: "+t.code),l(t.message))}).then(()=>{u&&u()})}function u(t,e){return r()(e+" .aanmeldbtn").addClass("loading"),r.a.ajax({cache:!1,data:"",type:"GET",url:t}).done(t=>{r()(e).replaceWith(t)}).fail((t,n,a)=>{throw r()(e+" .aanmeldbtn").replaceWith(r()(`<div class="alert alert-danger"><strong>Actie mislukt!</strong> ${a}</div>`)),new Error(t.responseText)}),!0}},23:function(t,e,n){"use strict";n.r(e),n.d(e,"isDataTableResponse",(function(){return c})),n.d(e,"initDataTable",(function(){return l})),n.d(e,"initOfflineDataTable",(function(){return u})),n.d(e,"fnUpdateDataTable",(function(){return f})),n.d(e,"fnGetSelection",(function(){return d})),n.d(e,"getApiFromSettings",(function(){return m})),n.d(e,"fnGetLastUpdate",(function(){return g})),n.d(e,"fnSetLastUpdate",(function(){return b})),n.d(e,"fnAjaxUpdateCallback",(function(){return p})),n.d(e,"replacePlaceholders",(function(){return h}));var a=n(0),r=n.n(a),i=n(13),o=n(3),s=n(77);function c(t){return"object"==typeof t&&"lastUpdate"in t&&"autoUpdate"in t&&"data"in t}async function l(t){await Promise.all([n.e(4),n.e(11)]).then(n.bind(null,89));const e=r()(t),a=e.data("settings"),o=e.data("search");a.ajax&&(a.ajax.data.lastUpdate=g(e),a.ajax.dataSrc=p(e)),a.columns.forEach(t=>t.render=s.a[t.render]);const c=e.DataTable(a);e.dataTable().api().search(o),c.on("page",()=>c.rows({selected:!0}).deselect()),c.on("childRow.dt",(t,e)=>Object(i.b)(e.container.get(0)))}async function u(t){await Promise.all([n.e(4),n.e(11)]).then(n.bind(null,89)),r()(t).DataTable(Object(o.n)(t))}function f(t,e){const n=r()(t).DataTable();e.data.forEach(t=>{const e=r()('tr[data-uuid="'+t.UUID+'"]');1===e.length?"remove"in t?n.row(e).remove():(n.row(e).data(t),Object(i.b)(e.get(0))):0===e.length?n.row.add(t):alert(e.length)}),n.draw(!1)}function d(t){const e=[];return r()(t+" tbody tr.selected").each((function(){const t=r()(this).attr("data-uuid");if(!t)throw new Error("Tablerow heeft geen uuid");e.push(t)})),e}function m(t){return new r.a.fn.dataTable.Api(t)}const g=t=>()=>Number(t.data("lastupdate")),b=t=>e=>t.data("lastupdate",e),p=t=>e=>{b(t)(e.lastUpdate);const n=t.DataTable();if(e.autoUpdate){const a=parseInt(e.autoUpdate,10);!isNaN(a)&&a<6e5&&setTimeout(()=>{r.a.post(n.ajax.url(),{lastUpdate:g(t)},e=>{const n=t.attr("id");if(!n)throw new Error("Table heeft geen id");f(n,e),p(t)(e)})},a)}return function(t){const e=t.parent();if(e.hasClass("dataTables_scrollBody")){const t=e.scrollTop(),n=e.innerHeight();if(!t||!n)throw new Error("$scroll heeft geen top of height");t+n>=e[0].scrollHeight-20&&window.setTimeout(()=>{e.animate({scrollTop:e[0].scrollHeight},800)},200)}}(t),e.data};function h(t,e){const n=/:(\w+)/g.exec(t);if(!n)return t;for(let a=1;a<n.length;a++)t=t.replace(":"+n[a],e[n[a]]);return t}},32:function(t,e,n){"use strict";n.r(e),n.d(e,"formIsChanged",(function(){return g})),n.d(e,"formInlineToggle",(function(){return b})),n.d(e,"formToggle",(function(){return p})),n.d(e,"formReset",(function(){return h})),n.d(e,"formSubmit",(function(){return w})),n.d(e,"formCancel",(function(){return j})),n.d(e,"insertPlaatje",(function(){return O})),n.d(e,"initSterrenField",(function(){return v}));var a=n(12),r=n.n(a),i=n(0),o=n.n(i),s=n(23),c=n(20),l=n(14),u=n(19),f=n(51),d=n(7),m=n(3);function g(t){let e=!1;return o()(t).find(".FormElement").not(".tt-hint").each((function(){const t=o()(this);if(t.is("input:radio")){if(t.is(":checked")&&t.attr("origvalue")!==t.val())return e=!0,!1}else if(t.is("input:checkbox")){if(t.is(":checked")!==("1"===t.attr("origvalue")))return e=!0,!1}else if(t.val()!==t.attr("origvalue"))return e=!0,!1})),e}function b(t){const e=o()(t);e.prev(".InlineFormToggle").toggle(),e.toggle(),e.children(":first").trigger("focus")}function p(t,e){return e.preventDefault(),b(Object(d.b)("form",Object(d.a)(t))),!1}function h(t,e){const n=t.target;if(!(n&&n instanceof HTMLElement))throw new Error("formReset: geen EventTarget");if(e||(e=n.closest("form"),t.preventDefault()),!e)throw new Error("Geen form gevonden in formReset");return n.classList.contains("confirm")&&!confirm(n.title+".\n\nWeet u het zeker?")||Object(d.c)(".FormElement",e).forEach((function(t){const e=t.getAttribute("origvalue");e&&(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement)&&(t.value=e)})),!1}function w(t){const e=t.target;if(e.classList.contains("confirm")){let n=e.title;if(n?n+=".\n\n":n="Weet u het zeker?",!confirm(n))return t.preventDefault(),!1}const n=e.closest("form");if(!n||!n.classList.contains("Formulier"))return!1;if(n.classList.contains("PreventUnchanged")&&!g(n))return t.preventDefault(),alert("Geen wijzigingen"),!1;const a=e.getAttribute("href");if(a&&"#"!=a&&n.setAttribute("action",a),n.classList.contains("ModalForm")||n.classList.contains("InlineForm")){t.preventDefault();const e=new FormData(n);let a=l.a,r=null;if(n.classList.contains("InlineForm")){r=n;const t=n.id;t&&e.append("InlineFormId",t),o()(n).data("submitCallback")&&(a=o()(n).data("submitCallback"))}if(n.classList.contains("ModalForm")&&(a=t=>{"string"==typeof t?Object(l.a)(t):Object(u.a)()}),n.classList.contains("DataTableResponse")){const t=n.dataset.tableid;if(!t||!document.getElementById(t))throw new Error("DataTable not found");e.append("DataTableId",t);const i=Object(s.fnGetSelection)("#"+t);o.a.each(i,(t,n)=>{e.append("DataTableSelection[]",n)}),a=e=>{if(Object(s.isDataTableResponse)(e))Object(s.fnUpdateDataTable)("#"+t,e),e.modal?Object(l.a)(e.modal):Object(u.a)();else{if("string"!=typeof e)throw new Error("onbekende response"+e);Object(l.a)(e)}},n.classList.contains("noanim")||(r=null)}n.classList.contains("ReloadPage")?a=f.b:n.classList.contains("redirect")&&(a=f.a);const i=n.getAttribute("action");if(!i)throw new Error("Form heeft geen action");return Object(c.a)("POST",i,e,r,a,m.q,()=>{n.classList.contains("SubmitReset")&&h(t,n)}),!1}return o()(n).off("submit"),o()(n).trigger("submit"),!0}function j(t){const e=t.target;if(!(e&&e instanceof HTMLElement))throw new Error("formCancel: Geen EventTarget");if(e.classList.contains("confirm")&&!confirm(e.title+".\n\nWeet u het zeker?"))return t.preventDefault(),!1;const n=e.closest("form");if(!n)throw new Error("Geen form in formCancel");if(n.classList.contains("InlineForm"))return t.preventDefault(),b(n),!1;if(n.classList.contains("ModalForm")){t.preventDefault();const a=e.getAttribute("href");return a&&r.a.get(a),g(n)&&!confirm("Sluiten zonder wijzigingen op te slaan?")||Object(u.a)(),!1}return!0}function O(t){o.a.markItUp({replaceWith:"[plaatje]"+t+"[/plaatje]"})}function v(t){o()(t).raty(Object.assign(Object.assign({},JSON.parse(t.dataset.config)),{path:"/images/raty/",cancelHint:"Wis beoordeling",cancelPlace:"right",noRatedMsg:"",click:function(t){console.log(t),o()(this).raty("score",t),o()(this).closest("form").submit()}}))}},51:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i}));var a=n(14);function r(t){"string"!=typeof t||'<div id="modal" '!==t.substring(0,16)?location.reload():Object(a.a)(t)}function i(t){'<div id="modal" '!==t.substring(0,16)?window.location.href=t:Object(a.a)(t)}},77:function(t,e,n){"use strict";var a=n(28),r=n.n(a),i=n(3),o=n(23);e.a={default(t,e){if(null===t||"object"!=typeof t)return t;switch(e){case"sort":return t.sort;case"export":return t.export;default:return t.display}},bedrag:t=>Object(i.f)(t),check:t=>'<span class="ico '+(t?"tick":"cross")+'"></span>',aanmeldFilter:t=>t?`<span class="ico group_key" title="Aanmeld filter actief: '${t}'"></span>`:"",aanmeldingen:(t,e,n)=>n.aantal_aanmeldingen+" ("+n.aanmeld_limiet+")",totaalPrijs:(t,e,n)=>Object(i.f)(n.aantal_aanmeldingen*parseInt(n.prijs,10)),datetime:t=>Number(t)==t?r()(1e3*t).format("YYYY-MM-DD HH:mm"):t?"<time"===t.substr(0,5)?t:r()(t).format("YYYY-MM-DD HH:mm"):"",timeago(t,e,n,a){const r=Object(o.getApiFromSettings)(a.settings).cell(a.row,a.col).node().firstChild;switch(e){case"sort":case"export":return r.dateTime;default:return t}},filesize(t,e){switch(e){case"sort":return Number(t);default:return Object(i.g)(t)}}}},91:function(t,e,n){var a={"./nl":76,"./nl.js":76};function r(t){var e=i(t);return n(e)}function i(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}r.keys=function(){return Object.keys(a)},r.resolve=i,t.exports=r,r.id=91}}]);
//# sourceMappingURL=formulier.53429ac95e7742394549.chunk.js.map