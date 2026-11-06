(()=>{var Xo=Object.defineProperty;var Fo=(e,r,n)=>r in e?Xo(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n;var Ye=(e,r,n)=>Fo(e,typeof r!="symbol"?r+"":r,n);var p="openchamber.sdk";var ge="data-oc-scrolling",qe=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [${ge}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${ge}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${ge}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${ge}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Jt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",m=>{let E=m.target===e?r:m.target;if(!(E instanceof Element))return;E.hasAttribute("data-oc-scrolling")||E.setAttribute("data-oc-scrolling","");let y=n.get(E);y!==void 0&&clearTimeout(y),n.set(E,setTimeout(()=>{n.delete(E),E.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Bo=`(${Jt.toString()})(document);`;var Zt=/^[a-z][a-z0-9-]{0,39}$/;var Yt=e=>Object(e)===e&&!Array.isArray(e),Qe=(e,r)=>Object.keys(e).every(n=>r.includes(n)),qt=e=>String(e)===e&&e.length>=1&&e.length<=60,Qt=e=>String(e)===e&&e.length>=1&&e.length<=80,eo=e=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!Yt(n)||!Zt.test(n.id)||!qt(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!Qe(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Qe(n,["kind","id","label","value","options","disabled"])||!Qt(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let m=new Set;for(let E of n.options){if(!Yt(E)||!Qe(E,["value","label"])||!Qt(E.value)||!qt(E.label)||m.has(E.value))return!1;m.add(E.value)}if(!m.has(n.value))return!1}return!0};var Ze=e=>"bytes"in e?e.bytes.byteLength:e.content.length,to=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var oo=/^[A-Za-z0-9_-]{1,80}$/;var ro=["left","right","top","bottom"];var no=(e,r=0,n={remaining:16e3})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let m=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let E of m)if(!no(E,r+1,n))return!1;return!0},et=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(r=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(et);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(et)}return String(e)===e||Number.isFinite(e)},tt=e=>{try{return String(e.id)!==e.id||!oo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ro.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!no(e.data)||!et(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var io=["file","directory","other","missing"],rt=e=>!!(e&&"sessionId"in e),nt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var ao=/^[0-9a-f]{7,64}$/i,st=e=>ao.test(e),Re=500,ke=32e3,co=16e3,lo=128,po=200,uo=2e3,Eo=16e3,_o=80,So=200,fo=16e3;var To=2e3;var it=2e4,ye=1024,ve=2e6;var Ue=64e3,Ce=8e3,at=4e3;var ct=96e4,zo=60*6e4;var mo=999,ho=1e4,Ee=500,Ao=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],xo=["stopped","starting","ready","failed"],jo=new Set(Ao),Oo=e=>jo.has(e),bo=e=>e&&Oo(e)?e:"HOST_REJECTED",ee=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(ee):Object(e)===e?Object.values(e).every(ee):!1,go=e=>ee(e)&&JSON.stringify(e).length<=fo,so=e=>e?.trim().slice(0,So)??"",te=e=>{let r=e.id.trim().slice(0,lo),n=e.title.trim().slice(0,po),m=e.url.trim().slice(0,uo),E=e.text?.trim().slice(0,Eo),y=e.author?.trim().slice(0,_o),B=e.kind==="pull"?"pull":"issue",M={providerId:e.providerId.trim(),id:r,title:n||r,url:m,kind:B};if(E&&(M.text=E),y&&(M.author=y),B==="pull"){let V=so(e.branches?.head),z=so(e.branches?.base);V&&z&&(M.branches={head:V,base:z})}return go(e.data)&&(M.data=e.data),M},dt=e=>{let r=te(e);return e.projectId&&(r.projectId=e.projectId),e.navigation&&(r.navigation=e.navigation),e.worktree&&(r.worktree=e.worktree),r},lt=e=>{let r={text:e.text.trim().slice(0,co)};return e.send&&(r.send=!0),r},pt=e=>e===null||!Number.isFinite(e)?null:Math.min(mo,Math.max(0,Math.round(e))),ut=e=>Number.isFinite(e)?Math.min(ho,Math.max(0,Math.ceil(e))):0;var oe=e=>e.length>0&&e.length<=ye&&!e.includes("\0")&&!e.includes("\\");var Ie=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>To?!1:!e.split("/").some(n=>n==="."||n===".."),Wo=new Set(xo),Et=e=>!!(e&&"status"in e&&Wo.has(String(e.status))&&!("body"in e)),we=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),_t=e=>!!(e&&"content"in e&&String(e.content)===e.content),St=e=>!!(e&&"written"in e&&e.written===!0),ft=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Ko=new Set(io),Tt=e=>!!(e&&"kind"in e&&"size"in e&&Ko.has(String(e.kind))&&Number.isFinite(e.size)),mt=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Jo=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Yo=e=>Object(e)===e?e:null,ot=e=>String(e)===e&&e.length>0,qo=e=>{if(!ot(e.id))return null;if(e.ok===!0){let r={channel:p,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(r.payload=e.payload),r}return e.ok===!1&&ot(e.error)?{channel:p,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:bo(ot(e.code)?e.code:void 0)}:null},ht=e=>{let r=Yo(e);return!r||r.channel!==p||r.v!==1?null:r.type==="result"?qo(r):!Jo.has(String(r.type))||Object(r.payload)!==r.payload?null:r};var Ro=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Qo=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",a=class extends Error{constructor(n,m){super(m);Ye(this,"code");this.name="HostRequestError",this.code=n}},ko=()=>Promise.reject(new a("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Le=()=>Promise.reject(new a("BAD_PATH",`File path must be 1 to ${ye} characters without NUL or backslash.`)),Me=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new a("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},l=e=>(e.value+=1,`oc-${e.value}`),gt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new a("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(t=>t===r.parent),m=e.requestTimeoutMs??it,E=new Set,y=new Set,B=new Set,M=new Set,V=new Set,z=new Set,ie=new Set,Te=new Set,me=new Set,Y=new Set,ze=[],ae=null,ce=null,he=new Set,Ae=new Set,de=null,le=null,je=!1,q=new Map,Q=new Map,Z=new Map,G=!1,d={value:0},c=null,P=null,pe=!1,ue=!1,Pt=null,Dt=t=>t?{sessionId:t.id,phase:t.busy?"started":"completed"}:null,C=t=>{r.parent.postMessage(t,"*")},Ht=()=>{G||r.parent===r||Y.size===0||c?.features?.lateGenerateResults!==!0||C({channel:p,v:1,type:"generate-late-listen"})},h=(t,o)=>{for(let s of t)try{s(o)}catch(i){console.error(i)}},$t=t=>{if(!(t instanceof MessageEvent)||!n(t.source))return;let o=ht(t.data);if(!o)return;if(o.type==="workspace"){let i=Q.get(o.payload.subscriptionId);i&&h([i],o.payload.snapshot);return}if(o.type==="shells"){let i=Z.get(o.payload.subscriptionId);i&&h([i],o.payload.snapshot);return}if(o.type==="ready"){c=o.payload,P=Dt(o.payload.session),h(E,o.payload),h(y,o.payload.directory),h(B,o.payload.session),P&&h(M,P),h(V,o.payload.connection),h(z,o.payload.settings),h(ie,o.payload.item),Ht();return}if(o.type==="generate-late"){Y.size===0?ze.push(o.payload):h(Y,o.payload);return}if(o.type==="directory"){c&&(c={...c,directory:o.payload.directory}),h(y,o.payload.directory);return}if(o.type==="session"){c&&(c={...c,session:o.payload.session}),o.payload.session?P?.sessionId!==o.payload.session.id&&(P=Dt(o.payload.session)):P=null,h(B,o.payload.session);return}if(o.type==="session-lifecycle"){P=o.payload,h(M,o.payload);return}if(o.type==="connection"){c&&(c={...c,connection:o.payload.connection}),h(V,o.payload.connection);return}if(o.type==="settings"){c&&(c={...c,settings:o.payload.settings}),h(z,o.payload.settings);return}if(o.type==="item"){c&&(c={...c,item:o.payload.item}),h(ie,o.payload.item);return}if(o.type==="status-control-event"){h(Te,o.payload);return}if(o.type==="popover-closed"){h(me,o.payload);return}if(o.type==="action"){let i=_=>{G||C({channel:p,v:1,type:"action-result",id:o.id,payload:_})},S=ce;if(!S){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>S(o.payload)).then(()=>i({ok:!0}),_=>{let b=(_ instanceof Error?_.message:String(_)).trim();i({ok:!1,error:(b||"Action failed.").slice(0,Ee)})});return}if(o.type==="file-open"){let i=o.payload;if(le&&to(le,i))return;le=i,h(he,o.payload);return}if(o.type==="file-saved"){h(Ae,o.payload.version);return}if(o.type==="file-snapshot"){let i=b=>{G||C({channel:p,v:1,type:"file-snapshot-result",id:o.id,payload:b})},S=b=>i({error:(b.trim()||"Could not read the edited file.").slice(0,Ee)}),_=de;if(!_){S("This extension does not edit files.");return}Promise.resolve().then(()=>_(o.payload.purpose)).then(b=>{if(Ze(b)>2e7){S(`The file is over ${2e7} ${"bytes"in b?"bytes":"characters"}.`);return}if(b.version.length>256){S(`The snapshot version is over ${256} characters.`);return}i({snapshot:"bytes"in b?{bytes:b.bytes,version:b.version}:{content:b.content,version:b.version}})},b=>S(b instanceof Error?b.message:String(b)));return}if(o.type==="resolve"){let i=_=>{C({channel:p,v:1,type:"resolve-result",id:o.id,payload:_})},S=ae;if(!S){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>S(o.payload)).then(_=>i({item:_?te(_):null}),_=>{let b=(_ instanceof Error?_.message:String(_)).trim();i({error:(b||"Command failed.").slice(0,Ee)})});return}let s=q.get(o.id);if(s){if(clearTimeout(s.timer),q.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new a(o.code,o.error))}};r.addEventListener("message",$t),C({channel:p,v:1,type:"hello"});let g=(t,o=m)=>G||r.parent===r?Promise.reject(new a("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((s,i)=>{let S=setTimeout(()=>{q.delete(t.id),i(new a("HOST_TIMEOUT","Host did not answer in time."))},o);q.set(t.id,{resolve:s,reject:i,timer:S}),C(t)}),x=t=>g(t).then(()=>{}),O={channel:p,v:1},We=t=>{!G&&r.parent!==r&&C(t)},Xt=()=>We({...O,type:"file-save"}),Ft=t=>{!Ro(t)||!Qo(t)||(t.preventDefault(),Xt())},Bt=t=>{!Ro(t)||t.key!=="Escape"||c?.surface!=="popover"||!c.popover||(t.preventDefault(),Wt(c.popover.id,"escape").catch(()=>{}))},xe=()=>{let t=c?.surface==="popover"?c.popover:void 0;if(!t)return;let o=pe||ue;Pt!==o&&(Pt=o,Kt(t.id,o).catch(()=>{}))},Oe=()=>{c?.surface!=="popover"||pe||(pe=!0,xe())},Vt=t=>{c?.surface!=="popover"||t.relatedTarget!==null||!pe||(pe=!1,xe())},zt=()=>{c?.surface!=="popover"||ue||(ue=!0,xe())},jt=()=>{c?.surface!=="popover"||!ue||(ue=!1,xe())},N=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new a("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Ke=async t=>{t.kind!=="projects"&&N(t.projectId);let o=await g({...O,type:"workspace-read",id:l(d),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new a("HOST_REJECTED","Host did not return workspace data.");return o},Je=async(t,o)=>{t.kind!=="projects"&&N(t.projectId);let s=l(d);Q.set(s,o);try{await x({...O,type:"workspace-subscribe",id:l(d),payload:{subscriptionId:s,query:t}})}catch(i){throw Q.delete(s),G||C({...O,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}}),i}return()=>{!Q.delete(s)||G||C({...O,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},$o=async(t,o)=>{t.kind==="session"&&N(t.sessionId),t.kind==="project"&&N(t.projectId);let s=l(d);Z.set(s,o);try{await x({...O,type:"shells-subscribe",id:l(d),payload:{subscriptionId:s,scope:t}})}catch(i){throw Z.delete(s),G||C({...O,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}}),i}return()=>{!Z.delete(s)||G||C({...O,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},be=async t=>{if("key"in t&&(t.key.length===0||t.key.length>128))throw new a("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ee(t.value))throw new a("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>65536)throw new a("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&c?.features?.deviceStorage!==!0)throw new a("UNSUPPORTED","This host does not support device storage.");let o=await g({...O,type:"storage",id:l(d),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new a("HOST_REJECTED","Host did not return storage data.");return o},Wt=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):x({...O,type:"popover-close",id:l(d),payload:o?{id:t,reason:o}:{id:t}}),Kt=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):x({...O,type:"popover-anchor",id:l(d),payload:{id:t,active:o}});return r.addEventListener("keydown",Bt,!0),r.addEventListener("pointerover",Oe),r.addEventListener("pointermove",Oe),r.addEventListener("pointerout",Vt),r.addEventListener("focus",zt),r.addEventListener("blur",jt),{onAction:t=>(ce=t,()=>{ce===t&&(ce=null)}),listProjects:async()=>{let t=await Ke({kind:"projects"});if(t.kind!=="projects")throw new a("HOST_REJECTED","Expected projects.");return t},listWorktrees:async t=>{let o=await Ke({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new a("HOST_REJECTED","Expected worktrees.");return o},listSessions:async t=>{let o=await Ke({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new a("HOST_REJECTED","Expected sessions.");return o},onProjects:t=>Je({kind:"projects"},o=>{o.kind==="projects"&&t(o)}),onWorktrees:(t,o)=>Je({kind:"worktrees",projectId:t},s=>{s.kind==="worktrees"&&o(s)}),onSessions:(t,o)=>Je({kind:"sessions",projectId:t},s=>{s.kind==="sessions"&&o(s)}),onRunningShells:(t,o)=>$o(t,o),readShellOutput:async(t,o)=>{N(t,128);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new a("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>65536))throw new a("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let _=await g({...O,type:"shell-output",id:l(d),payload:{shellId:t,cursor:s,tailBytes:i}});if(!_||typeof _.output!="string"||!Number.isFinite(_.cursor))throw new a("HOST_REJECTED","Host did not return shell output.");return _},stopShell:async t=>{if(N(t,128),(await g({...O,type:"shell-stop",id:l(d),payload:{shellId:t}}))?.stopped!==!0)throw new a("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async t=>{N(t),await x({...O,type:"open-session",id:l(d),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=Me(o),i={op:"get",key:t};s&&(i.scope=s);let S=await be(i);return S.op==="get"&&S.found?S.value:void 0},set:async(t,o,s)=>{let i=Me(s),S={op:"set",key:t,value:o};i&&(S.scope=i),await be(S)},delete:async(t,o)=>{let s=Me(o),i={op:"delete",key:t};s&&(i.scope=s),await be(i)},keys:async t=>{let o=Me(t),s={op:"keys"};o&&(s.scope=o);let i=await be(s);if(i.op!=="keys")throw new a("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:t=>(E.add(t),c&&t(c),()=>{E.delete(t)}),onDirectory:t=>(y.add(t),c&&t(c.directory),()=>{y.delete(t)}),onSession:t=>(B.add(t),c&&t(c.session),()=>{B.delete(t)}),onSessionLifecycle:t=>(M.add(t),P&&t(P),()=>{M.delete(t)}),onConnection:t=>(V.add(t),c&&t(c.connection),()=>{V.delete(t)}),onSettings:t=>(z.add(t),c&&t(c.settings),()=>{z.delete(t)}),onItem:t=>(ie.add(t),c&&t(c.item),()=>{ie.delete(t)}),onStatusControl:t=>(Te.add(t),()=>{Te.delete(t)}),onPopoverClosed:t=>(me.add(t),()=>{me.delete(t)}),setStatusControls:t=>c?.features?.statusControls!==!0?Promise.reject(new a("UNSUPPORTED","This host does not support status controls.")):eo(t)?x({...O,type:"status-controls",id:l(d),payload:{controls:t}}):Promise.reject(new a("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:t=>c?.features?.popovers!==!0?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):tt(t)?x({...O,type:"popover-open",id:l(d),payload:t}):Promise.reject(new a("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Wt,setPopoverAnchorActive:Kt,onResolve:t=>(ae=t,()=>{ae===t&&(ae=null)}),toast:t=>{let o=t.message.trim();return!o||o.length>Re?Promise.reject(new a("HOST_REJECTED",`Toast message must contain 1 to ${Re} characters.`)):t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ke)?Promise.reject(new a("HOST_REJECTED",`Toast copy text must contain 1 to ${ke} characters.`)):x({channel:p,v:1,type:"toast",id:l(d),payload:{...t,message:o}})},openUrl:t=>x({channel:p,v:1,type:"open-url",id:l(d),payload:{url:t}}),openCommit:t=>st(t)?x({channel:p,v:1,type:"open-commit",id:l(d),payload:{sha:t}}):Promise.reject(new a("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:t=>x({channel:p,v:1,type:"open-surface",id:l(d),payload:{surfaceId:t}}),writeClipboard:t=>x({channel:p,v:1,type:"clipboard-write",id:l(d),payload:{text:t}}),compose:t=>x({channel:p,v:1,type:"compose",id:l(d),payload:t}),attach:t=>x({channel:p,v:1,type:"attach",id:l(d),payload:te(t)}),startSession:async t=>{t.projectId!==void 0&&N(t.projectId);let o=t.worktree;o&&o!==!0&&(o.kind==="existing"?N(o.directory):(o.name!==void 0&&N(o.name,200),o.baseBranch!==void 0&&N(o.baseBranch,200)));let s=await g({channel:p,v:1,type:"start-session",id:l(d),payload:dt(t)},e.requestTimeoutMs??18e4);if(!rt(s))throw new a("HOST_REJECTED","Host did not return a session.");return s},prompt:t=>g({channel:p,v:1,type:"prompt",id:l(d),payload:lt(t)}).then(o=>{if(!nt(o))throw new a("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:t=>x({channel:p,v:1,type:"session-link",id:l(d),payload:te(t)}),close:()=>x({channel:p,v:1,type:"close",id:l(d)}),oauthStart:()=>x({channel:p,v:1,type:"oauth-start",id:l(d)}),oauthDisconnect:()=>x({channel:p,v:1,type:"oauth-disconnect",id:l(d)}),request:t=>(Ie(t.path)?g({channel:p,v:1,type:"request",id:l(d),payload:t}):ko()).then(o=>{if(!we(o))throw new a("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:t=>(Ie(t.path)?g({channel:p,v:1,type:"service-request",id:l(d),payload:t}):ko()).then(o=>{if(!we(o))throw new a("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>g({channel:p,v:1,type:"service-status",id:l(d)}).then(t=>{if(!Et(t))throw new a("HOST_REJECTED","Host did not return service status.");return t}),readFile:t=>(oe(t)?g({channel:p,v:1,type:"file-read",id:l(d),payload:{path:t}}):Le()).then(o=>{if(!_t(o))throw new a("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>oe(t)?o.length>ve?Promise.reject(new a("FILE_TOO_LARGE",`Content is over ${ve} characters.`)):g({channel:p,v:1,type:"file-write",id:l(d),payload:{path:t,content:o}}).then(s=>{if(!St(s))throw new a("HOST_REJECTED","Host did not confirm the write.");return s}):Le(),listDir:t=>(oe(t)?g({channel:p,v:1,type:"file-list",id:l(d),payload:{path:t}}):Le()).then(o=>{if(!ft(o))throw new a("HOST_REJECTED","Host did not return directory entries.");return o}),stat:t=>(oe(t)?g({channel:p,v:1,type:"file-stat",id:l(d),payload:{path:t}}):Le()).then(o=>{if(!Tt(o))throw new a("HOST_REJECTED","Host did not return file status.");return o}),generate:t=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>Ue)return Promise.reject(new a("HOST_REJECTED",`Prompt must be 1 to ${Ue} characters.`));if(s!==void 0&&(s.length===0||s.length>Ce))return Promise.reject(new a("HOST_REJECTED",`System prompt must be 1 to ${Ce} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(at,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new a("HOST_REJECTED","maxOutputTokens must be a number."));let S={prompt:o};return s!==void 0&&(S.system=s),i!==void 0&&(S.maxOutputTokens=i),g({channel:p,v:1,type:"generate",id:l(d),payload:S},e.requestTimeoutMs??ct).then(_=>{if(!mt(_))throw new a("HOST_REJECTED","Host did not return generated text.");return _})},onLateGenerateResult:t=>{Y.add(t);for(let o of ze.splice(0))h([t],o);return Ht(),()=>{Y.delete(t)}},setBadge:t=>x({channel:p,v:1,type:"badge",id:l(d),payload:{count:pt(t)}}),setHeight:t=>x({channel:p,v:1,type:"resize",id:l(d),payload:{height:ut(t)}}),onFileOpen:t=>(he.add(t),je||(je=!0,r.addEventListener("keydown",Ft,!0)),le&&t(le),()=>{he.delete(t)}),onFileSnapshot:t=>(de=t,()=>{de===t&&(de=null)}),onFileSaved:t=>(Ae.add(t),()=>{Ae.delete(t)}),reportFileChange:t=>We({...O,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Xt,reportFileUnsupported:()=>We({...O,type:"file-unsupported"}),dispose:()=>{for(let t of Q.keys())C({...O,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:t}});Q.clear();for(let t of Z.keys())C({...O,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:t}});Z.clear(),G=!0,ae=null,ce=null,de=null,he.clear(),Ae.clear(),je&&r.removeEventListener("keydown",Ft,!0),r.removeEventListener("message",$t),r.removeEventListener("keydown",Bt,!0),r.removeEventListener("pointerover",Oe),r.removeEventListener("pointermove",Oe),r.removeEventListener("pointerout",Vt),r.removeEventListener("focus",zt),r.removeEventListener("blur",jt);for(let t of q.values())clearTimeout(t.timer),t.reject(new a("HOST_UNAVAILABLE","Host client was disposed."));q.clear(),E.clear(),y.clear(),B.clear(),M.clear(),V.clear(),z.clear(),ie.clear(),Te.clear(),me.clear(),Y.clear(),ze.length=0}}};var Uo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Br=new Set(Uo);var Zo=10*6e4;var Co=["none","agent","user"];var jr=new Set(Co);var er=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],tr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Io=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,m]of er)r.style.setProperty(n,e.tokens[m]);for(let[n,m,E]of tr){let y=e.tokens[E]??"";r.style.setProperty(n,y),r.style.setProperty(m,y)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Rt=(e,r)=>{Io(e.theme,r),r.dataset&&(r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode)};var or={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,r)=>`var(--${e}, var(--oc-${or[e]}, ${r}))`,H=T("surface-background","transparent"),Ge=T("surface-elevated","transparent"),re=T("surface-elevated-foreground","inherit"),w=T("surface-foreground","inherit"),f=T("surface-muted-foreground","gray"),rr=T("surface-muted","transparent"),j=T("interactive-border","currentColor"),R=T("interactive-hover","transparent"),K=T("interactive-active","transparent"),kt=T("interactive-selection","transparent"),yt=T("interactive-selection-foreground","inherit"),D=T("primary","currentColor"),vt=T("primary-text","inherit"),Ut=T("error-text","inherit"),nr=T("font-sans","inherit"),Ct=T("font-mono","monospace"),Go=T("radius","9px"),It=`calc(${Go} - 2px)`,wo=`calc(${Go} - 4px)`,A=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Lo=`background-image: linear-gradient(${R}, ${R});`,wt=e=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,Lt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Mo="box-shadow: var(--oc-sdk-lit);",No=`inset 0 1px 0 0 ${A(w,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,sr=`
:root {
  --oc-sdk-edge: ${A(w,10)};
  --oc-sdk-field-bg: ${Ge};
  --oc-sdk-raised-bg: ${H};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.1);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${A(w,6)};
  --oc-sdk-field-bg: ${A(H,50,Ge)};
  --oc-sdk-raised-bg: ${Ge};
  --oc-sdk-field-lift: ${No};
  --oc-sdk-raised-lift: ${No};
  --oc-sdk-lit: inset 0 1px 0 0 ${A(w,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.36);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Ne=e=>{let r=T(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},ir=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Po=`${sr}
.oc-sdk { color: ${w}; font-family: ${nr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Lo} }
.oc-sdk-mono { font-family: ${Ct}; }
.oc-sdk-muted { color: ${f}; }
${Ne("success")}${Ne("warning")}${Ne("error")}${Ne("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${D}; --oc-sdk-tone-text: ${vt}; }

.oc-sdk-btn { border-radius: ${It}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${wo}; }
.oc-sdk-btn[data-variant="default"] { color: ${vt}; background: ${A(D,10,H)}; border-color: ${A(D,12)}; ${Mo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${A(D,16,H)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${A(D,22,H)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${rr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${R}, ${R}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${re}; ${Lt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${R}, ${R}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${K}, ${K}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${R}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${K}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${T("status-error","red")}; color: ${Ut}; background: ${A("var(--oc-sdk-tone)",7,H)}; border-color: ${A("var(--oc-sdk-tone)",12)}; ${Mo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${A("var(--oc-sdk-tone)",9,H)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${A("var(--oc-sdk-tone)",11,H)}; box-shadow: none; }

.oc-sdk-field-note { color: ${f}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Ut}; }
.oc-sdk-input { border-radius: ${It}; background: var(--oc-sdk-field-bg); color: ${re}; ${wt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${f}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${R}, ${R}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${wt(A(w,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${wt(T("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${Ct}; }

.oc-sdk-search-icon { color: ${f}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${D}; }
.oc-sdk-search-clear { border-radius: ${wo}; color: ${f}; }
.oc-sdk-search-clear:hover { background: ${R}; color: ${w}; }

.oc-sdk-trigger { border-radius: ${It}; background: var(--oc-sdk-raised-bg); color: ${re}; ${Lt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${R}, ${R}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${f}; }
.oc-sdk-trigger-chevron { color: ${f}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${re}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ge}; background-clip: padding-box; color: ${re}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${R}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${kt}; color: ${yt}; }
.oc-sdk-option-check { color: ${w}; }
.oc-sdk-option[data-destructive="true"] { color: ${Ut}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${A(T("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${f}; }
.oc-sdk-popup-empty { color: ${f}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${j}; border-radius: 4px; color: ${w}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${A(w,60,j)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${j}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${H}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${D}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Lo} }
.oc-sdk-check-desc { color: ${f}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${A(w,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${f}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${w}; }
.oc-sdk-tab[aria-selected="true"] { color: ${yt}; background: ${kt}; border-color: ${j}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${re}; background: var(--oc-sdk-raised-bg); ${Lt} }
.oc-sdk-tab-count { color: ${f}; }

.oc-sdk-badge { border-radius: 9999px; background: ${R}; color: ${f}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${A("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${R}; }
.oc-sdk-row[aria-selected="true"] { background: ${kt}; color: ${yt}; }
.oc-sdk-row-lead { font-family: ${Ct}; color: ${f}; }
.oc-sdk-row-sub { color: ${f}; }
.oc-sdk-row-meta { color: ${f}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${f}; }

.oc-sdk-empty-body { color: ${f}; }

.oc-sdk-spinner { color: ${f}; }
.oc-sdk-spinner-ring { border-color: ${j}; border-top-color: ${D}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${A("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${f}; }

.oc-sdk-separator { color: ${f}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${A(j,40)}; }

.oc-sdk-progress-label { color: ${f}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${j}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${D}); }

.oc-sdk-text a { color: ${vt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${A(j,60)}; }
`,k=`
${qe}
${ir}
${Po}`;var fe=gt(),W=document.querySelector("#root"),Do=!1,Fe="panel",J=null,se="",L=null,F="",Be=!0,Xe=0,Ve,X=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),I=e=>{let r=Number(e);return!Number.isFinite(r)||r<=0?"0":r>=1e9?`${(r/1e9).toFixed(2)}B`:r>=1e6?`${(r/1e6).toFixed(2)}M`:r>=1e3?`${(r/1e3).toFixed(1)}K`:String(Math.round(r))},pr=e=>{let r=Number(e);return Number.isFinite(r)?Math.round(r).toLocaleString("zh-CN"):"0"},Ho=e=>{let r=Number(e);return!Number.isFinite(r)||r<=0?"$0.0000":r<1e-4?"<$0.0001":`$${r.toFixed(4)}`},ur=e=>!e||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),Er=e=>{let r=e.input+e.cacheRead+e.cacheWrite;return r<=0?"\u2014":`${Math.min(100,e.cacheRead/r*100).toFixed(1)}%`},Gt=(e,r,n=!1)=>{W&&(W.innerHTML=`
    <div class="state">
      <div class="state-title ${n?"state-error":""}">${X(e)}</div>
      ${r?`<div class="state-body">${X(r)}</div>`:""}
    </div>
  `)},_r=()=>{if(!W)return;let e=L?.tokens??{input:0,output:0,reasoning:0,cacheRead:0,cacheWrite:0,total:0},r=L?.includingChildren,n=ur(L?.updatedAt);W.innerHTML=`
    <div class="panel">
      <div class="card">
        <div class="card-head">
          <span class="card-title">\u5F53\u524D\u4F1A\u8BDD\u7D2F\u8BA1</span>
          <span class="muted mono">${X(se||"")}</span>
        </div>
        <div class="card-total mono">${I(e.total)}<span class="card-total-unit">tokens</span></div>
        <div class="card-sub muted">${n?`\u66F4\u65B0\u4E8E ${X(n)}`:"\u603B\u8BA1"} \xB7 ${X(pr(e.total))} tokens</div>
      </div>
      <div class="grid">
        <div class="cell"><div class="cell-label">\u8F93\u5165</div><div class="cell-value mono">${I(e.input)}</div></div>
        <div class="cell"><div class="cell-label">\u8F93\u51FA</div><div class="cell-value mono">${I(e.output)}</div></div>
        <div class="cell"><div class="cell-label">\u63A8\u7406</div><div class="cell-value mono">${I(e.reasoning)}</div></div>
        <div class="cell"><div class="cell-label">\u7F13\u5B58\u8BFB\u53D6</div><div class="cell-value mono">${I(e.cacheRead)}</div></div>
        <div class="cell"><div class="cell-label">\u7F13\u5B58\u5199\u5165</div><div class="cell-value mono">${I(e.cacheWrite)}</div></div>
        <div class="cell"><div class="cell-label">\u7F13\u5B58\u547D\u4E2D</div><div class="cell-value mono accent">${X(Er(e))}</div></div>
      </div>
      <div class="children muted">
        <span>\u6210\u672C ${X(Ho(L?.cost))}</span>
        ${r?`<span>\u542B\u5B50\u4F1A\u8BDD ${r.sessions} \u4E2A \xB7 ${I(r.tokens.total)}</span>`:""}
      </div>
    </div>
  `},Sr=()=>{if(!W)return;let e=L?.tokens??{input:0,output:0,reasoning:0,cacheRead:0,cacheWrite:0,total:0},r=L?.includingChildren;W.innerHTML=`
    <div class="status">
      <div class="status-head">
        <span class="status-label">\u4F1A\u8BDD Token</span>
        <span class="status-total mono">${I(e.total)}<span class="status-total-unit">tokens</span></span>
      </div>
      <div class="status-line">
        <span>\u2191 <b class="mono">${I(e.input)}</b></span>
        <span>\u2193 <b class="mono">${I(e.output)}</b></span>
        <span>\u63A8\u7406 <b class="mono">${I(e.reasoning)}</b></span>
        <span>\u7F13\u5B58 <b class="mono">${I(e.cacheRead)}</b></span>
      </div>
      <div class="status-line">
        <span>${X(Ho(L?.cost))}</span>
        ${r?`<span>\u542B\u5B50\u4F1A\u8BDD ${I(r.tokens.total)}</span>`:""}
      </div>
    </div>
  `},_e=()=>{if(W){if(document.body.dataset.surface=Fe,!J){Gt("\u672A\u6253\u5F00\u4F1A\u8BDD","\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u540E\u663E\u793A\u7D2F\u8BA1 token\u3002");return}if(Be&&!L){Gt("\u8BFB\u53D6\u4E2D","\u6B63\u5728\u8BFB\u53D6\u4F1A\u8BDD\u7D2F\u8BA1 token\u2026");return}if(F&&!L){Gt("\u65E0\u6CD5\u8BFB\u53D6\u7528\u91CF",F,!0);return}Fe==="status"?Sr():_r(),F&&W.insertAdjacentHTML("beforeend",`<div class="state-body state-error" style="margin-top:6px">${X(F)}</div>`)}},fr=e=>{let r=e?.code??"";return r==="NO_SERVICE"?"\u672C\u5730\u670D\u52A1\u672A\u542F\u52A8\u6216\u672A\u6388\u6743\u3002\u8BF7\u5728 \u8BBE\u7F6E \u2192 \u6269\u5C55 \u4E2D\u6279\u51C6\u6B64\u6269\u5C55\u3002":r==="SERVICE_FAILED"?"\u672C\u5730\u670D\u52A1\u542F\u52A8\u5931\u8D25\u3002\u8BF7\u68C0\u67E5\u6269\u5C55\u662F\u5426\u5DF2\u542F\u7528\u3002":r==="REQUEST_FAILED"||r==="HOST_TIMEOUT"?"\u672C\u5730\u670D\u52A1\u6CA1\u6709\u54CD\u5E94\u3002\u8BF7\u91CD\u65B0\u6253\u5F00\u9762\u677F\u6216\u91CD\u542F OpenChamber\u3002":r==="DISABLED"?"\u6269\u5C55\u5DF2\u88AB\u6682\u505C\u3002\u8BF7\u5728 \u8BBE\u7F6E \u2192 \u6269\u5C55 \u4E2D\u542F\u7528\u5B83\u3002":e?.message?`${r?`${r}: `:""}${e.message}`:"\u672A\u77E5\u9519\u8BEF"},Tr=(e,r)=>{let n=null;try{n=JSON.parse(e)}catch{n=null}return n?.error==="db-missing"?"\u627E\u4E0D\u5230 OpenCode \u6570\u636E\u5E93\uFF08opencode.db\uFF09\u3002":n?.error==="schema-unsupported"?"\u5F53\u524D OpenCode \u6570\u636E\u5E93\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u4F1A\u8BDD token \u8868\u3002":n?.error==="session-not-found"?"\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709 token \u8BB0\u5F55\u3002":n?.message?n.message:`\u670D\u52A1\u8FD4\u56DE HTTP ${r}`},Se=async()=>{let e=J;if(!e){L=null,Be=!1,F="",_e();return}let r=++Xe;try{let n=await fe.serviceRequest({method:"GET",path:"/usage",query:{sessionId:e}});if(r!==Xe||e!==J)return;if(n.status===200){let m=JSON.parse(n.body);L=m,F="",se=m.title||se}else F=Tr(n.body,n.status)}catch(n){if(r!==Xe||e!==J)return;F=fr(n)}finally{r===Xe&&(Be=!1,_e())}},mr=()=>{Ve===void 0&&(Ve=window.setInterval(()=>{Se()},2e3))};fe.onReady(e=>{Rt(e,document.documentElement),document.body.dataset.theme=e.theme?.mode==="dark"?"dark":"light",Fe=e.surface==="status"?"status":"panel",J=e.session?.id??null,se=e.session?.title??se,document.body.dataset.surface=Fe,Do?(_e(),Se()):(Do=!0,_e(),Se(),mr())});fe.onSession(e=>{let r=e?.id??null,n=r!==J;J=r,e?.title&&(se=e.title),n&&(L=null,F="",Be=!!r,_e(),Se())});fe.onSessionLifecycle(e=>{e?.phase==="completed"&&Se()});window.addEventListener("beforeunload",()=>{Ve!==void 0&&window.clearInterval(Ve),fe.dispose()});})();
