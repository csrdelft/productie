(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{363:function(e,t,n){"use strict";n.r(t);var a=n(259),o=n(355),r=n.n(o),i=n(312),d=n(356),s=n(357),c=n(358),l=n(11),m=n.n(l),u=n(0),g=n.n(u),v=n(40),w=n.n(v),b=n(42),f=n(17),h=n(34),p=n(21),k=n(4);Object(k.f)(()=>{const e=e=>w()(e).format("YYYY-MM-DD HH:mm:ss"),t=document.getElementById("agenda");if(null==t)throw new Error("Agenda element niet gevonden");const{jaar:n,maand:o,weergave:l,creator:u}=t.dataset;if(null==n||null==o||null==l||null==u)throw new Error("Agenda opties niet gezet");const v={maand:"dayGridMonth",week:"timeGridWeek",dag:"timeGridDay",agenda:"listMonth"}[l];let y=!1;const E={plugins:[i.d,c.a,s.a,d.a],height:"auto",nowIndicator:!0,defaultView:v,locale:r.a,customButtons:{nieuw:{text:"Nieuw",click:()=>{const t=e(D.getDate());Object(h.a)("POST","/agenda/toevoegen",{begin_moment:t,eind_moment:t},null,p.a)}},bewerken:{text:"Bewerken",click(){y=!y,D.setOption("editable",y),D.setOption("selectable",y),D.refetchEvents(),setTimeout(()=>{const e=t.querySelector(".fc-bewerken-button");if(!e)throw new Error("Geen bewerken knop gevonden");e.classList.toggle("fc-button-active",y)})}}},eventDataTransform:e=>(!0===e.editable&&(e.editable=y),e),header:{left:"dayGridMonth,timeGridWeek,timeGridDay,listMonth",center:"title",right:"today prevYear,prev,next,nextYear"},defaultDate:new Date(Number(n),Number(o)-1),firstDay:0,events:"/agenda/feed",selectable:y&&"true"===u,select:t=>{Object(h.a)("POST","/agenda/toevoegen",{begin_moment:e(t.start),eind_moment:e(t.end)},null,p.a)},eventClick:e=>{const t=e.event.start;t&&m.a.get(`/agenda/details/${e.event.id}?jaar=${t.getFullYear()}`).then(t=>{const n=Object(k.n)(t.data)[0];n.style.zIndex="100",n.style.position="absolute";const a=n.querySelector(".close");a&&a.addEventListener("click",()=>(n.remove(),!1)),document.body.append(n),f.a.init(n),new b.default(e.el,n,{placement:"bottom"}),setTimeout(()=>{const e=t=>{n.contains(t.target)||(n.remove(),document.body.removeEventListener("click",e))};document.body.addEventListener("click",e)})})},eventDrop:async t=>{const n=t.event.start,a=t.event.end;if(!n||!a)throw new Error("Drop heeft geen start of end");await m.a.post("/agenda/verplaatsen/"+t.event.id,{begin_moment:e(n),eind_moment:e(a)}),D.refetchEvents()},eventResize:async t=>{const n=t.event.start,a=t.event.end;if(!n||!a)throw new Error("Resize heeft geen start of end");await m.a.post("/agenda/verplaatsen/"+t.event.id,{begin_moment:e(n),eind_moment:e(a)}),D.refetchEvents()}};if(f.a.addHandler(".ReloadAgenda",e=>e.addEventListener("click",()=>setTimeout(()=>D.refetchEvents()))),"true"===u){const e=E.header;e.right="bewerken,nieuw "+e.right}const D=new a.a(t,E);D.render(),g()(document.body).on("modalClose",()=>D.refetchEvents())})}}]);
//# sourceMappingURL=agenda.ddb0d82f3a4c2e5b8b41.chunk.js.map