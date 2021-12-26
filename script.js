/*! For license information please see script.js.LICENSE.txt */
(()=>{"use strict";var e={733:(e,t,o)=>{o.r(t),o.d(t,{Properties:()=>n,VariableDescriptor:()=>r,bootstrapExtra:()=>F,findLayerBoundaries:()=>u,findLayersBoundaries:()=>p,getAllVariables:()=>i,getLayersMap:()=>l,initDoors:()=>q,initPropertiesTemplates:()=>L,initVariableActionLayer:()=>Y});class n{constructor(e){this.properties=null!=e?e:[]}get(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.value));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const o=this.get(e);if(void 0!==o){if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const o=this.get(e);if(void 0===o)throw new Error('Property "'+e+'" is missing');if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}getType(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.type));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}}class r{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new n(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return!e||WA.player.tags.includes(e)}get isWritable(){const e=this.properties.getString("writableBy");return!e||WA.player.tags.includes(e)}}async function i(){const e=await WA.room.getTiledMap(),t=new Map;return s(e.layers,t),t}function s(e,t){for(const o of e)if("objectgroup"===o.type)for(const e of o.objects)"variable"===e.type&&t.set(e.name,new r(e));else"group"===o.type&&s(o.layers,t)}let a;async function l(){return void 0===a&&(a=async function(){return function(e){const t=new Map;return c(e.layers,"",t),t}(await WA.room.getTiledMap())}()),a}function c(e,t,o){for(const n of e)"group"===n.type?c(n.layers,t+n.name+"/",o):(n.name=t+n.name,o.set(n.name,n))}function u(e){let t=1/0,o=1/0,n=0,r=0;const i=e.data;if("string"==typeof i)throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<e.height;s++)for(let a=0;a<e.width;a++)0!==i[a+s*e.width]&&(t=Math.min(t,a),r=Math.max(r,a),o=Math.min(o,s),n=Math.max(n,s));return{top:o,left:t,right:r+1,bottom:n+1}}function p(e){let t=1/0,o=1/0,n=0,r=0;for(const i of e){const e=u(i);e.left<t&&(t=e.left),e.top<o&&(o=e.top),e.right>r&&(r=e.right),e.bottom>n&&(n=e.bottom)}return{top:o,left:t,right:r,bottom:n}}var h=Object.prototype.toString,f=Array.isArray||function(e){return"[object Array]"===h.call(e)};function g(e){return"function"==typeof e}function d(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function y(e,t){return null!=e&&"object"==typeof e&&t in e}var m=RegExp.prototype.test,w=/\S/;var b={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},v=/\s*/,A=/\s+/,W=/\s*=/,S=/\s*\}/,C=/#|\^|\/|>|\{|&|=|!/;function k(e){this.string=e,this.tail=e,this.pos=0}function E(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function x(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}k.prototype.eos=function(){return""===this.tail},k.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var o=t[0];return this.tail=this.tail.substring(o.length),this.pos+=o.length,o},k.prototype.scanUntil=function(e){var t,o=this.tail.search(e);switch(o){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,o),this.tail=this.tail.substring(o)}return this.pos+=t.length,t},E.prototype.push=function(e){return new E(e,this)},E.prototype.lookup=function(e){var t,o,n,r=this.cache;if(r.hasOwnProperty(e))t=r[e];else{for(var i,s,a,l=this,c=!1;l;){if(e.indexOf(".")>0)for(i=l.view,s=e.split("."),a=0;null!=i&&a<s.length;)a===s.length-1&&(c=y(i,s[a])||(o=i,n=s[a],null!=o&&"object"!=typeof o&&o.hasOwnProperty&&o.hasOwnProperty(n))),i=i[s[a++]];else i=l.view[e],c=y(l.view,e);if(c){t=i;break}l=l.parent}r[e]=t}return g(t)&&(t=t.call(this.view)),t},x.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},x.prototype.parse=function(e,t){var o=this.templateCache,n=e+":"+(t||T.tags).join(":"),r=void 0!==o,i=r?o.get(n):void 0;return null==i&&(i=function(e,t){if(!e)return[];var o,n,r,i,s=!1,a=[],l=[],c=[],u=!1,p=!1,h="",g=0;function y(){if(u&&!p)for(;c.length;)delete l[c.pop()];else c=[];u=!1,p=!1}function b(e){if("string"==typeof e&&(e=e.split(A,2)),!f(e)||2!==e.length)throw new Error("Invalid tags: "+e);o=new RegExp(d(e[0])+"\\s*"),n=new RegExp("\\s*"+d(e[1])),r=new RegExp("\\s*"+d("}"+e[1]))}b(t||T.tags);for(var E,x,M,V,P,L,j=new k(e);!j.eos();){if(E=j.pos,M=j.scanUntil(o))for(var B=0,G=M.length;B<G;++B)i=V=M.charAt(B),function(e,t){return m.call(e,t)}(w,i)?(p=!0,s=!0,h+=" "):(c.push(l.length),h+=V),l.push(["text",V,E,E+1]),E+=1,"\n"===V&&(y(),h="",g=0,s=!1);if(!j.scan(o))break;if(u=!0,x=j.scan(C)||"name",j.scan(v),"="===x?(M=j.scanUntil(W),j.scan(W),j.scanUntil(n)):"{"===x?(M=j.scanUntil(r),j.scan(S),j.scanUntil(n),x="&"):M=j.scanUntil(n),!j.scan(n))throw new Error("Unclosed tag at "+j.pos);if(P=">"==x?[x,M,E,j.pos,h,g,s]:[x,M,E,j.pos],g++,l.push(P),"#"===x||"^"===x)a.push(P);else if("/"===x){if(!(L=a.pop()))throw new Error('Unopened section "'+M+'" at '+E);if(L[1]!==M)throw new Error('Unclosed section "'+L[1]+'" at '+E)}else"name"===x||"{"===x||"&"===x?p=!0:"="===x&&b(M)}if(y(),L=a.pop())throw new Error('Unclosed section "'+L[1]+'" at '+j.pos);return function(e){for(var t,o=[],n=o,r=[],i=0,s=e.length;i<s;++i)switch((t=e[i])[0]){case"#":case"^":n.push(t),r.push(t),n=t[4]=[];break;case"/":r.pop()[5]=t[2],n=r.length>0?r[r.length-1][4]:o;break;default:n.push(t)}return o}(function(e){for(var t,o,n=[],r=0,i=e.length;r<i;++r)(t=e[r])&&("text"===t[0]&&o&&"text"===o[0]?(o[1]+=t[1],o[3]=t[3]):(n.push(t),o=t));return n}(l))}(e,t),r&&o.set(n,i)),i},x.prototype.render=function(e,t,o,n){var r=this.getConfigTags(n),i=this.parse(e,r),s=t instanceof E?t:new E(t,void 0);return this.renderTokens(i,s,o,e,n)},x.prototype.renderTokens=function(e,t,o,n,r){for(var i,s,a,l="",c=0,u=e.length;c<u;++c)a=void 0,"#"===(s=(i=e[c])[0])?a=this.renderSection(i,t,o,n,r):"^"===s?a=this.renderInverted(i,t,o,n,r):">"===s?a=this.renderPartial(i,t,o,r):"&"===s?a=this.unescapedValue(i,t):"name"===s?a=this.escapedValue(i,t,r):"text"===s&&(a=this.rawValue(i)),void 0!==a&&(l+=a);return l},x.prototype.renderSection=function(e,t,o,n,r){var i=this,s="",a=t.lookup(e[1]);if(a){if(f(a))for(var l=0,c=a.length;l<c;++l)s+=this.renderTokens(e[4],t.push(a[l]),o,n,r);else if("object"==typeof a||"string"==typeof a||"number"==typeof a)s+=this.renderTokens(e[4],t.push(a),o,n,r);else if(g(a)){if("string"!=typeof n)throw new Error("Cannot use higher-order sections without the original template");null!=(a=a.call(t.view,n.slice(e[3],e[5]),(function(e){return i.render(e,t,o,r)})))&&(s+=a)}else s+=this.renderTokens(e[4],t,o,n,r);return s}},x.prototype.renderInverted=function(e,t,o,n,r){var i=t.lookup(e[1]);if(!i||f(i)&&0===i.length)return this.renderTokens(e[4],t,o,n,r)},x.prototype.indentPartial=function(e,t,o){for(var n=t.replace(/[^ \t]/g,""),r=e.split("\n"),i=0;i<r.length;i++)r[i].length&&(i>0||!o)&&(r[i]=n+r[i]);return r.join("\n")},x.prototype.renderPartial=function(e,t,o,n){if(o){var r=this.getConfigTags(n),i=g(o)?o(e[1]):o[e[1]];if(null!=i){var s=e[6],a=e[5],l=e[4],c=i;0==a&&l&&(c=this.indentPartial(i,l,s));var u=this.parse(c,r);return this.renderTokens(u,t,o,c,n)}}},x.prototype.unescapedValue=function(e,t){var o=t.lookup(e[1]);if(null!=o)return o},x.prototype.escapedValue=function(e,t,o){var n=this.getConfigEscape(o)||T.escape,r=t.lookup(e[1]);if(null!=r)return"number"==typeof r&&n===T.escape?String(r):n(r)},x.prototype.rawValue=function(e){return e[1]},x.prototype.getConfigTags=function(e){return f(e)?e:e&&"object"==typeof e?e.tags:void 0},x.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!f(e)?e.escape:void 0};var T={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){M.templateCache=e},get templateCache(){return M.templateCache}},M=new x;T.clearCache=function(){return M.clearCache()},T.parse=function(e,t){return M.parse(e,t)},T.render=function(e,t,o,n){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(f(r=e)?"array":typeof r)+'" was given as the first argument for mustache#render(template, view, partials)');var r;return M.render(e,t,o,n)},T.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return b[e]}))},T.Scanner=k,T.Context=E,T.Writer=x;const V=T;class P{constructor(e,t){this.template=e,this.state=t,this.ast=V.parse(e)}getValue(){return void 0===this.value&&(this.value=V.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const o of this.getUsedVariables().values())t.push(this.state.onVariableChange(o).subscribe((()=>{const t=V.render(this.template,this.state);t!==this.value&&(this.value=t,e(this.value))})));return{unsubscribe:()=>{for(const e of t)e.unsubscribe()}}}isPureString(){return 0===this.ast.length||1===this.ast.length&&"text"===this.ast[0][0]}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const o of e){const e=o[0],n=o[1],r=o[4];["name","&","#","^"].includes(e)&&t.add(n),void 0!==r&&"string"!=typeof r&&this.recursiveGetUsedVariables(r,t)}}}async function L(){var e;const t=await l();for(const[o,n]of t.entries()){const t=null!==(e=n.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type)continue;const t=new P(e.value,WA.state);if(t.isPureString())continue;const n=t.getValue();j(o,e.name,n),t.onChange((t=>{j(o,e.name,t)}))}}}function j(e,t,o){WA.room.setProperty(e,t,o),"visible"===t&&(o?WA.room.showLayer(e):WA.room.hideLayer(e))}const B="https://unpkg.com/@workadventure/scripting-api-extra@1.0.5/dist";let G,U=0,O=0;function I(e){if(WA.state[e.name]){let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.showLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.hideLayer(e)}else{let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.hideLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.showLayer(e)}}function R(e){return e.map((e=>G.get(e))).filter((e=>"tilelayer"===(null==e?void 0:e.type)))}function Z(e){const t=p(R(e)),o=32*((t.right-t.left)/2+t.left),n=32*((t.bottom-t.top)/2+t.top);return Math.sqrt(Math.pow(U-o,2)+Math.pow(O-n,2))}function N(e){WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]?function(e){const t=e.properties.getString("openSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=Z(e.properties.mustGetString("openLayer").split("\n"));if(t>o)return;n=1-t/o}t&&WA.sound.loadSound(t).play({volume:n})}(e):function(e){const t=e.properties.getString("closeSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=Z(e.properties.mustGetString("closeLayer").split("\n"));if(t>o)return;n=1-t/o}t&&WA.sound.loadSound(t).play({volume:n})}(e),I(e)})),I(e)}function _(e,t,o,n){const r=e.name;let i,s,a=!1;const l=o.getString("zone");if(!l)throw new Error('Missing "zone" property on doorstep layer "'+r+'"');const c=o.getString("tag");let u=!0;c&&!WA.player.tags.includes(c)&&(u=!1);const h=!!c;function f(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("closeTriggerMessage"))&&void 0!==e?e:"Press SPACE to close the door",callback:()=>{WA.state[t.name]=!1,g()}})}function g(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("openTriggerMessage"))&&void 0!==e?e:"Press SPACE to open the door",callback:()=>{WA.state[t.name]=!0,f()}})}function d(){s&&(WA.room.website.delete(s.name),s=void 0)}WA.room.onEnterZone(l,(()=>{a=!0,o.getBoolean("autoOpen")&&u?WA.state[t.name]=!0:WA.state[t.name]||(!h||u)&&h||!o.getString("code")&&!o.getString("codeVariable")?u&&(WA.state[t.name]?f():g()):function(e){const o=p(R(t.properties.mustGetString("closeLayer").split("\n")));s=WA.room.website.create({name:"doorKeypad"+e,url:n+"/keypad.html#"+encodeURIComponent(e),position:{x:32*o.right,y:32*o.top,width:96,height:128},allowApi:!0})}(r)})),WA.room.onLeaveZone(l,(()=>{a=!1,o.getBoolean("autoClose")&&(WA.state[t.name]=!1),i&&i.remove(),d()})),WA.state.onVariableChange(t.name).subscribe((()=>{a&&(o.getBoolean("autoClose")||!0!==WA.state[t.name]||f(),s&&!0===WA.state[t.name]&&d(),o.getBoolean("autoOpen")||!1!==WA.state[t.name]||g())}))}function z(e){void 0===WA.state[e.name]&&(WA.state[e.name]=0),WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]&&function(e){const t=e.properties.mustGetString("bellSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=Math.sqrt(Math.pow(e.x-U,2)+Math.pow(e.y-O,2));if(t>o)return;n=1-t/o}WA.sound.loadSound(t).play({volume:n})}(e)}))}function D(e,t){let o;const n=t.mustGetString("zone"),r=t.getString("bellPopup");WA.room.onEnterZone(n,(()=>{var n;r?o=WA.ui.openPopup(r,"",[{label:null!==(n=t.getString("bellButtonText"))&&void 0!==n?n:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.onLeaveZone(n,(()=>{o&&(o.close(),o=void 0)}))}async function q(e){e=null!=e?e:B;const t=await i();G=await l();for(const e of t.values())e.properties.get("door")&&N(e),e.properties.get("bell")&&z(e);for(const o of G.values()){const r=new n(o.properties),i=r.getString("doorVariable");if(i&&"tilelayer"===o.type){const n=t.get(i);if(void 0===n)throw new Error('Cannot find variable "'+i+'" referred in the "doorVariable" property of layer "'+o.name+'"');_(o,n,r,e)}const s=r.getString("bellVariable");s&&D(s,r)}WA.player.onPlayerMove((e=>{U=e.x,O=e.y}))}function Y(e){const t=e.getString("bindVariable");if(t){const o=e.getString("zone");if(!o)throw new Error('A layer with a "bindVariable" property must ALSO have a "zone" property.');!function(e,t,o,n,r,i){i&&!WA.player.tags.includes(i)||(void 0!==o&&WA.room.onEnterZone(t,(()=>{r||(WA.state[e]=o)})),void 0!==n&&WA.room.onLeaveZone(t,(()=>{WA.state[e]=n})))}(t,o,e.get("enterValue"),e.get("leaveValue"),e.getString("triggerMessage"),e.getString("tag"))}}function F(){return WA.onInit().then((()=>{q().catch((e=>console.error(e))),async function(){const e=await l();for(const t of e.values())Y(new n(t.properties))}().catch((e=>console.error(e))),async function(e){const t=(await WA.room.getTiledMap()).layers.find((e=>"configuration"===e.name));if(t){const o=new n(t.properties).getString("tag");o&&!WA.player.tags.includes(o)||WA.ui.registerMenuCommand("Configure the room",(()=>{e=null!=e?e:B,WA.nav.openCoWebSite(e+"/configuration.html",!0)}))}}().catch((e=>console.error(e))),L().catch((e=>console.error(e)))}))}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,o),i.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{let e;(0,o(733).bootstrapExtra)().catch((e=>console.error(e)));const t=new Date,n=t.getHours()+":"+t.getMinutes();function r(){void 0!==e&&(e.close(),e=void 0)}let i;WA.room.onEnterZone("clock",(()=>{e=WA.ui.openPopup("clockPopup","It's "+n,[])})),WA.room.onLeaveZone("clock",r),WA.room.onEnterZone("djbooth",(()=>{e=WA.ui.openPopup("djboothPopup","Now playing: Nine Inch Nails (from the album The Slip, CC BY-NC-SA)",[])})),WA.room.onLeaveZone("djbooth",r);let s="",a=!1;const l="Greetings, mortal! What a nice day to join C3S, isn't it? You may proceed to the key, if you want to apply for membership. You can ask me one-word questions beginning with 'w' otherwise.",c="I don't know an answer to '",u="If I understand you right, you are asking: ";WA.room.onEnterZone("recruitment",(()=>{i="Recruitment Officer",a?a=!0:WA.chat.sendChatMessage(l,i)})),WA.room.onLeaveZone("recruitment",(()=>{i=void 0})),WA.chat.onChatMessage((e=>{"Recruitment Officer"==i&&e!=l&&e!=s&&e.substring(0,c.length)!=c&&e.substring(0,u.length)!=u&&(s=e,WA.chat.sendChatMessage(function(e){return"why"==e||"warum"==e?u+"Why you should become a member? If you are a music-prducing being, C3S needs your repertoire *now* to proof to autorities that it can sustain its business as a collecting society. Best soultion for this is to become a full member. Of course, if you don't do music, you can become investing member to support us in other ways (you will not have the right to vote on general assemblies but you may attend there).":"when"==e||"wann"==e?u+"When will be the best time to join? Now, of course! Oh, you mean when will we start operation?... Well, we spent 2021 writing a very sophisticated business plan to be approved by the authorities and maybe 2022 we'll start with a live tariff. (I know we sometimes used to tell people 'next year' or so before, when we were not aware of all implications, but now it may actually be within reach.)":"where"==e||"wo"==e?u+"Where we will become operational? First, in Germany; then we'll start field offices in other European countries. Currently our office is located in Düsseldorf.":"what"==e||"was"==e?u+"What is C3S all about? Now... C3S is about to become a music collective society. A collecting societies task is to allow everyone to use copyright-protected works without the user making contracts with each and every copyright holder. The user needs to license the use of works unter certain tariffs. C3S' speciality is that it allows the use of CC licenses -- but we want to also make a difference in other aspects like transparency or freedom to which works a rightsholder wants to let us manage.":c+e+"'"}(e),i))}))})()})();
//# sourceMappingURL=script.js.map