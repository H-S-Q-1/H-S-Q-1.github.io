import{J as g,am as pe,y as _,s as c,z as E,v as A,x as me,aQ as xe,aR as ge,d as Y,D as p,B as _e,an as we,E as ye,G as Ce,ap as Pe,C as J,aS as Ae,b as q,H as Se,aT as ze,K as Ee,O as Re,aH as $e,aU as Ie,L as G,Q as j,W as De,T as C,aL as w,o as D,c as N,w as R,f as B,i as y,h as i,j as O,a0 as U,e as Q,a6 as Te,U as We,m as Me,V as Be}from"./index-0057b7fe.js";import{b as Ue,_ as Fe,u as He}from"./downloadBase64-5102ab91.js";import{u as Ke,_ as Ve}from"./FormItem-40e7b617.js";import{_ as Ne}from"./ColorPicker-24885737.js";const Le=g("svg",{viewBox:"0 0 64 64",class:"check-icon"},g("path",{d:"M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"})),je=g("svg",{viewBox:"0 0 100 100",class:"line-icon"},g("path",{d:"M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"})),Oe=pe("n-checkbox-group"),qe=_([c("checkbox",`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[E("show-label","line-height: var(--n-label-line-height);"),_("&:hover",[c("checkbox-box",[A("border","border: var(--n-border-checked);")])]),_("&:focus:not(:active)",[c("checkbox-box",[A("border",`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),E("inside-table",[c("checkbox-box",`
 background-color: var(--n-merged-color-table);
 `)]),E("checked",[c("checkbox-box",`
 background-color: var(--n-color-checked);
 `,[c("checkbox-icon",[_(".check-icon",`
 opacity: 1;
 transform: scale(1);
 `)])])]),E("indeterminate",[c("checkbox-box",[c("checkbox-icon",[_(".check-icon",`
 opacity: 0;
 transform: scale(.5);
 `),_(".line-icon",`
 opacity: 1;
 transform: scale(1);
 `)])])]),E("checked, indeterminate",[_("&:focus:not(:active)",[c("checkbox-box",[A("border",`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),c("checkbox-box",`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[A("border",{border:"var(--n-border-checked)"})])]),E("disabled",{cursor:"not-allowed"},[E("checked",[c("checkbox-box",`
 background-color: var(--n-color-disabled-checked);
 `,[A("border",{border:"var(--n-border-disabled-checked)"}),c("checkbox-icon",[_(".check-icon, .line-icon",{fill:"var(--n-check-mark-color-disabled-checked)"})])])]),c("checkbox-box",`
 background-color: var(--n-color-disabled);
 `,[A("border",`
 border: var(--n-border-disabled);
 `),c("checkbox-icon",[_(".check-icon, .line-icon",`
 fill: var(--n-check-mark-color-disabled);
 `)])]),A("label",`
 color: var(--n-text-color-disabled);
 `)]),c("checkbox-box-wrapper",`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),c("checkbox-box",`
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `,[A("border",`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `),c("checkbox-icon",`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[_(".check-icon, .line-icon",`
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `),me({left:"1px",top:"1px"})])]),A("label",`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[_("&:empty",{display:"none"})])]),xe(c("checkbox",`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),ge(c("checkbox",`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),Ge=Object.assign(Object.assign({},J.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),Qe=Y({name:"Checkbox",props:Ge,setup(n){const s=p(null),{mergedClsPrefixRef:t,inlineThemeDisabled:d,mergedRtlRef:u}=_e(n),b=Ke(n,{mergedSize(o){const{size:e}=n;if(e!==void 0)return e;if(r){const{value:v}=r.mergedSizeRef;if(v!==void 0)return v}if(o){const{mergedSize:v}=o;if(v!==void 0)return v.value}return"medium"},mergedDisabled(o){const{disabled:e}=n;if(e!==void 0)return e;if(r){if(r.disabledRef.value)return!0;const{maxRef:{value:v},checkedCountRef:z}=r;if(v!==void 0&&z.value>=v&&!x.value)return!0;const{minRef:{value:$}}=r;if($!==void 0&&z.value<=$&&x.value)return!0}return o?o.disabled.value:!1}}),{mergedDisabledRef:h,mergedSizeRef:f}=b,r=we(Oe,null),l=p(n.defaultChecked),m=ye(n,"checked"),k=Ce(m,l),x=Pe(()=>{if(r){const o=r.valueSetRef.value;return o&&n.value!==void 0?o.has(n.value):!1}else return k.value===n.checkedValue}),W=J("Checkbox","-checkbox",qe,Ie,n,t);function a(o){if(r&&n.value!==void 0)r.toggleCheckbox(!x.value,n.value);else{const{onChange:e,"onUpdate:checked":v,onUpdateChecked:z}=n,{nTriggerFormInput:$,nTriggerFormChange:L}=b,I=x.value?n.uncheckedValue:n.checkedValue;v&&j(v,I,o),z&&j(z,I,o),e&&j(e,I,o),$(),L(),l.value=I}}function P(o){h.value||a(o)}function M(o){if(!h.value)switch(o.key){case" ":case"Enter":a(o)}}function F(o){switch(o.key){case" ":o.preventDefault()}}const H={focus:()=>{var o;(o=s.value)===null||o===void 0||o.focus()},blur:()=>{var o;(o=s.value)===null||o===void 0||o.blur()}},K=Ae("Checkbox",u,t),V=q(()=>{const{value:o}=f,{common:{cubicBezierEaseInOut:e},self:{borderRadius:v,color:z,colorChecked:$,colorDisabled:L,colorTableHeader:I,colorTableHeaderModal:X,colorTableHeaderPopover:Z,checkMarkColor:ee,checkMarkColorDisabled:oe,border:ne,borderFocus:le,borderDisabled:ae,borderChecked:re,boxShadowFocus:te,textColor:ce,textColorDisabled:ie,checkMarkColorDisabledChecked:se,colorDisabledChecked:de,borderDisabledChecked:ue,labelPadding:be,labelLineHeight:he,labelFontWeight:fe,[G("fontSize",o)]:ke,[G("size",o)]:ve}}=W.value;return{"--n-label-line-height":he,"--n-label-font-weight":fe,"--n-size":ve,"--n-bezier":e,"--n-border-radius":v,"--n-border":ne,"--n-border-checked":re,"--n-border-focus":le,"--n-border-disabled":ae,"--n-border-disabled-checked":ue,"--n-box-shadow-focus":te,"--n-color":z,"--n-color-checked":$,"--n-color-table":I,"--n-color-table-modal":X,"--n-color-table-popover":Z,"--n-color-disabled":L,"--n-color-disabled-checked":de,"--n-text-color":ce,"--n-text-color-disabled":ie,"--n-check-mark-color":ee,"--n-check-mark-color-disabled":oe,"--n-check-mark-color-disabled-checked":se,"--n-font-size":ke,"--n-label-padding":be}}),S=d?Se("checkbox",q(()=>f.value[0]),V,n):void 0;return Object.assign(b,H,{rtlEnabled:K,selfRef:s,mergedClsPrefix:t,mergedDisabled:h,renderedChecked:x,mergedTheme:W,labelId:ze(),handleClick:P,handleKeyUp:M,handleKeyDown:F,cssVars:d?void 0:V,themeClass:S?.themeClass,onRender:S?.onRender})},render(){var n;const{$slots:s,renderedChecked:t,mergedDisabled:d,indeterminate:u,privateInsideTable:b,cssVars:h,labelId:f,label:r,mergedClsPrefix:l,focusable:m,handleKeyUp:k,handleKeyDown:x,handleClick:W}=this;(n=this.onRender)===null||n===void 0||n.call(this);const a=Ee(s.default,P=>r||P?g("span",{class:`${l}-checkbox__label`,id:f},r||P):null);return g("div",{ref:"selfRef",class:[`${l}-checkbox`,this.themeClass,this.rtlEnabled&&`${l}-checkbox--rtl`,t&&`${l}-checkbox--checked`,d&&`${l}-checkbox--disabled`,u&&`${l}-checkbox--indeterminate`,b&&`${l}-checkbox--inside-table`,a&&`${l}-checkbox--show-label`],tabindex:d||!m?void 0:0,role:"checkbox","aria-checked":u?"mixed":t,"aria-labelledby":f,style:h,onKeyup:k,onKeydown:x,onClick:W,onMousedown:()=>{$e("selectstart",window,P=>{P.preventDefault()},{once:!0})}},g("div",{class:`${l}-checkbox-box-wrapper`}," ",g("div",{class:`${l}-checkbox-box`},g(Re,null,{default:()=>this.indeterminate?g("div",{key:"indeterminate",class:`${l}-checkbox-icon`},je):g("div",{key:"check",class:`${l}-checkbox-icon`},Le)}),g("div",{class:`${l}-checkbox-box__border`}))),a)}}),Ye=["MD5","POTP","GTC","TLS","IKEv2","SIM","AKA","AKA'","TTLS","PWD","LEAP","PSK","FAST","TEAP","EKE","NOOB","PEAP"],Je=["None","MSCHAPV2"];function T(n){return n.replace(/([\\;,:"])/g,"\\$1")}function Xe(n){const{ssid:s,password:t,encryption:d,eapMethod:u,isHiddenSSID:b,eapAnonymous:h,eapIdentity:f,eapPhase2Method:r}=n;if(!s)return null;if(d==="nopass")return`WIFI:S:${T(s)};;`;if(d!=="WPA2-EAP"&&t)return`WIFI:S:${T(s)};T:${d};P:${T(t)};${b?"H:true":""};`;if(d==="WPA2-EAP"&&t&&u){if(!f&&!h||u==="PEAP"&&!r)return null;const l=h?"A:anon":`I:${T(f)}`,m=r!=="None"?`PH2:${r};`:"";return`WIFI:S:${T(s)};T:WPA2-EAP;P:${T(t)};E:${u};${m}${l};${b?"H:true":""};`}return null}function Ze({ssid:n,password:s,eapMethod:t,isHiddenSSID:d,eapAnonymous:u,eapIdentity:b,eapPhase2Method:h,color:{background:f,foreground:r},options:l}){const m=p(""),k=p("WPA");return De([n,s,k,t,d,u,b,h,f,r].filter(C),async()=>{const x=Xe({ssid:w(n),password:w(s),encryption:w(k),eapMethod:w(t),isHiddenSSID:w(d),eapAnonymous:w(u),eapIdentity:w(b),eapPhase2Method:w(h)});x&&(m.value=await Ue.toDataURL(w(x).trim(),{color:{dark:w(r),light:w(f),...l?.color},errorCorrectionLevel:"M",...l}))},{immediate:!0}),{qrcode:m,encryption:k}}const eo={grid:"","grid-cols-1":"","gap-12":""},oo={class:"mb-6 flex flex-row items-center gap-2"},no={key:2,class:"mb-6 flex flex-row items-center gap-2"},lo={key:0},ao={flex:"","flex-col":"","items-center":"","gap-3":""},ro=["src"],uo=Y({__name:"wifi-qr-code-generator",setup(n){const s=p("#000000ff"),t=p("#ffffffff"),d=p(),u=p(),b=p(),h=p(!1),f=p(!1),r=p(),l=p(),{qrcode:m,encryption:k}=Ze({ssid:d,password:u,eapMethod:b,isHiddenSSID:h,eapAnonymous:f,eapIdentity:r,eapPhase2Method:l,color:{background:t,foreground:s},options:{width:1024}}),{download:x}=He({source:m,filename:"qr-code.png"});return(W,a)=>{const P=Te,M=We,F=Qe,H=Ne,K=Ve,V=Fe,S=Me,o=Be;return D(),N(o,null,{default:R(()=>[B("div",eo,[B("div",null,[y(P,{value:i(k),"onUpdate:value":a[0]||(a[0]=e=>C(k)?k.value=e:null),"mb-4":"",label:"Encryption method","default-value":"WPA","label-position":"left","label-width":"130px","label-align":"right",options:[{label:"No password",value:"nopass"},{label:"WPA/WPA2",value:"WPA"},{label:"WEP",value:"WEP"},{label:"WPA2-EAP",value:"WPA2-EAP"}]},null,8,["value"]),B("div",oo,[y(M,{value:i(d),"onUpdate:value":a[1]||(a[1]=e=>C(d)?d.value=e:null),"label-position":"left","label-width":"130px","label-align":"right",label:"SSID:",rows:"1",autosize:"",placeholder:"Your WiFi SSID...","mb-6":""},null,8,["value"]),y(F,{checked:i(h),"onUpdate:checked":a[2]||(a[2]=e=>C(h)?h.value=e:null)},{default:R(()=>[O(" Hidden SSID ")]),_:1},8,["checked"])]),i(k)!=="nopass"?(D(),N(M,{key:0,value:i(u),"onUpdate:value":a[3]||(a[3]=e=>C(u)?u.value=e:null),"label-position":"left","label-width":"130px","label-align":"right",label:"Password:",rows:"1",autosize:"",type:"password",placeholder:"Your WiFi Password...","mb-6":""},null,8,["value"])):U("",!0),i(k)==="WPA2-EAP"?(D(),N(P,{key:1,value:i(b),"onUpdate:value":a[4]||(a[4]=e=>C(b)?b.value=e:null),label:"EAP method","label-position":"left","label-width":"130px","label-align":"right",options:i(Ye).map(e=>({label:e,value:e})),searchable:"","mb-4":""},null,8,["value","options"])):U("",!0),i(k)==="WPA2-EAP"?(D(),Q("div",no,[y(M,{value:i(r),"onUpdate:value":a[5]||(a[5]=e=>C(r)?r.value=e:null),"label-position":"left","label-width":"130px","label-align":"right",label:"Identity:",rows:"1",autosize:"",placeholder:"Your EAP Identity...","mb-6":""},null,8,["value"]),y(F,{checked:i(f),"onUpdate:checked":a[6]||(a[6]=e=>C(f)?f.value=e:null)},{default:R(()=>[O(" Anonymous? ")]),_:1},8,["checked"])])):U("",!0),i(k)==="WPA2-EAP"?(D(),N(P,{key:3,value:i(l),"onUpdate:value":a[7]||(a[7]=e=>C(l)?l.value=e:null),label:"EAP Phase 2 method","label-position":"left","label-width":"130px","label-align":"right",options:i(Je).map(e=>({label:e,value:e})),searchable:"","mb-4":""},null,8,["value","options"])):U("",!0),y(V,{"label-width":"130","label-placement":"left"},{default:R(()=>[y(K,{label:"Foreground color:"},{default:R(()=>[y(H,{value:i(s),"onUpdate:value":a[8]||(a[8]=e=>C(s)?s.value=e:null),modes:["hex"]},null,8,["value"])]),_:1}),y(K,{label:"Background color:"},{default:R(()=>[y(H,{value:i(t),"onUpdate:value":a[9]||(a[9]=e=>C(t)?t.value=e:null),modes:["hex"]},null,8,["value"])]),_:1})]),_:1})]),i(m)?(D(),Q("div",lo,[B("div",ao,[B("img",{alt:"wifi-qrcode",src:i(m),width:"200"},null,8,ro),y(S,{onClick:i(x)},{default:R(()=>[O(" Download qr-code ")]),_:1},8,["onClick"])])])):U("",!0)])]),_:1})}}});export{uo as default};
