(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{239:function(t,o,a){"use strict";a.r(o);var e=a(0),n=a.n(e),c=a(12),i=a.n(c),r=a(14),s=a(77),l=a(55),d=a.n(l),u=a(9);try{const t=Object(u.b)("textarea#forumBericht"),o=Object(u.b)("#forumConcept");let a=!1;setInterval(async()=>{const e=t.value!==t.getAttribute("origvalue");if(e||a)try{const{data:t}=await i.a.post(o.dataset.url,{ping:e});Object(r.a)(t),a=e}catch(t){window.location.reload()}},6e4)}catch(t){}if(!window.location.hash&&"/forum/reactie/"===window.location.pathname.substr(0,15)){const t=parseInt(window.location.pathname.substr(15),10);window.location.hash="#"+t}n()("#nieuweTitel").on("focusin",()=>n()("#draad-melding").slideDown(200)),n()(".togglePasfoto").on("click",(function(){n()(this).parent().find(".forumpasfoto").toggleClass("verborgen")})),Object(u.c)(".auteur").forEach(t=>{const o=Object(u.c)("a.forummodknop",t);d()(t,()=>o.forEach(t=>t.style.opacity="1"),()=>o.forEach(t=>t.style.opacity="0"))});for(const t of Object(u.c)("a.citeren"))t.addEventListener("click",()=>Object(s.b)(t.dataset.citeren))}}]);
//# sourceMappingURL=forum.235b84424ab04fd86fed.chunk.js.map