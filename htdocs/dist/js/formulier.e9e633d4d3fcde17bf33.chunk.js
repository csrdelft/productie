(window.webpackJsonp=window.webpackJsonp||[]).push([[24,15],{13:function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var n=a(0),r=a.n(n),i=a(11),o=a(18),s=a(4);function l(t){if("string"!=typeof t)return;"<!DOCTYPE"===(t=r.a.trim(t)).substring(0,9)&&(alert("response error"),document.write(t));const e=Object(s.i)(t);r()(e).each((function(t,e){if(!(e instanceof Element))return;const a=r()(e),n=r()(e).attr("id"),s=r()(e).attr("parentid"),l=r()("#"+n),c=r()("#"+s);if(1===l.length)a.hasClass("remove")?l.effect("fade",{},400,()=>{l.remove()}):l.replaceWith(a.show().get()).effect("highlight");else if(1===c.length)c.append(a.show());else if(e instanceof HTMLScriptElement)r()("head").append(a);else{const t=r()(this).attr("parentid");t?r()(this).prependTo("#"+t).show().effect("highlight"):r()(this).prependTo("#maalcie-tabel tbody:visible:first").show().effect("highlight")}Object(i.b)(e),"modal"===n?Object(o.b)():Object(o.a)()}))}},18:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return o}));var n=a(0),r=a.n(n);function i(t=""){const e=r()("#modal"),a=r()(".modal-backdrop");return(""!==e.html()||""!==t)&&(a.length&&a.remove(),""!==t&&(e.replaceWith(t),e.find("input:visible:first").trigger("focus")),e.modal("show"),r()(document.body).trigger("modalOpen"),!0)}function o(){r()("#modal").modal("hide"),r()(document.body).trigger("modalClose")}},19:function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"b",(function(){return s}));var n=a(0),r=a.n(n),i=a(18);function o(t,e,a,n,o,s,l){n&&(n.hasClass("noanim")?n.hasClass("InlineForm")?r()(n).find(".FormElement:first").css({"background-image":'url("/images/loading-fb.gif")',"background-position":"center right","background-repeat":"no-repeat"}):n.addClass("loading"):(r()(n).replaceWith(`<img alt="Laden" id="${n.attr("id")}" title="${e}" src="/images/loading-arrows.gif" />`),n=r()(`img[title="${e}"]`)));let c="application/x-www-form-urlencoded; charset=UTF-8",u=!0;a instanceof FormData&&(c=!1,u=!1),r.a.ajax({cache:!1,contentType:c,data:a,processData:u,type:t,url:e}).done(t=>{n&&(r()(n).hasClass("noanim")?r()(n).hasClass("InlineForm")&&r()(n).find(".FormElement:first").css({"background-image":"","background-position":"","background-repeat":""}):r()(n).hide(),n.removeClass("loading")),o(t)}).fail((t,e,a)=>{""===a&&(a="Nog bezig met laden!"),n?r()(n).replaceWith('<img alt="Mislukt" title="'+a+'" src="/plaetjes/famfamfam/cancel.png" />'):Object(i.a)(),s&&(t.responseText.startsWith("<!DOC")&&s("Er ging iets fout, code is: "+t.status),s(t.responseText))}).always(()=>{l&&l()})}function s(t,e){return r()(e+" .aanmeldbtn").addClass("loading"),r.a.ajax({cache:!1,data:"",type:"GET",url:t}).done(t=>{r()(e).replaceWith(t)}).fail((t,a,n)=>{r()(e+" .aanmeldbtn").replaceWith(r()(`<div class="alert alert-danger"><strong>Actie mislukt!</strong> ${n}</div>`)),alert(t.responseText)}),!0}},26:function(t,e,a){"use strict";a.r(e),a.d(e,"initDataTable",(function(){return l})),a.d(e,"initOfflineDataTable",(function(){return c})),a.d(e,"fnUpdateDataTable",(function(){return u})),a.d(e,"fnGetSelection",(function(){return d})),a.d(e,"getApiFromSettings",(function(){return f})),a.d(e,"fnGetLastUpdate",(function(){return m})),a.d(e,"fnSetLastUpdate",(function(){return g})),a.d(e,"fnAjaxUpdateCallback",(function(){return p})),a.d(e,"replacePlaceholders",(function(){return h}));var n=a(0),r=a.n(n),i=a(11),o=a(4),s=a(75);async function l(t){await Promise.all([a.e(4),a.e(11)]).then(a.bind(null,87));const e=r()(t),n=e.data("settings"),o=e.data("search");n.ajax&&(n.ajax.data.lastUpdate=m(e),n.ajax.dataSrc=p(e)),n.columns.forEach(t=>t.render=s.a[t.render]);const l=e.DataTable(n);e.dataTable().api().search(o),l.on("page",()=>l.rows({selected:!0}).deselect()),l.on("childRow.dt",(t,e)=>Object(i.b)(e.container.get(0)))}async function c(t){await Promise.all([a.e(4),a.e(11)]).then(a.bind(null,87)),r()(t).DataTable(Object(o.l)(t))}function u(t,e){const a=r()(t).DataTable();e.data.forEach(t=>{const e=r()('tr[data-uuid="'+t.UUID+'"]');1===e.length?"remove"in t?a.row(e).remove():(a.row(e).data(t),Object(i.b)(e.get(0))):0===e.length?a.row.add(t):alert(e.length)}),a.draw(!1)}function d(t){const e=[];return r()(t+" tbody tr.selected").each((function(){e.push(r()(this).attr("data-uuid"))})),e}function f(t){return new r.a.fn.dataTable.Api(t)}const m=t=>()=>Number(t.data("lastupdate")),g=t=>e=>t.data("lastupdate",e),p=t=>e=>{g(t)(e.lastUpdate);const a=t.DataTable();if(e.autoUpdate){const n=parseInt(e.autoUpdate,10);!isNaN(n)&&n<6e5&&setTimeout(()=>{r.a.post(a.ajax.url(),{lastUpdate:m(t)},e=>{u(t.attr("id"),e),p(t)(e)})},n)}return function(t){const e=t.parent();e.hasClass("dataTables_scrollBody")&&e.scrollTop()+e.innerHeight()>=e[0].scrollHeight-20&&window.setTimeout(()=>{e.animate({scrollTop:e[0].scrollHeight},800)},200)}(t),e.data};function h(t,e){const a=/:(\w+)/g.exec(t);if(!a)return t;for(let n=1;n<a.length;n++)t=t.replace(":"+a[n],e[a[n]]);return t}},31:function(t,e,a){"use strict";a.r(e),a.d(e,"formIsChanged",(function(){return f})),a.d(e,"formInlineToggle",(function(){return m})),a.d(e,"formToggle",(function(){return g})),a.d(e,"formReset",(function(){return p})),a.d(e,"formSubmit",(function(){return h})),a.d(e,"formCancel",(function(){return b})),a.d(e,"insertPlaatje",(function(){return j}));var n=a(12),r=a.n(n),i=a(0),o=a.n(i),s=a(26),l=a(19),c=a(13),u=a(18),d=a(50);function f(t){let e=!1;return o()(t).find(".FormElement").not(".tt-hint").each((function(){const t=o()(this);if(t.is("input:radio")){if(t.is(":checked")&&t.attr("origvalue")!==t.val())return e=!0,!1}else if(t.is("input:checkbox")){if(t.is(":checked")!==("1"===t.attr("origvalue")))return e=!0,!1}else if(t.val()!==t.attr("origvalue"))return e=!0,!1})),e}function m(t){t.prev(".InlineFormToggle").toggle(),t.toggle(),t.children(":first").trigger("focus")}function g(t,e){e.preventDefault();return m(o()(t).next("form")),!1}function p(t,e){return e||(e=o()(t.target).closest("form"),t.preventDefault()),o()(t.target).hasClass("confirm")&&!confirm(o()(t.target).attr("title")+".\n\nWeet u het zeker?")||e.find(".FormElement").each((function(){const e=o()(t.target).attr("origvalue");"string"==typeof e&&o()(this).val(e)})),!1}function h(t){const e=t.target,a=o()(e);if(a.hasClass("confirm")){let e=a.attr("title");if(e?e+=".\n\n":e="Weet u het zeker?",!confirm(e))return t.preventDefault(),!1}const n=a.closest("form");if(!n.hasClass("Formulier"))return!1;if(n.hasClass("PreventUnchanged")&&!f(n))return t.preventDefault(),alert("Geen wijzigingen"),!1;if(a.attr("href")&&n.attr("action",a.attr("href")),n.hasClass("ModalForm")||n.hasClass("InlineForm")){t.preventDefault();const e=new FormData(n.get(0));let a=c.a,r=!1;if(n.hasClass("InlineForm")&&(r=n,e.append("InlineFormId",n.attr("id")),n.data("submitCallback")&&(a=n.data("submitCallback"))),n.hasClass("ModalForm")&&(a=t=>{"string"==typeof t?Object(c.a)(t):Object(u.a)()}),n.hasClass("DataTableResponse")){const t=n.attr("data-tableid");document.getElementById(t)||alert("DataTable not found"),e.append("DataTableId",t);const i=Object(s.fnGetSelection)("#"+t);o.a.each(i,(t,a)=>{e.append("DataTableSelection[]",a)}),a=e=>{"object"==typeof e?(Object(s.fnUpdateDataTable)("#"+t,e),e.modal?Object(c.a)(e.modal):Object(u.a)()):Object(c.a)(e)},n.hasClass("noanim")||(r=!1)}return n.hasClass("ReloadPage")?a=d.b:n.hasClass("redirect")&&(a=d.a),Object(l.a)("POST",n.attr("action"),e,r,a,alert,()=>{n.hasClass("SubmitReset")&&p(t,n)}),!1}return n.off("submit"),n.trigger("submit"),!0}function b(t){const e=o()(t.target);if(e.hasClass("confirm")&&!confirm(e.attr("title")+".\n\nWeet u het zeker?"))return t.preventDefault(),!1;const a=e.closest("form");if(a.hasClass("InlineForm"))return t.preventDefault(),m(a),!1;if(a.hasClass("ModalForm")){t.preventDefault();const n=e.attr("href");return n&&r.a.get(n),f(a)&&!confirm("Sluiten zonder wijzigingen op te slaan?")||Object(u.a)(),!1}return!0}function j(t){o.a.markItUp({replaceWith:"[plaatje]"+t+"[/plaatje]"})}},50:function(t,e,a){"use strict";a.d(e,"b",(function(){return r})),a.d(e,"a",(function(){return i}));var n=a(13);function r(t){"string"!=typeof t||'<div id="modal" '!==t.substring(0,16)?location.reload():Object(n.a)(t)}function i(t){'<div id="modal" '!==t.substring(0,16)?window.location.href=t:Object(n.a)(t)}},75:function(t,e,a){"use strict";var n=a(27),r=a.n(n),i=a(4),o=a(26);e.a={default(t,e){if(null===t||"object"!=typeof t)return t;switch(e){case"sort":return t.sort;case"export":return t.export;default:return t.display}},bedrag:t=>Object(i.e)(t),check:t=>'<span class="ico '+(t?"tick":"cross")+'"></span>',aanmeldFilter:t=>t?`<span class="ico group_key" title="Aanmeld filter actief: '${t}'"></span>`:"",aanmeldingen:(t,e,a)=>a.aantal_aanmeldingen+" ("+a.aanmeld_limiet+")",totaalPrijs:(t,e,a)=>Object(i.e)(a.aantal_aanmeldingen*parseInt(a.prijs,10)),datetime:(t,e,a)=>Number(t)==t?r()(1e3*t).format("YYYY-MM-DD HH:mm"):t?"<time"===t.substr(0,5)?t:r()(t).format("YYYY-MM-DD HH:mm"):"",timeago(t,e,a,n){const r=Object(o.getApiFromSettings)(n.settings).cell(n.row,n.col).node().firstChild;switch(e){case"sort":case"export":return r.dateTime;default:return t}},filesize(t,e){switch(e){case"sort":return Number(t);default:return Object(i.f)(t)}}}},89:function(t,e,a){var n={"./nl":74,"./nl.js":74};function r(t){var e=i(t);return a(e)}function i(t){if(!a.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}r.keys=function(){return Object.keys(n)},r.resolve=i,t.exports=r,r.id=89}}]);
//# sourceMappingURL=formulier.e9e633d4d3fcde17bf33.chunk.js.map