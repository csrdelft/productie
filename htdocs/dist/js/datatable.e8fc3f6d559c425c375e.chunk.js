/*! For license information please see datatable.e8fc3f6d559c425c375e.chunk.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{170:function(t,e,a){"use strict";a.r(e),a.d(e,"knopPost",(function(){return p})),a.d(e,"knopGet",(function(){return f})),a.d(e,"knopVergroot",(function(){return h}));var n=a(0),o=a.n(n),s=a(26),l=a(19),i=a(13),r=a(33),d=a(18),c=a(50);function u(t,e){if(t.hasClass("confirm")&&!confirm(t.attr("title")+".\n\nWeet u het zeker?"))return Object(d.a)(),!1;let a=t,n=i.a,o=t.attr("data");if(t.hasClass("popup")&&(a=!1),t.hasClass("prompt")){o=o.split("=");const t=prompt(o[0],o[1]);if(!t)return!1;o=encodeURIComponent(o[0])+"="+encodeURIComponent(t)}if(t.hasClass("addfav")&&(o={tekst:document.title.replace("C.S.R. Delft - ",""),link:window.location.href}),t.hasClass("DataTableRowKnop")){const e=t.parents("table").attr("id");o={DataTableId:e,DataTableSelection:t.parents("tr").attr("data-uuid")},n=t=>{"object"==typeof t?(Object(s.fnUpdateDataTable)("#"+e,t),t.modal?Object(i.a)(t.modal):Object(d.a)()):Object(i.a)(t)}}if(t.hasClass("DataTableResponse")){let e=t.attr("data-tableid");document.getElementById(e)||(e=t.closest("form").attr("data-tableid"),document.getElementById(e)||alert("DataTable not found")),o={DataTableId:e,"DataTableSelection[]":Object(s.fnGetSelection)("#"+e)},n=t=>{"object"==typeof t?(Object(s.fnUpdateDataTable)("#"+e,t),t.modal?Object(i.a)(t.modal):Object(d.a)()):Object(i.a)(t)},t.hasClass("SingleRow")||(a=!1)}t.hasClass("ReloadPage")?n=c.b:t.hasClass("redirect")&&(n=c.a),Object(l.a)(e,t.attr("href"),o,a,n,alert)}function p(t){t.preventDefault();const e=t.target;return o()(e).hasClass("range")?("INPUT"===e.tagName.toUpperCase()?Object(r.d)(t):Object(r.f)(t),!1):(u(o()(this),"POST"),!1)}function f(t){return t.preventDefault(),u(o()(this),"GET"),!1}function h(t){const e=o()(this),a=e.attr("data-vergroot"),n=e.attr("data-vergroot-oud");n?(o()(a).animate({height:n},600),e.removeAttr("data-vergroot-oud"),e.find("span.fa").removeClass("fa-compress").addClass("fa-expand"),e.attr("title","Uitklappen")):(e.attr("title","Inklappen"),e.find("span.fa").removeClass("fa-expand").addClass("fa-compress"),e.attr("data-vergroot-oud",o()(a).height()),o()(a).animate({height:o()(a).prop("scrollHeight")+1},600))}},87:function(t,e,a){"use strict";a.r(e);a(179),a(191),a(181),a(192),a(193),a(194),a(195),a(196),a(197),a(198),a(199),a(200),a(201),a(202);var n=a(0),o=a.n(n),s=a(203),l=a.n(s);class i{constructor(t){if(!(this instanceof i))throw new Error("ChildRow must be initialised with the 'new' keyword.");this.api=new o.a.fn.dataTable.Api(t);const e=this.api.settings()[0];if(e._childRow)throw new Error("ChildRow already initialised on table "+e.nTable.id);e._childRow=this;const a=o()(this.api.table(0).node());o.a.fn.dataTable.ext.internal._fnCallbackReg(this.api.settings()[0],"aoRowCreatedCallback",i._fnCreatedRowCallback,"child-row"),a.find("tbody").on("click","tr td.toggle-childrow",t=>{this.fnToggleChildRow(o()(t.target))})}static _fnCreatedRowCallback(t,e){"detailSource"in e&&o()(t).children("td:first").addClass("toggle-childrow").data("detailSource",e.detailSource)}fnToggleChildRow(t){const e=this.api.table(0),a=t.closest("tr"),n=this.api.row(a);let s;n.child.isShown()?a.hasClass("loading")||(s=a.next().children(":first").children(":first"),s.slideUp(400,()=>{n.child.hide(),a.removeClass("expanded")})):(n.child('<div class="innerDetails verborgen"></div>').show(),a.addClass("expanded loading"),s=a.next().addClass("childrow").children(":first").children(":first"),o.a.ajax({url:t.data("detailSource")}).done(t=>{n.child.isShown()&&(a.removeClass("loading"),s.html(t).slideDown(),o()(e.node()).trigger("childRow.dt",{container:s}))}).fail((t,e,o)=>{n.child.isShown()&&(a.removeClass("loading"),a.find("td.toggle-childrow").html(`<img title="${o}" alt="cancel" src="/plaetjes/famfamfam/cancel.png" />`))}))}}i.version="1.0.0",o.a.fn.dataTable.ChildRow=i,o.a.fn.DataTable.ChildRow=i,o()(document).on("preInit.dt.childRow",(t,e)=>{if("dt"!==t.namespace)return;const a=e.oInit.childRow;e._childRow||!1!==a&&new i(e)}),o.a.fn.dataTable.Api.register("childRow.toggle()",(function(t){return this.iterator("table",e=>{const a=e._childRow;a&&a.fnToggleChildRow(t)})}));class r{constructor(t,e){if(!(this instanceof r))throw new Error("ColumnGroup must be initialised with the 'new' keyword.");const a=new o.a.fn.dataTable.Api(t);this.c=o.a.extend(!0,{},r.defaults,e),this.s={dt:a,collapsedGroups:[],regrouping:!1,lastDraw:null};const n=a.settings()[0];if(n._columnGroup)throw new Error("ColumnGroup already initialized on table "+n.nTable.id);n._columnGroup=this,this._fnConstruct()}_fnConstruct(){const t=this.s.dt.table(0),e=o()(t.node()),a=this;o.a.fn.dataTable.ext.search.push((t,e)=>a._fnGroupExpandCollapseDraw(t,e)),e.find("tbody").on("click","tr.group",(function(t){t.shiftKey||t.ctrlKey||a._fnGroupExpandCollapse(o()(this))})),e.find("thead").on("click","th.toggle-group:first",(function(t){a._fnGroupExpandCollapseAll(o()(this))})),e.on("draw.dt",()=>this._fnGroupByColumnDraw()),e.find("thead tr th").first().addClass("toggle-group toggle-group-expanded")}_fnGroupByColumnDraw(){const t=this.s.dt,e=t.table(0),a=o()(e.node()),n=this.s.collapsedGroups,s=this.s.lastDraw,l=this.c.column;if(s===Date.now())return;const i=n.slice();let r="";const d=a.find("thead tr th").length-2;for(let t=0;t<d;t++)r+="<td></td>";let c;const u=o()(t.rows({page:"current"}).nodes());let p;a.find("tr.group").remove(),t.column(l,{page:"current"}).data().each((t,e)=>{if(p!==t){for(;i.length>0&&i[0].localeCompare(t)<0;)c=o()(`<tr class="group">\n<td class="toggle-group"></td>\n<td class="group-label">${i[0]}</td>\n${r}\n</tr>`).data("groupData",i[0]),u.eq(e).before(c),i.shift();c=o()(`<tr class="group">\n<td class="toggle-group toggle-group-expanded"></td>\n<td class="group-label">${t}</td>\n${r}\n</tr>`).data("groupData",t),u.eq(e).before(c),p=t}});const f=a.children("tbody:first");i.forEach(t=>{c=o()(`<tr class="group">\n<td class="toggle-group"></td>\n<td class="group-label">${t}</td>\n${r}\n</tr>`).data("groupData",t),f.append(c)}),this.s.lastDraw=Date.now()}_fnGroupExpandCollapse(t){const e=this.s.dt,a=e.table(0),n=o()(a.node());let s=this.s.collapsedGroups;const l=o()("td:first",t);l.toggleClass("toggle-group-expanded");const i=t.data("groupData");l.hasClass("toggle-group-expanded")?s=o.a.grep(s,t=>t!==i):s.push(i),this.s.collapsedGroups=s.sort(),e.draw(!1),this._fnHideEmptyCollapsedAll(n.find("thead tr th:first"))}_fnHideEmptyCollapsedAll(t){const e=this.s.dt.table(0),a=o()(e.node()),n=this.s.collapsedGroups;a.find("tr.group").length===n.length?(a.find("td.dataTables_empty").parent().remove(),t.removeClass("toggle-group-expanded")):t.addClass("toggle-group-expanded")}_fnGroupExpandCollapseAll(t){const e=this.s.dt,a=this.c.column,n=[];if(t.hasClass("toggle-group-expanded")){let t;e.column(a).data().each(e=>{t!==e&&(n.push(e),t=e)})}this.s.collapsedGroups=n,e.draw(!1),this._fnHideEmptyCollapsedAll(t)}_fnGroupExpandCollapseDraw(t,e){const a=this.c.column,n=this.s.collapsedGroups,s=e[a];return o.a.inArray(s,n)<=-1}}r.defaults={column:null},r.version="1.0.0",o.a.fn.dataTable.ColumnGroup=r,o.a.fn.DataTable.ColumnGroup=r,o()(document).on("preInit.dt.columnGroup",(t,e)=>{if("dt"!==t.namespace)return;const a=e.oInit.columnGroup,n=o.a.fn.dataTable.defaults.columnGroup;if(a||n){const t=o.a.extend({},a,n);!1!==a&&new r(e,t)}});var d=a(11),c=a(4),u=a(26);class p{constructor(t,e){const a=new o.a.fn.dataTable.Api(t);this.c=o.a.extend(!0,{},p.defaults,e),this.s={dt:a,collapsedGroups:[],regrouping:!1,lastDraw:null};const n=a.settings()[0];if(n._rowButtons)throw new Error("RowButtons already initialized on table "+n.nTable.id);n._rowButtons=this,a.on("draw.dt",()=>{a.column("actionButtons:name").nodes().each((t,a,n)=>{t.innerHTML="",t.append(p.createButtonGroup(e,n.row(t).data()))})})}static createButtonGroup(t,e){const a=c.g`<div class="btn-group"></div>`;for(const n of Object.values(t)){const t=Object(u.replacePlaceholders)(n.action,e),o=c.g`
<a href="${t}"
	class="btn btn-light noanim btn-sm DataTableRowKnop ${n.method} ${n.css}"
	title="${n.title}">
		<i class="${n.icon}"></i>
</a>`;a.append(o)}a.style.marginTop="-10px",a.style.marginBottom="-10px";const n=c.g`<div class="d-inline-flex"></div>`;return n.append(a),Object(d.b)(n),n}}p.version="1.0.0",p.defaults={},o.a.fn.dataTable.RowButtons=p,o.a.fn.DataTable.RowButtons=p,o()(document).on("preInit.dt.rowButtons",(t,e)=>{if("dt"!==t.namespace)return;const a=e.oInit.rowButtons,n=o.a.fn.dataTable.defaults.rowButtons;if(a||n){const t=o.a.extend({},a,n);!1!==a&&new p(e,t)}});var f=a(170);o.a.fn.dataTable.ext.buttons.copyHtml5.className+=" dt-button-ico dt-ico-page_white_copy",o.a.fn.dataTable.ext.buttons.copyFlash.className+=" dt-button-ico dt-ico-page_white_copy",o.a.fn.dataTable.ext.buttons.csvHtml5.className+=" dt-button-ico dt-ico-page_white_text",o.a.fn.dataTable.ext.buttons.csvFlash.className+=" dt-button-ico dt-ico-page_white_text",o.a.fn.dataTable.ext.buttons.pdfHtml5.className+=" dt-button-ico dt-ico-page_white_acrobat",o.a.fn.dataTable.ext.buttons.pdfFlash.className+=" dt-button-ico dt-ico-page_white_acrobat",o.a.fn.dataTable.ext.buttons.excelHtml5.className+=" dt-button-ico dt-ico-page_white_excel",o.a.fn.dataTable.ext.buttons.excelFlash.className+=" dt-button-ico dt-ico-page_white_excel",o.a.fn.dataTable.ext.buttons.print.className+=" dt-button-ico dt-ico-printer",o.a.fn.dataTable.ext.buttons.default={init(t,e,a){const n=()=>{this.enable(Object(c.d)(a.multiplicity,t.rows({selected:!0}).count()))};t.on("select.dt.DT deselect.dt.DT",n),n(),-1!==a.href.indexOf(":")&&t.on("select.dt.DT",(t,n,o,s)=>{if(1===s.length){const t=n.row(s).data();e.attr("href",Object(u.replacePlaceholders)(a.href,t))}}),e.attr("href",a.href),e.attr("data-tableid",t.tables().nodes().to$().attr("id"))},action(t,e,a){f.knopPost.call(a,t)},className:"post DataTableResponse"},o.a.fn.dataTable.ext.buttons.popup={extend:"default",action(t,e,a){window.open(a.attr("href"))}},o.a.fn.dataTable.ext.buttons.url={extend:"default",action(t,e,a){window.location.href=a.attr("href")}},o.a.fn.dataTable.ext.buttons.sourceChange={init(t,e,a){const n=()=>{t.buttons(e).active(t.ajax.url()===a.href)};t.on("xhr.sourceChange",n),n()},action(t,e,a,n){e.ajax.url(n.href).load()}},o.a.fn.dataTable.ext.buttons.confirm={extend:"collection",init(t,e,a){const n=()=>{this.enable(Object(c.d)(a.multiplicity,t.rows({selected:!0}).count()))};t.on("select.dt.DT deselect.dt.DT",n),n(),new o.a.fn.dataTable.Buttons(t,{buttons:[{action:a.action,name:"confirm"+a.text,className:"dt-button-ico dt-ico-exclamation dt-button-warning",extend:"default",href:a.href,multiplicity:"",text:t=>t.i18n("csr.zeker","Are you sure?")}]}),t.button("confirm"+a.text+":name").node().appendTo(a._collection),a.action=o.a.fn.dataTable.ext.buttons.collection.action},action(t,e,a){f.knopPost.call(a,t)}},o.a.fn.dataTable.ext.buttons.defaultCollection={extend:"collection",init(t,e,a){o.a.fn.dataTable.ext.buttons.default.init.call(this,t,e,a)}};var h={deferRender:!0,createdRow(t,e){const a=this;o()(t).attr("data-uuid",e.UUID),Object(d.b)(t),o()(t).children().each((t,e)=>{o()(e).children("a.post").each((t,e)=>{o()(e).attr("data-tableid",a.attr("id"))})})},language:{buttons:{colvis:"Kolom weergave",copy:"Kopiëren",print:"Printen"},csr:{zeker:"Weet u het zeker?"},oPaginate:{sFirst:"Eerste",sLast:"Laatste",sNext:"Volgende",sPrevious:"Vorige"},sEmptyTable:"Geen resultaten aanwezig in de tabel",sInfo:"_START_ tot _END_ van _TOTAL_ resultaten",sInfoEmpty:"Geen resultaten om weer te geven",sInfoFiltered:" (gefilterd uit _MAX_ resultaten)",sInfoPostFix:"",sInfoThousands:".",sLengthMenu:"_MENU_ resultaten weergeven",sLoadingRecords:"Een moment geduld aub - bezig met laden...",sProcessing:"Bezig...",sSearch:"Zoeken",sZeroRecords:"Geen resultaten gevonden",select:{rows:{_:"%d rijen geselecteerd",0:"",1:"1 rij geselecteerd"}}},lengthMenu:[[10,25,50,100,-1],[10,25,50,100,"Alles"]]};window.JSZip=l.a,o.a.extend(!0,o.a.fn.dataTable.defaults,h),o()(()=>{o()("body").on("click",()=>{o()(".ui-tooltip-content").parents("div").remove()})})}}]);
//# sourceMappingURL=datatable.e8fc3f6d559c425c375e.chunk.js.map