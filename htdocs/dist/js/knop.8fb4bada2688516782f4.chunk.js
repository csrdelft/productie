(window.webpackJsonp=window.webpackJsonp||[]).push([[41,15],{14:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var a=n(0),o=n.n(a),r=n(13),i=n(19),s=n(3),c=n(7);function l(t){if("string"!=typeof t)return;if("<!DOCTYPE"===(t=t.trim()).substring(0,9))throw alert("response error"),new Error(t);const e=Object(s.j)(t);for(const t of e){if(!(t instanceof HTMLElement))return;const e=t.id,n=t.getAttribute("parentid"),a=document.querySelector("#"+e),l=document.querySelector("#"+n);a?t.classList.contains("remove")?Object(s.e)(a,400):o()(a).replaceWith(o()(t)):l?l.append(t):t instanceof HTMLScriptElement?document.head.append(t):Object(c.b)("#maalcie-tabel tbody:visible:first").append(t),Object(r.b)(t),"modal"===e?Object(i.b)():Object(i.a)()}}},170:function(t,e,n){"use strict";n.r(e),n.d(e,"knopPost",(function(){return g})),n.d(e,"initKnopPost",(function(){return m})),n.d(e,"initKnopGet",(function(){return b})),n.d(e,"initKnopVergroot",(function(){return h})),n.d(e,"knopVergroot",(function(){return v})),n.d(e,"initRadioButtons",(function(){return w}));var a=n(0),o=n.n(a),r=n(23),i=n(20),s=n(14),c=n(34),l=n(19),d=n(51),u=n(7),f=n(3);function p(t,e){if(!(t instanceof HTMLElement))throw new Error("Knop is geen HTMLElement");if(t.classList.contains("confirm")&&!confirm(t.title+".\n\nWeet u het zeker?"))return Object(l.a)(),!1;let n=t,a=s.a,o=t.getAttribute("data");if(t.classList.contains("popup")&&(n=null),t.classList.contains("prompt")){if(!o)throw new Error("Prompt knop heeft geen data");const[t,e]=o.split("="),n=prompt(t,e);if(!n)return!1;o=encodeURIComponent(o[0])+"="+encodeURIComponent(n)}if(t.classList.contains("addfav")&&(o={tekst:document.title.replace("C.S.R. Delft - ",""),link:window.location.href}),t.classList.contains("DataTableRowKnop")){const e=Object(u.a)(t,"table").id;o={DataTableId:e,DataTableSelection:Object(u.a)(t,"tr").dataset.uuid},a=t=>{Object(r.isDataTableResponse)(t)?(Object(r.fnUpdateDataTable)("#"+e,t),t&&t.modal?Object(s.a)(t.modal):Object(l.a)()):"string"==typeof t&&Object(s.a)(t)}}if(t.classList.contains("DataTableResponse")){let e=t.dataset.tableid;if(!e||!document.getElementById(e)){const n=t.closest("form");if(!n)throw new Error("Geen form gevonden");if(e=n.dataset.tableid,!e||!document.getElementById(e))throw new Error("DataTable not found")}o={DataTableId:e,DataTableSelection:Object(r.fnGetSelection)("#"+e)},a=t=>{if(Object(r.isDataTableResponse)(t))Object(r.fnUpdateDataTable)("#"+e,t),t.modal?Object(s.a)(t.modal):Object(l.a)();else{if("string"!=typeof t)throw new Error("Niets met deze response: "+t);Object(s.a)(t)}},t.classList.contains("SingleRow")||(n=null)}t.classList.contains("ReloadPage")?a=d.b:t.classList.contains("redirect")&&(a=d.a);const c=t.getAttribute("href");if(!c)throw new Error("Knop heeft geen href");Object(i.a)(e,c,o,n,a,f.q)}function g(t,e){e.preventDefault();const n=e.target;return o()(n).hasClass("range")?("INPUT"===n.tagName.toUpperCase()?Object(c.d)(e):Object(c.f)(e),!1):(p(t,"POST"),!1)}const m=t=>{t.classList.add("loaded"),t.addEventListener("click",e=>g(t,e))},b=t=>{t.classList.add("loaded"),t.addEventListener("click",e=>(e.preventDefault(),p(t,"GET"),!1))},h=t=>t.addEventListener("click",e=>v(e,t));function v(t,e){const n=e;if(!(n instanceof HTMLElement))throw new Error("Knop vergroot klik heeft geen target");const{vergroot:a,vergrootOud:r}=n.dataset;if(!a)throw new Error("Knop vergroot heeft geen data-vergroot");const i=n.querySelector("span.fa");if(!i)throw new Error("knopVergroot heeft geen icon");r?(o()(a).animate({height:r},600),delete n.dataset.vergrootOud,i.classList.replace("fa-compress","fa-expand"),n.title="Uitklappen"):(n.title="Inklappen",i.classList.replace("fa-expand","fa-compress"),n.dataset.vergrootOud=String(o()(a).height()),o()(a).animate({height:o()(a).prop("scrollHeight")+1},600))}const w=t=>{for(const e of Object(u.c)("a.btn",t))e.addEventListener("click",n=>{for(const e of Object(u.c)(".active",t))e.classList.remove("active");e.classList.add("active")})}},19:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i}));var a=n(0),o=n.n(a);function r(t=""){const e=o()("#modal"),n=o()(".modal-backdrop");return(""!==e.html()||""!==t)&&(n.length&&n.remove(),""!==t&&(e.replaceWith(t),e.find("input:visible:first").trigger("focus")),e.modal("show"),o()(document.body).trigger("modalOpen"),!0)}function i(){o()("#modal").modal("hide"),o()(document.body).trigger("modalClose")}},20:function(t,e,n){"use strict";n.d(e,"a",(function(){return l})),n.d(e,"b",(function(){return d}));var a=n(0),o=n.n(a),r=n(19),i=n(12),s=n.n(i),c=n(7);function l(t,e,n,a,i,l,d){if(a)if(a.classList.contains("noanim"))if(a.classList.contains("InlineForm"))try{Object.assign(Object(c.b)(".FormElement:first",a).style,{backgroundImage:'url("/images/loading-fb.gif")',backgroundPosition:"center right",backgroundRepeat:"no-repeat"})}catch(t){}else a.classList.add("loading");else o()(a).replaceWith(`<img alt="Laden" id="${a.id}" title="${e}" src="/images/loading-arrows.gif" />`),a=Object(c.b)(`img[title="${e}"]`);s()({method:t,data:n,url:e}).then(t=>{a&&(o()(a).hasClass("noanim")?o()(a).hasClass("InlineForm")&&o()(a).find(".FormElement:first").css({"background-image":"","background-position":"","background-repeat":""}):o()(a).hide(),a.classList.remove("loading")),i(t.data)}).catch(t=>{a?o()(a).replaceWith('<img alt="Mislukt" title="'+t.message+'" src="/plaetjes/famfamfam/cancel.png" />'):Object(r.a)(),l&&(t.message.startsWith("<!DOC")&&l("Er ging iets fout, code is: "+t.code),l(t.message))}).then(()=>{d&&d()})}function d(t,e){return o()(e+" .aanmeldbtn").addClass("loading"),o.a.ajax({cache:!1,data:"",type:"GET",url:t}).done(t=>{o()(e).replaceWith(t)}).fail((t,n,a)=>{throw o()(e+" .aanmeldbtn").replaceWith(o()(`<div class="alert alert-danger"><strong>Actie mislukt!</strong> ${a}</div>`)),new Error(t.responseText)}),!0}},23:function(t,e,n){"use strict";n.r(e),n.d(e,"isDataTableResponse",(function(){return c})),n.d(e,"initDataTable",(function(){return l})),n.d(e,"initOfflineDataTable",(function(){return d})),n.d(e,"fnUpdateDataTable",(function(){return u})),n.d(e,"fnGetSelection",(function(){return f})),n.d(e,"getApiFromSettings",(function(){return p})),n.d(e,"fnGetLastUpdate",(function(){return g})),n.d(e,"fnSetLastUpdate",(function(){return m})),n.d(e,"fnAjaxUpdateCallback",(function(){return b})),n.d(e,"replacePlaceholders",(function(){return h}));var a=n(0),o=n.n(a),r=n(13),i=n(3),s=n(77);function c(t){return"object"==typeof t&&"lastUpdate"in t&&"autoUpdate"in t&&"data"in t}async function l(t){await Promise.all([n.e(4),n.e(11)]).then(n.bind(null,89));const e=o()(t),a=e.data("settings"),i=e.data("search");a.ajax&&(a.ajax.data.lastUpdate=g(e),a.ajax.dataSrc=b(e)),a.columns.forEach(t=>t.render=s.a[t.render]);const c=e.DataTable(a);e.dataTable().api().search(i),c.on("page",()=>c.rows({selected:!0}).deselect()),c.on("childRow.dt",(t,e)=>Object(r.b)(e.container.get(0)))}async function d(t){await Promise.all([n.e(4),n.e(11)]).then(n.bind(null,89)),o()(t).DataTable(Object(i.n)(t))}function u(t,e){const n=o()(t).DataTable();e.data.forEach(t=>{const e=o()('tr[data-uuid="'+t.UUID+'"]');1===e.length?"remove"in t?n.row(e).remove():(n.row(e).data(t),Object(r.b)(e.get(0))):0===e.length?n.row.add(t):alert(e.length)}),n.draw(!1)}function f(t){const e=[];return o()(t+" tbody tr.selected").each((function(){const t=o()(this).attr("data-uuid");if(!t)throw new Error("Tablerow heeft geen uuid");e.push(t)})),e}function p(t){return new o.a.fn.dataTable.Api(t)}const g=t=>()=>Number(t.data("lastupdate")),m=t=>e=>t.data("lastupdate",e),b=t=>e=>{m(t)(e.lastUpdate);const n=t.DataTable();if(e.autoUpdate){const a=parseInt(e.autoUpdate,10);!isNaN(a)&&a<6e5&&setTimeout(()=>{o.a.post(n.ajax.url(),{lastUpdate:g(t)},e=>{const n=t.attr("id");if(!n)throw new Error("Table heeft geen id");u(n,e),b(t)(e)})},a)}return function(t){const e=t.parent();if(e.hasClass("dataTables_scrollBody")){const t=e.scrollTop(),n=e.innerHeight();if(!t||!n)throw new Error("$scroll heeft geen top of height");t+n>=e[0].scrollHeight-20&&window.setTimeout(()=>{e.animate({scrollTop:e[0].scrollHeight},800)},200)}}(t),e.data};function h(t,e){const n=/:(\w+)/g.exec(t);if(!n)return t;for(let a=1;a<n.length;a++)t=t.replace(":"+n[a],e[n[a]]);return t}},34:function(t,e,n){"use strict";n.d(e,"f",(function(){return d})),n.d(e,"a",(function(){return u})),n.d(e,"h",(function(){return f})),n.d(e,"g",(function(){return m})),n.d(e,"e",(function(){return b})),n.d(e,"b",(function(){return h})),n.d(e,"c",(function(){return v})),n.d(e,"d",(function(){return j}));var a=n(0),o=n.n(a),r=n(35),i=n(20),s=n(14),c=n(7),l=n(3);function d(t){let e=t.target;if("IMG"===e.tagName.toUpperCase()&&(e=Object(c.a)(e)),o()(e).find("input").prop("checked",!0),o()(e).hasClass("confirm")&&!confirm(o()(e).attr("title")+".\n\nWeet u het zeker?"))return!1;o()('input[name="'+o()(e).find("input:first").attr("name")+'"]:visible').each((function(){if(o()(this).prop("checked")){const t=o()(e).parent().attr("href"),n=o()(e).parent().attr("post");if(!t||!n)throw new Error("Element heeft geen href of post");Object(i.a)("POST",t,n,e.parentElement,s.a,l.q)}}))}function u(){const t=o()("#suggesties-tabel");t.find("tr:visible:odd").css("background-color","#FAFAFA"),t.find("tr:visible:even").css("background-color","#EBEBEB")}function f(t,e){o()("#suggesties-tabel ."+t).each((function(){let n=0;void 0!==e?e?o()(this).removeClass(t+"verborgen"):o()(this).addClass(t+"verborgen"):o()(this).toggleClass(t+"verborgen"),o()(this).hasClass("geenvoorkeurverborgen")&&n++,o()(this).hasClass("recentverborgen")&&n++,o()(this).hasClass("jongsteverborgen")&&n++,o()(this).hasClass("oudereverborgen")&&n++,n>0?o()(this).hide():o()(this).show()})),u()}function p(t,e){"taak-datum-head-"+t===o()("#maalcie-tabel tr:visible").eq(e).attr("id")&&o()("#taak-datum-head-first").toggleClass("verborgen")}function g(){o()("tr.taak-datum-summary:visible:odd th").css("background-color","#FAFAFA"),o()("tr.taak-datum-summary:visible:even th").css("background-color","#f5f5f5")}function m(t){p(t,0),o()(".taak-datum-"+t).toggleClass("verborgen"),p(t,1),g()}function b(){o()("#taak-datum-head-first").removeClass("verborgen"),o()("tr.taak-datum-oud").removeClass("verborgen"),g()}function h(t){let e=t.target;"IMG"===e.tagName.toUpperCase()&&(e=Object(c.a)(e)),r.a.el&&r.a.el.id!==e.id&&t.preventDefault()}function v(t){t.preventDefault();let e=t.target;"IMG"===e.tagName.toUpperCase()&&(e=Object(c.a)(e));const n=r.a.el;if(!n||!confirm("Toegekende corveepunten worden meegeruild!\n\nDoorgaan met ruilen?"))return;let a=n.getAttribute("uid");a||(a="");const o=e.getAttribute("href");if(!o)throw new Error("Element heeft geen href");Object(i.a)("POST",o,"uid="+a,e,s.a,l.q),a=e.getAttribute("uid"),a||(a=""),Object(i.a)("POST",o,"uid="+a,n,s.a,l.q)}let w;function j(t){const e=t.target;if(!e)throw new Error("Er is geen target");let n=!1;o()("#maalcie-tabel").find('tbody tr td a input[name="'+o()(e).attr("name")+'"]:visible').each((function(){const e=o()(this).attr("id");if(e===w&&(n=!n),e===t.target.id){n=!n;const t=o()(this).prop("checked");setTimeout(()=>{o()("#"+e).prop("checked",t)},50)}else t.shiftKey&&n&&o()(this).prop("checked",!0)})),w=t.target.id}},35:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n(12),o=n.n(a);const r={el:null};let i,s,c;function l(){return document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft}function d(){return document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop}function u(t){return t.pageX?t.pageX:t.clientX?t.clientX+l():0}function f(t){return t.pageY?t.pageY:t.clientY?t.clientY+d():0}function p(t){if(!r.el)return;const e=r.el,n=u(t),a=f(t);i=e.classList.contains("savepos");const o=e.scrollTop,p=e.scrollLeft;if(e.classList.contains("dragvertical"))e.scrollTop=o+c-a;else if(e.classList.contains("draghorizontal"))e.scrollLeft=p+s-n;else{const t={left:e.offsetLeft,top:e.offsetTop};e.style.left=t.left-l()+n-s+"px",e.style.top=t.top-d()+a-c+"px"}s=n,c=a}window.addEventListener("mousedown",(function(t){const e=t.target;if(e instanceof HTMLElement){const n=e.tagName.toUpperCase(),a=getComputedStyle(e).overflow;if("DIV"!==n&&"H1"!==n||"auto"===a||"scroll"===a)return;r.el=e,void 0!==r.el&&r.el.classList.contains("dragobject")||(r.el=e.closest(".dragobject")),void 0!==r.el?(s=u(t),c=f(t),window.addEventListener("mousemove",p,!0)):r.el=void 0}i=!1}),!1),window.addEventListener("mouseup",(function(){if(r.el){if(window.removeEventListener("mousemove",p,!0),i){const t=r.el;let e,n;if(t.classList.contains("dragvertical")||t.classList.contains("draghorizontal"))e=t.scrollTop,n=t.scrollLeft;else{const a={top:t.offsetTop,left:t.offsetLeft};e=a.top-d(),n=a.left-l()}o.a.post("/tools/dragobject",{coords:{left:n,top:e},id:t.id}),i=!1}r.el=void 0}}),!1)},51:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return r}));var a=n(14);function o(t){"string"!=typeof t||'<div id="modal" '!==t.substring(0,16)?location.reload():Object(a.a)(t)}function r(t){'<div id="modal" '!==t.substring(0,16)?window.location.href=t:Object(a.a)(t)}},77:function(t,e,n){"use strict";var a=n(28),o=n.n(a),r=n(3),i=n(23);e.a={default(t,e){if(null===t||"object"!=typeof t)return t;switch(e){case"sort":return t.sort;case"export":return t.export;default:return t.display}},bedrag:t=>Object(r.f)(t),check:t=>'<span class="ico '+(t?"tick":"cross")+'"></span>',aanmeldFilter:t=>t?`<span class="ico group_key" title="Aanmeld filter actief: '${t}'"></span>`:"",aanmeldingen:(t,e,n)=>n.aantal_aanmeldingen+" ("+n.aanmeld_limiet+")",totaalPrijs:(t,e,n)=>Object(r.f)(n.aantal_aanmeldingen*parseInt(n.prijs,10)),datetime:t=>Number(t)==t?o()(1e3*t).format("YYYY-MM-DD HH:mm"):t?"<time"===t.substr(0,5)?t:o()(t).format("YYYY-MM-DD HH:mm"):"",timeago(t,e,n,a){const o=Object(i.getApiFromSettings)(a.settings).cell(a.row,a.col).node().firstChild;switch(e){case"sort":case"export":return o.dateTime;default:return t}},filesize(t,e){switch(e){case"sort":return Number(t);default:return Object(r.g)(t)}}}},91:function(t,e,n){var a={"./nl":76,"./nl.js":76};function o(t){var e=r(t);return n(e)}function r(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}o.keys=function(){return Object.keys(a)},o.resolve=r,t.exports=o,o.id=91}}]);
//# sourceMappingURL=knop.8fb4bada2688516782f4.chunk.js.map