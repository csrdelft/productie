(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{11:function(e,t,n){"use strict";n.d(t,"b",(function(){return r}));window._stek_context=new class{constructor(){this.handlers=[]}addHandlers(e){for(const t of Object.keys(e))this.addHandler(t,e[t])}addHandler(e,t){this.handlers.push({selector:e,handler:t})}init(e){if(!e.querySelectorAll)throw new Error("Kan geen context initializeren op dit element: "+e);for(const{selector:t,handler:n}of this.handlers)if(""===t)n(e);else for(const r of Array.from(e.querySelectorAll(t)))n(r)}},t.a=window._stek_context;const r=e=>window._stek_context.init(e)},176:function(e,t,n){"use strict";n.r(t);var r=n(12),i=n.n(r),o=n(20),a=n(11),s=n(4);n(93),n(91),n(90),n(92);const l=[];l.push(Object(o.a)()),Object(s.n)("/wachtwoord",()=>l.push(Object(o.d)())),Object(s.n)("/forum",()=>l.push(Object(o.d)())),Promise.all(l).then(()=>Object(a.b)(document.body)),Object(s.n)("/fotoalbum",()=>Promise.all([n.e(58),n.e(26)]).then(n.bind(null,229)));let c=!1;const p=document.querySelector("#header"),d=document.querySelector("#banner"),u=()=>{!c&&window.scrollY>0&&(c=!0,(()=>{const e=document.createElement("textarea");for(const t of document.querySelectorAll(".lazy-load"))setTimeout(()=>{const n=t.innerHTML.trim();n.startsWith("&lt;")?(e.innerHTML=n,t.outerHTML=e.value):t.outerHTML=n})})()),d.getBoundingClientRect().bottom<0?p.classList.remove("alt"):p.classList.add("alt")};window.addEventListener("scroll",u),window.addEventListener("resize",u),u();const f=document.querySelector("#contact-form");if(f){const e=document.querySelector("#melding"),t=f.submitButton;f.addEventListener("submit",n=>{n.preventDefault(),e.innerHTML="",t.disabled=!0;const r=new FormData(f);return i.a.post("/contactformulier/interesse",r).then(n=>{f.reset(),t.disabled=!1,e.innerHTML='<div class="alert alert-success"><span class="ico accept"></span>'+n.data+"</div>"}).catch(n=>{t.disabled=!1,e.innerHTML='<div class="alert alert-danger"><span class="ico exclamation"></span>'+n.response.data+"</div>"}),!1})}},20:function(e,t,n){"use strict";n.d(t,"f",(function(){return i})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return a})),n.d(t,"g",(function(){return s})),n.d(t,"d",(function(){return l})),n.d(t,"e",(function(){return c})),n.d(t,"c",(function(){return p}));var r=n(11);const i=async()=>{const{initBar:e,initDeelnamegrafiek:t,initLine:i,initPie:o,initSaldoGrafiek:a}=await Promise.all([n.e(2),n.e(60),n.e(37)]).then(n.bind(null,171));r.a.addHandlers({".ctx-deelnamegrafiek":t,".ctx-graph-bar":e,".ctx-graph-line":i,".ctx-graph-pie":o,".ctx-saldografiek":a})},o=async()=>{const{activeerLidHints:e,initBbPreview:t,initBbPreviewBtn:i,loadBbImage:o}=await Promise.all([n.e(55),n.e(8)]).then(n.bind(null,172));r.a.addHandlers({"div.bb-img-loading":o,"[data-bbpreview-btn]":i,"[data-bbpreview]":t,"textarea.BBCodeField":e})},a=async()=>{const{initDataTable:e,initOfflineDataTable:t}=await Promise.all([n.e(2),n.e(15)]).then(n.bind(null,26));r.a.addHandlers({".ctx-datatable":e,".ctx-offline-datatable":t})},s=async()=>{const{knopGet:e,knopPost:t,knopVergroot:i}=await Promise.all([n.e(2),n.e(40)]).then(n.bind(null,170));r.a.addHandlers({".get":t=>t.addEventListener("click",e),".post":e=>e.addEventListener("click",t),".vergroot":e=>e.addEventListener("click",i),"[data-buttons=radio]":e=>{for(const t of Array.from(e.querySelectorAll("a.btn")))t.addEventListener("click",t=>{for(const t of Array.from(e.querySelectorAll(".active")))t.classList.remove("active");t.target.classList.add("active")})}})},l=async()=>{const[{formCancel:e,formReset:t,formSubmit:i,formToggle:o},{bbCodeSet:a}]=await Promise.all([Promise.all([n.e(2),n.e(24)]).then(n.bind(null,31)),n.e(9).then(n.bind(null,173))]);r.a.addHandlers({".InlineFormToggle":e=>e.addEventListener("click",t=>o(e,t)),".SubmitChange":e=>e.addEventListener("change",i),".cancel":t=>t.addEventListener("click",e),".reset":e=>e.addEventListener("click",t),".submit":e=>e.addEventListener("click",i),"form.Formulier":e=>$(e).on("submit",i),"textarea.BBCodeField":e=>$(e).markItUp(a),"time.timeago":e=>$(e).timeago()})},c=async()=>{const[{initKaartjes:e},{default:t},{default:i}]=await Promise.all([Promise.all([n.e(61),n.e(39)]).then(n.bind(null,174)),n.e(64).then(n.bind(null,3)),Promise.resolve().then(n.t.bind(null,0,7))]);r.a.addHandlers({".hoverIntent":e=>i(e).hoverIntent({over(){i(this).find(".hoverIntentContent").fadeIn()},out(){i(this).find(".hoverIntentContent").fadeOut()},timeout:250}),".vue-context":e=>new t({el:e}),"[data-visite]":e})},p=async()=>{const{initDateTimePicker:e}=await Promise.all([n.e(56),n.e(16)]).then(n.bind(null,175));r.a.addHandlers({".DateTimeField":e})}},91:function(module,exports){!function($){$.fn.markItUp=function(settings,extraSettings){var method,params,options,selection,ctrlKey,shiftKey,altKey;ctrlKey=shiftKey=altKey=!1,"string"==typeof settings&&(method=settings,params=extraSettings),options={id:"",nameSpace:"",root:"",previewHandler:!1,previewInWindow:"",previewInElement:"",previewAutoRefresh:!0,previewPosition:"after",previewTemplatePath:"~/templates/preview.html",previewParser:!1,previewParserPath:"",previewParserVar:"data",resizeHandle:!0,beforeInsert:"",afterInsert:"",onEnter:{},onShiftEnter:{},onCtrlEnter:{},onTab:{},markupSet:[{}]},$.extend(options,settings,extraSettings),options.root||$("script").each((function(e,t){var n;null!==(n=$(t).get(0).src.match(/(.*)jquery\.markitup(\.pack)?\.js$/))&&(options.root=n[1])}));var uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},matched=uaMatch(navigator.userAgent),browser={};return matched.browser&&(browser[matched.browser]=!0,browser.version=matched.version),browser.chrome?browser.webkit=!0:browser.webkit&&(browser.safari=!0),this.each((function(){var $$,textarea,levels,scrollPosition,caretPosition,caretOffset,clicked,hash,header,footer,previewWindow,template,iFrame,abort;if($$=$(this),textarea=this,levels=[],abort=!1,scrollPosition=caretPosition=0,caretOffset=-1,options.previewParserPath=localize(options.previewParserPath),options.previewTemplatePath=localize(options.previewTemplatePath),method)switch(method){case"remove":remove();break;case"insert":markup(params);break;default:$.error("Method "+method+" does not exist on jQuery.markItUp")}else init();function localize(e,t){return t?e.replace(/("|')~\//g,"$1"+options.root):e.replace(/^~\//,options.root)}function init(){var e,t="",n="";options.id?t='id="'+options.id+'"':$$.attr("id")&&(t='id="markItUp'+$$.attr("id").substr(0,1).toUpperCase()+$$.attr("id").substr(1)+'"'),options.nameSpace&&(n='class="'+options.nameSpace+'"'),$$.wrap("<div "+n+"></div>"),$$.wrap("<div "+t+' class="markItUp"></div>'),$$.wrap('<div class="markItUpContainer"></div>'),$$.addClass("markItUpEditor"),header=$('<div class="markItUpHeader"></div>').insertBefore($$),$(dropMenus(options.markupSet)).appendTo(header),footer=$('<div class="markItUpFooter"></div>').insertAfter($$),!0===options.resizeHandle&&!0!==browser.safari&&(e=$('<div class="markItUpResizeHandle"></div>').insertAfter($$).bind("mousedown.markItUp",(function(e){var t,n,r=$$.height(),i=e.clientY;t=function(e){return $$.css("height",Math.max(20,e.clientY+r-i)+"px"),!1},n=function(e){return $("html").unbind("mousemove.markItUp",t).unbind("mouseup.markItUp",n),!1},$("html").bind("mousemove.markItUp",t).bind("mouseup.markItUp",n)})),footer.append(e)),$$.bind("keydown.markItUp",keyPressed).bind("keyup",keyPressed),$$.bind("insertion.markItUp",(function(e,t){!1!==t.target&&get(),textarea===$.markItUp.focused&&markup(t)})),$$.bind("focus.markItUp",(function(){$.markItUp.focused=this})),options.previewInElement&&refreshPreview()}function dropMenus(markupSet){var ul=$("<ul></ul>"),i=0,li;return $("li:hover > ul",ul).css("display","block"),$.each(markupSet,(function(){var button=this,t="",title,li,j;title=button.key?(button.name||"")+" [Ctrl+"+button.key+"]":button.name||"";var key=button.key?'accesskey="'+button.key+'"':"";if(button.separator)li=$('<li class="markItUpSeparator">'+(button.separator||"")+"</li>").appendTo(ul);else{for(i++,j=levels.length-1;j>=0;j--)t+=levels[j]+"-";li=$('<li class="markItUpButton markItUpButton'+t+i+" "+(button.className||"")+'"><a href="" '+key+' title="'+title+'">'+(button.name||"")+"</a></li>").bind("contextmenu.markItUp",(function(){return!1})).bind("click.markItUp",(function(e){e.preventDefault()})).bind("focusin.markItUp",(function(){$$.focus()})).bind("mouseup",(function(){return button.call&&eval(button.call)(),setTimeout((function(){markup(button)}),1),!1})).bind("mouseenter.markItUp",(function(){$("> ul",this).show(),$(document).one("click",(function(){$("ul ul",header).hide()}))})).bind("mouseleave.markItUp",(function(){$("> ul",this).hide()})).appendTo(ul),button.dropMenu&&(levels.push(i),$(li).addClass("markItUpDropMenu").append(dropMenus(button.dropMenu)))}})),levels.pop(),ul}function magicMarkups(e){return e?e=(e=(e=e.toString()).replace(/\(\!\(([\s\S]*?)\)\!\)/g,(function(e,t){var n=t.split("|!|");return!0===altKey?void 0!==n[1]?n[1]:n[0]:void 0===n[1]?"":n[0]}))).replace(/\[\!\[([\s\S]*?)\]\!\]/g,(function(e,t){var n=t.split(":!:");if(!0===abort)return!1;var r=prompt(n[0],n[1]?n[1]:"");return null===r&&(abort=!0),r})):""}function prepare(e){return $.isFunction(e)&&(e=e(hash)),magicMarkups(e)}function build(e){var t,n=prepare(clicked.openWith),r=prepare(clicked.placeHolder),i=prepare(clicked.replaceWith),o=prepare(clicked.closeWith),a=prepare(clicked.openBlockWith),s=prepare(clicked.closeBlockWith),l=clicked.multiline;if(""!==i)t=n+i+o;else if(""===selection&&""!==r)t=n+r+o;else{var c=[e=e||selection],p=[];!0===l&&(c=e.split(/\r?\n/));for(var d=0;d<c.length;d++){var u,f=c[d];(u=f.match(/ *$/))?p.push(n+f.replace(/ *$/g,"")+o+u):p.push(n+f+o)}t=p.join("\n")}return{block:t=a+t+s,openBlockWith:a,openWith:n,replaceWith:i,placeHolder:r,closeWith:o,closeBlockWith:s}}function markup(e){var t,n,r,i,o,a,s;if(hash=clicked=e,get(),$.extend(hash,{line:"",root:options.root,textarea:textarea,selection:selection||"",caretPosition:caretPosition,ctrlKey:ctrlKey,shiftKey:shiftKey,altKey:altKey}),prepare(options.beforeInsert),prepare(clicked.beforeInsert),(!0===ctrlKey&&!0===shiftKey||!0===e.multiline)&&prepare(clicked.beforeMultiInsert),$.extend(hash,{line:1}),!0===ctrlKey&&!0===shiftKey){for(n=0,r=(o=selection.split(/\r?\n/)).length,i=0;i<r;i++)""!==$.trim(o[i])?($.extend(hash,{line:++n,selection:o[i]}),o[i]=build(o[i]).block):o[i]="";a={block:o.join("\n")},s=caretPosition,t=a.block.length+(browser.opera?r-1:0)}else!0===ctrlKey?(a=build(selection),s=caretPosition+a.openWith.length,t=a.block.length-a.openWith.length-a.closeWith.length,t-=a.block.match(/ $/)?1:0,t-=fixIeBug(a.block)):!0===shiftKey?(a=build(selection),s=caretPosition,t=a.block.length,t-=fixIeBug(a.block)):(a=build(selection),s=caretPosition+a.block.length,t=0,s-=fixIeBug(a.block));""===selection&&""===a.replaceWith&&(caretOffset+=fixOperaBug(a.block),s=caretPosition+a.openBlockWith.length+a.openWith.length,t=a.block.length-a.openBlockWith.length-a.openWith.length-a.closeWith.length-a.closeBlockWith.length,caretOffset=$$.val().substring(caretPosition,$$.val().length).length,caretOffset-=fixOperaBug($$.val().substring(0,caretPosition))),$.extend(hash,{caretPosition:caretPosition,scrollPosition:scrollPosition}),a.block!==selection&&!1===abort?(insert(a.block),set(s,t)):caretOffset=-1,get(),$.extend(hash,{line:"",selection:selection}),(!0===ctrlKey&&!0===shiftKey||!0===e.multiline)&&prepare(clicked.afterMultiInsert),prepare(clicked.afterInsert),prepare(options.afterInsert),previewWindow&&options.previewAutoRefresh&&refreshPreview(),shiftKey=altKey=ctrlKey=abort=!1}function fixOperaBug(e){return browser.opera?e.length-e.replace(/\n*/g,"").length:0}function fixIeBug(e){return browser.msie?e.length-e.replace(/\r*/g,"").length:0}function insert(e){document.selection?document.selection.createRange().text=e:textarea.value=textarea.value.substring(0,caretPosition)+e+textarea.value.substring(caretPosition+selection.length,textarea.value.length)}function set(e,t){if(textarea.createTextRange){if(browser.opera&&browser.version>=9.5&&0==t)return!1;range=textarea.createTextRange(),range.collapse(!0),range.moveStart("character",e),range.moveEnd("character",t),range.select()}else textarea.setSelectionRange&&textarea.setSelectionRange(e,e+t);textarea.scrollTop=scrollPosition,textarea.focus()}function get(){if(textarea.focus(),scrollPosition=textarea.scrollTop,document.selection)if(selection=document.selection.createRange().text,browser.msie){var e=document.selection.createRange(),t=e.duplicate();for(t.moveToElementText(textarea),caretPosition=-1;t.inRange(e);)t.moveStart("character"),caretPosition++}else caretPosition=textarea.selectionStart;else caretPosition=textarea.selectionStart,selection=textarea.value.substring(caretPosition,textarea.selectionEnd);return selection}function preview(){"function"==typeof options.previewHandler?previewWindow=!0:options.previewInElement?previewWindow=$(options.previewInElement):!previewWindow||previewWindow.closed?options.previewInWindow?(previewWindow=window.open("","preview",options.previewInWindow),$(window).unload((function(){previewWindow.close()}))):(iFrame=$('<iframe class="markItUpPreviewFrame"></iframe>'),"after"==options.previewPosition?iFrame.insertAfter(footer):iFrame.insertBefore(header),previewWindow=iFrame[iFrame.length-1].contentWindow||frame[iFrame.length-1]):!0===altKey&&(iFrame?iFrame.remove():previewWindow.close(),previewWindow=iFrame=!1),options.previewAutoRefresh||refreshPreview(),options.previewInWindow&&previewWindow.focus()}function refreshPreview(){renderPreview()}function renderPreview(){if(options.previewHandler&&"function"==typeof options.previewHandler)options.previewHandler($$.val());else if(options.previewParser&&"function"==typeof options.previewParser){writeInPreview(localize(options.previewParser($$.val()),1))}else""!==options.previewParserPath?$.ajax({type:"POST",dataType:"text",global:!1,url:options.previewParserPath,data:options.previewParserVar+"="+encodeURIComponent($$.val()),success:function(e){writeInPreview(localize(e,1))}}):template||$.ajax({url:options.previewTemplatePath,dataType:"text",global:!1,success:function(e){writeInPreview(localize(e,1).replace(/<!-- content -->/g,$$.val()))}});return!1}function writeInPreview(e){if(options.previewInElement)$(options.previewInElement).html(e);else if(previewWindow&&previewWindow.document){try{sp=previewWindow.document.documentElement.scrollTop}catch(e){sp=0}previewWindow.document.open(),previewWindow.document.write(e),previewWindow.document.close(),previewWindow.document.documentElement.scrollTop=sp}}function keyPressed(e){if(shiftKey=e.shiftKey,altKey=e.altKey,ctrlKey=(!e.altKey||!e.ctrlKey)&&(e.ctrlKey||e.metaKey),"keydown"===e.type){if(!0===ctrlKey&&(li=$('a[accesskey="'+(13==e.keyCode?"\\n":String.fromCharCode(e.keyCode))+'"]',header).parent("li"),0!==li.length))return ctrlKey=!1,setTimeout((function(){li.triggerHandler("mouseup")}),1),!1;if(13===e.keyCode||10===e.keyCode)return!0===ctrlKey?(ctrlKey=!1,markup(options.onCtrlEnter),options.onCtrlEnter.keepDefault):!0===shiftKey?(shiftKey=!1,markup(options.onShiftEnter),options.onShiftEnter.keepDefault):(markup(options.onEnter),options.onEnter.keepDefault);if(9===e.keyCode)return 1!=shiftKey&&1!=ctrlKey&&1!=altKey&&(-1!==caretOffset?(get(),set(caretOffset=$$.val().length-caretOffset,0),caretOffset=-1,!1):(markup(options.onTab),options.onTab.keepDefault))}}function remove(){$$.unbind(".markItUp").removeClass("markItUpEditor"),$$.parent("div").parent("div.markItUp").parent("div").replaceWith($$),$$.data("markItUp",null)}}))},$.fn.markItUpRemove=function(){return this.each((function(){$(this).markItUp("remove")}))},$.markItUp=function(e){var t={target:!1};if($.extend(t,e),t.target)return $(t.target).each((function(){$(this).focus(),$(this).trigger("insertion",[t])}));$("textarea").trigger("insertion",[t])}}(jQuery)}}]);
//# sourceMappingURL=extern-defer.99057c914ebfb9372795.chunk.js.map