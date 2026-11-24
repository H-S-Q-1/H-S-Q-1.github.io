import{n as Xe,p as qe,q as Ge,s as le,v as a,x as se,y as J,z as x,A as ce,d as xe,B as Je,C as ye,D as I,E as Qe,G as et,b as V,H as tt,I as Q,J as f,K as S,L as A,M as ee,N as y,O as nt,P as ot,Q as te,R as de,S as ue,o as rt,e as at,i as b,w as F,h as B,T as D,f as fe,j as he,F as it,U as lt,m as st,V as ct}from"./index-0057b7fe.js";import{w as dt}from"./defaults-abe0836b.js";import{u as ut,_ as ft}from"./FormItem-40e7b617.js";const ht=e=>{const{primaryColor:t,opacityDisabled:n,borderRadius:o,textColor3:l}=e,s="rgba(0, 0, 0, .14)";return Object.assign(Object.assign({},qe),{iconColor:l,textColor:"white",loadingColor:t,opacityDisabled:n,railColor:s,railColorActive:t,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:o,railBorderRadiusMedium:o,railBorderRadiusLarge:o,buttonBorderRadiusSmall:o,buttonBorderRadiusMedium:o,buttonBorderRadiusLarge:o,boxShadowFocus:`0 0 0 2px ${Ge(t,{alpha:.2})}`})},bt={name:"Switch",common:Xe,self:ht},gt=bt,pt=le("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[a("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),a("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),a("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),le("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[se({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),a("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),a("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),a("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),J("&:focus",[a("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),x("round",[a("rail","border-radius: calc(var(--n-rail-height) / 2);",[a("button","border-radius: calc(var(--n-button-height) / 2);")])]),ce("disabled",[ce("icon",[x("rubber-band",[x("pressed",[a("rail",[a("button","max-width: var(--n-button-width-pressed);")])]),a("rail",[J("&:active",[a("button","max-width: var(--n-button-width-pressed);")])]),x("active",[x("pressed",[a("rail",[a("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),a("rail",[J("&:active",[a("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),x("active",[a("rail",[a("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),a("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[a("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[se()]),a("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),x("active",[a("rail","background-color: var(--n-rail-color-active);")]),x("loading",[a("rail",`
 cursor: wait;
 `)]),x("disabled",[a("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),vt=Object.assign(Object.assign({},ye.props),{size:{type:String,default:"medium"},value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},onChange:[Function,Array]});let E;const mt=xe({name:"Switch",props:vt,setup(e){E===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?E=CSS.supports("width","max(1px)"):E=!1:E=!0);const{mergedClsPrefixRef:t,inlineThemeDisabled:n}=Je(e),o=ye("Switch","-switch",pt,gt,e,t),l=ut(e),{mergedSizeRef:s,mergedDisabledRef:d}=l,u=I(e.defaultValue),k=Qe(e,"value"),v=et(k,u),C=V(()=>v.value===e.checkedValue),m=I(!1),r=I(!1),g=V(()=>{const{railStyle:i}=e;if(i)return i({focused:r.value,checked:C.value})});function p(i){const{"onUpdate:value":N,onChange:L,onUpdateValue:M}=e,{nTriggerFormInput:H,nTriggerFormChange:Y}=l;N&&te(N,i),M&&te(M,i),L&&te(L,i),u.value=i,H(),Y()}function R(){const{nTriggerFormFocus:i}=l;i()}function O(){const{nTriggerFormBlur:i}=l;i()}function j(){e.loading||d.value||(v.value!==e.checkedValue?p(e.checkedValue):p(e.uncheckedValue))}function h(){r.value=!0,R()}function Pe(){r.value=!1,O(),m.value=!1}function Ie(i){e.loading||d.value||i.key===" "&&(v.value!==e.checkedValue?p(e.checkedValue):p(e.uncheckedValue),m.value=!1)}function Oe(i){e.loading||d.value||i.key===" "&&(i.preventDefault(),m.value=!0)}const ie=V(()=>{const{value:i}=s,{self:{opacityDisabled:N,railColor:L,railColorActive:M,buttonBoxShadow:H,buttonColor:Y,boxShadowFocus:je,loadingColor:Ne,textColor:Le,iconColor:Me,[A("buttonHeight",i)]:w,[A("buttonWidth",i)]:We,[A("buttonWidthPressed",i)]:Ke,[A("railHeight",i)]:_,[A("railWidth",i)]:T,[A("railBorderRadius",i)]:Ze,[A("buttonBorderRadius",i)]:He},common:{cubicBezierEaseInOut:Ye}}=o.value;let X,q,G;return E?(X=`calc((${_} - ${w}) / 2)`,q=`max(${_}, ${w})`,G=`max(${T}, calc(${T} + ${w} - ${_}))`):(X=ee((y(_)-y(w))/2),q=ee(Math.max(y(_),y(w))),G=y(_)>y(w)?T:ee(y(T)+y(w)-y(_))),{"--n-bezier":Ye,"--n-button-border-radius":He,"--n-button-box-shadow":H,"--n-button-color":Y,"--n-button-width":We,"--n-button-width-pressed":Ke,"--n-button-height":w,"--n-height":q,"--n-offset":X,"--n-opacity-disabled":N,"--n-rail-border-radius":Ze,"--n-rail-color":L,"--n-rail-color-active":M,"--n-rail-height":_,"--n-rail-width":T,"--n-width":G,"--n-box-shadow-focus":je,"--n-loading-color":Ne,"--n-text-color":Le,"--n-icon-color":Me}}),U=n?tt("switch",V(()=>s.value[0]),ie,e):void 0;return{handleClick:j,handleBlur:Pe,handleFocus:h,handleKeyup:Ie,handleKeydown:Oe,mergedRailStyle:g,pressed:m,mergedClsPrefix:t,mergedValue:v,checked:C,mergedDisabled:d,cssVars:n?void 0:ie,themeClass:U?.themeClass,onRender:U?.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:t,checked:n,mergedRailStyle:o,onRender:l,$slots:s}=this;l?.();const{checked:d,unchecked:u,icon:k,"checked-icon":v,"unchecked-icon":C}=s,m=!(Q(k)&&Q(v)&&Q(C));return f("div",{role:"switch","aria-checked":n,class:[`${e}-switch`,this.themeClass,m&&`${e}-switch--icon`,n&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},f("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:o},S(d,r=>S(u,g=>r||g?f("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},f("div",{class:`${e}-switch__rail-placeholder`},f("div",{class:`${e}-switch__button-placeholder`}),r),f("div",{class:`${e}-switch__rail-placeholder`},f("div",{class:`${e}-switch__button-placeholder`}),g)):null)),f("div",{class:`${e}-switch__button`},S(k,r=>S(v,g=>S(C,p=>f(nt,null,{default:()=>this.loading?f(ot,{key:"loading",clsPrefix:e,strokeWidth:20}):this.checked&&(g||r)?f("div",{class:`${e}-switch__button-icon`,key:g?"checked-icon":"icon"},g||r):!this.checked&&(p||r)?f("div",{class:`${e}-switch__button-icon`,key:p?"unchecked-icon":"icon"},p||r):null})))),S(d,r=>r&&f("div",{key:"checked",class:`${e}-switch__checked`},r)),S(u,r=>r&&f("div",{key:"unchecked",class:`${e}-switch__unchecked`},r)))))}}),we="3.7.7",xt=we,z=typeof Buffer=="function",be=typeof TextDecoder=="function"?new TextDecoder:void 0,ge=typeof TextEncoder=="function"?new TextEncoder:void 0,yt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",P=Array.prototype.slice.call(yt),W=(e=>{let t={};return e.forEach((n,o)=>t[n]=o),t})(P),wt=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,c=String.fromCharCode.bind(String),pe=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),_e=e=>e.replace(/=/g,"").replace(/[+\/]/g,t=>t=="+"?"-":"_"),Be=e=>e.replace(/[^A-Za-z0-9\+\/]/g,""),Ce=e=>{let t,n,o,l,s="";const d=e.length%3;for(let u=0;u<e.length;){if((n=e.charCodeAt(u++))>255||(o=e.charCodeAt(u++))>255||(l=e.charCodeAt(u++))>255)throw new TypeError("invalid character found");t=n<<16|o<<8|l,s+=P[t>>18&63]+P[t>>12&63]+P[t>>6&63]+P[t&63]}return d?s.slice(0,d-3)+"===".substring(d):s},re=typeof btoa=="function"?e=>btoa(e):z?e=>Buffer.from(e,"binary").toString("base64"):Ce,ne=z?e=>Buffer.from(e).toString("base64"):e=>{let n=[];for(let o=0,l=e.length;o<l;o+=4096)n.push(c.apply(null,e.subarray(o,o+4096)));return re(n.join(""))},K=(e,t=!1)=>t?_e(ne(e)):ne(e),_t=e=>{if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?c(192|t>>>6)+c(128|t&63):c(224|t>>>12&15)+c(128|t>>>6&63)+c(128|t&63)}else{var t=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return c(240|t>>>18&7)+c(128|t>>>12&63)+c(128|t>>>6&63)+c(128|t&63)}},Bt=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,Se=e=>e.replace(Bt,_t),ve=z?e=>Buffer.from(e,"utf8").toString("base64"):ge?e=>ne(ge.encode(e)):e=>re(Se(e)),$=(e,t=!1)=>t?_e(ve(e)):ve(e),me=e=>$(e,!0),Ct=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,St=e=>{switch(e.length){case 4:var t=(7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3),n=t-65536;return c((n>>>10)+55296)+c((n&1023)+56320);case 3:return c((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return c((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},Ae=e=>e.replace(Ct,St),ke=e=>{if(e=e.replace(/\s+/g,""),!wt.test(e))throw new TypeError("malformed base64.");e+="==".slice(2-(e.length&3));let t,n="",o,l;for(let s=0;s<e.length;)t=W[e.charAt(s++)]<<18|W[e.charAt(s++)]<<12|(o=W[e.charAt(s++)])<<6|(l=W[e.charAt(s++)]),n+=o===64?c(t>>16&255):l===64?c(t>>16&255,t>>8&255):c(t>>16&255,t>>8&255,t&255);return n},ae=typeof atob=="function"?e=>atob(Be(e)):z?e=>Buffer.from(e,"base64").toString("binary"):ke,Re=z?e=>pe(Buffer.from(e,"base64")):e=>pe(ae(e).split("").map(t=>t.charCodeAt(0))),Ue=e=>Re(Fe(e)),At=z?e=>Buffer.from(e,"base64").toString("utf8"):be?e=>be.decode(Re(e)):e=>Ae(ae(e)),Fe=e=>Be(e.replace(/[-_]/g,t=>t=="-"?"+":"/")),oe=e=>At(Fe(e)),kt=e=>{if(typeof e!="string")return!1;const t=e.replace(/\s+/g,"").replace(/={0,2}$/,"");return!/[^\s0-9a-zA-Z\+/]/.test(t)||!/[^\s0-9a-zA-Z\-_]/.test(t)},Ve=e=>({value:e,enumerable:!1,writable:!0,configurable:!0}),$e=function(){const e=(t,n)=>Object.defineProperty(String.prototype,t,Ve(n));e("fromBase64",function(){return oe(this)}),e("toBase64",function(t){return $(this,t)}),e("toBase64URI",function(){return $(this,!0)}),e("toBase64URL",function(){return $(this,!0)}),e("toUint8Array",function(){return Ue(this)})},ze=function(){const e=(t,n)=>Object.defineProperty(Uint8Array.prototype,t,Ve(n));e("toBase64",function(t){return K(this,t)}),e("toBase64URI",function(){return K(this,!0)}),e("toBase64URL",function(){return K(this,!0)})},Rt=()=>{$e(),ze()},Z={version:we,VERSION:xt,atob:ae,atobPolyfill:ke,btoa:re,btoaPolyfill:Ce,fromBase64:oe,toBase64:$,encode:$,encodeURI:me,encodeURL:me,utob:Se,btou:Ae,decode:oe,isValid:kt,fromUint8Array:K,toUint8Array:Ue,extendString:$e,extendUint8Array:ze,extendBuiltins:Rt};function Ut(e,{makeUrlSafe:t=!1}={}){const n=Z.encode(e);return t?Vt(n):n}function Ft(e,{makeUrlSafe:t=!1}={}){if(!De(e,{makeUrlSafe:t}))throw new Error("Incorrect base64 string");let n=Te(e);t&&(n=Ee(n));try{return Z.decode(n)}catch{throw new Error("Incorrect base64 string")}}function Te(e){return e.replace(/^data:.*?;base64,/,"")}function De(e,{makeUrlSafe:t=!1}={}){let n=Te(e);t&&(n=Ee(n));try{const o=Z.fromUint8Array(Z.toUint8Array(n));return t?$t(o)===n:o===n.replace(/\s/g,"")}catch{return!1}}function Vt(e){return e.replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Ee(e){return e.replace(/-/g,"+").replace(/_/g,"/").replace(/[^A-Za-z0-9+/]/g,"")}function $t(e){return e.replace(/=/g,"")}const zt={flex:"","justify-center":""},Tt={flex:"","justify-center":""},It=xe({__name:"base64-string-converter",setup(e){const t=de("base64-string-converter--encode-url-safe",!1),n=de("base64-string-converter--decode-url-safe",!1),o=I(""),l=V(()=>Ut(o.value,{makeUrlSafe:t.value})),{copy:s}=ue({source:l,text:"Base64 string copied to the clipboard"}),d=I(""),u=V(()=>dt(()=>Ft(d.value.trim(),{makeUrlSafe:n.value}),"")),{copy:k}=ue({source:u,text:"String copied to the clipboard"}),v=[{message:"Invalid base64 string",validator:m=>De(m.trim(),{makeUrlSafe:n.value})}],C=[n];return(m,r)=>{const g=mt,p=ft,R=lt,O=st,j=ct;return rt(),at(it,null,[b(j,{title:"String to base64"},{default:F(()=>[b(p,{label:"Encode URL safe","label-placement":"left"},{default:F(()=>[b(g,{value:B(t),"onUpdate:value":r[0]||(r[0]=h=>D(t)?t.value=h:null)},null,8,["value"])]),_:1}),b(R,{value:B(o),"onUpdate:value":r[1]||(r[1]=h=>D(o)?o.value=h:null),multiline:"",placeholder:"Put your string here...",rows:"5",label:"String to encode","raw-text":"","mb-5":""},null,8,["value"]),b(R,{label:"Base64 of string",value:B(l),multiline:"",readonly:"",placeholder:"The base64 encoding of your string will be here",rows:"5","mb-5":""},null,8,["value"]),fe("div",zt,[b(O,{onClick:r[2]||(r[2]=h=>B(s)())},{default:F(()=>[he(" Copy base64 ")]),_:1})])]),_:1}),b(j,{title:"Base64 to string"},{default:F(()=>[b(p,{label:"Decode URL safe","label-placement":"left"},{default:F(()=>[b(g,{value:B(n),"onUpdate:value":r[3]||(r[3]=h=>D(n)?n.value=h:null)},null,8,["value"])]),_:1}),b(R,{value:B(d),"onUpdate:value":r[4]||(r[4]=h=>D(d)?d.value=h:null),multiline:"",placeholder:"Your base64 string...",rows:"5","validation-rules":v,"validation-watch":C,label:"Base64 string to decode","mb-5":""},null,8,["value"]),b(R,{value:B(u),"onUpdate:value":r[5]||(r[5]=h=>D(u)?u.value=h:null),label:"Decoded string",placeholder:"The decoded string will be here",multiline:"",rows:"5",readonly:"","mb-5":""},null,8,["value"]),fe("div",Tt,[b(O,{onClick:r[6]||(r[6]=h=>B(k)())},{default:F(()=>[he(" Copy decoded string ")]),_:1})])]),_:1})],64)}}});export{It as default};
