"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const p=Math.PI,u=p*2,h="close";let s,a,i;exports.ctx=void 0;exports.frame=0;exports.looping=!1;const m=(t,e,c)=>(i=document.createElement("canvas"),exports.ctx=i.getContext("2d"),document.body.prepend(i),i.setAttribute("id",c||"canvas"),t?(s=t,a=e||s,i.setAttribute("style",`width:${s}px;height:${a}px;`),i.setAttribute("width",s.toString()),i.setAttribute("height",a.toString())):(i.setAttribute("style","width:100%;height:100%;"),{width:s,height:a}=i.getBoundingClientRect(),i.setAttribute("width",s.toString()),i.setAttribute("height",a.toString())),exports.ctx.fillStyle="white",exports.ctx.strokeStyle="black",exports.ctx.imageSmoothingEnabled=!0,{width:s,height:a,ctx:exports.ctx,canvas:i});let x=!1;const b=t=>{t==="close"&&exports.ctx.closePath(),x?(x=!1,r()):exports.ctx.beginPath()},S=(t,e)=>{x?exports.ctx.lineTo(t,e):(x=!0,exports.ctx.moveTo(t,e))},v=(t,e,c,o,n)=>{exports.ctx.arcTo(t,e,c,o,n)},T=(t,e,c,o)=>{exports.ctx.beginPath(),exports.ctx.moveTo(t,e),exports.ctx.lineTo(c,o),r()},A=(t,e,c=10)=>{exports.ctx.beginPath(),exports.ctx.arc(t,e,c,0,u),r()},P=(t,e,c=20,o=20,n)=>{exports.ctx.beginPath(),n?(exports.ctx.moveTo(t+n,e),exports.ctx.arcTo(t+c,e,t+c,e+o,n),exports.ctx.arcTo(t+c,e+o,t,e+o,n),exports.ctx.arcTo(t,e+o,t,e,n),exports.ctx.arcTo(t,e,t+c,e,n)):exports.ctx.rect(t,e,c,o),r()},k=(t,e,c)=>{let o="",n=c||"",d=e||"sans-serif";if(typeof t=="number"&&(o=t.toString()+"px"),typeof t=="string"){const l=t.match(/^(\d+)([a-z%]*)\/?(\d*)([a-z%]*)$/);l&&(o=l[1],o+=l[2]?l[2]:"px",l[3]&&(o+=`/${l[3]}`,o+=l[4]?l[4]:"px"))}exports.ctx.font=`${n} ${o} ${d}`.trim()};let g;const $=(t,e,c)=>{exports.ctx.textAlign=t||"start",exports.ctx.textBaseline=e||"alphabetic",g=c},C=(t,e,c,o)=>{exports.ctx.fillText(t,e,c,o||g),exports.ctx.strokeText(t,e,c,o||g)},r=()=>{exports.ctx.fill(),exports.ctx.stroke()},E=t=>{t===null?exports.ctx.fillStyle="transparent":exports.ctx.fillStyle=t},F=(t,e)=>{t===null?exports.ctx.strokeStyle="transparent":exports.ctx.strokeStyle=t,e!==void 0&&(exports.ctx.lineWidth=e)},I=(t=0,e=0,c=s,o=a)=>{exports.ctx.clearRect(t,e,c,o)};let f;exports.stop=void 0;const M=t=>{exports.looping=!0;let e;f=()=>{exports.frame++,t(),e=requestAnimationFrame(f)},exports.stop=()=>{exports.looping=!1,cancelAnimationFrame(e)},f()};exports.CLOSE=h;exports.PI=p;exports.TAU=u;exports.arc=v;exports.circle=A;exports.clear=I;exports.draw=r;exports.fill=E;exports.font=k;exports.getcanvas=m;exports.line=T;exports.loop=M;exports.rect=P;exports.settext=$;exports.shape=b;exports.stroke=F;exports.text=C;exports.vertex=S;
