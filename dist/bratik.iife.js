var bratik=function(t){"use strict";const o=Math.PI,v=o*2,S="close";let f,u,l;t.ctx=void 0,t.frame=0,t.looping=!1;const T=(c,e,i)=>(l=document.createElement("canvas"),t.ctx=l.getContext("2d"),document.body.prepend(l),l.setAttribute("id",i||"canvas"),c?(f=c,u=e||f,l.setAttribute("style",`width:${f}px;height:${u}px;`),l.setAttribute("width",f.toString()),l.setAttribute("height",u.toString())):(l.setAttribute("style","width:100%;height:100%;"),{width:f,height:u}=l.getBoundingClientRect(),l.setAttribute("width",f.toString()),l.setAttribute("height",u.toString())),t.ctx.fillStyle="white",t.ctx.strokeStyle="black",t.ctx.imageSmoothingEnabled=!0,{width:f,height:u,ctx:t.ctx,canvas:l});let h=!1;const A=c=>{c==="close"&&t.ctx.closePath(),h?(h=!1,d()):t.ctx.beginPath()},k=(c,e)=>{h?t.ctx.lineTo(c,e):(h=!0,t.ctx.moveTo(c,e))},P=(c,e,i,n,a)=>{t.ctx.arcTo(c,e,i,n,a)},s=(c,e,i,n)=>{t.ctx.beginPath(),t.ctx.moveTo(c,e),t.ctx.lineTo(i,n),d()},$=(c,e,i=10)=>{t.ctx.beginPath(),t.ctx.arc(c,e,i,0,v),d()},C=(c,e,i=20,n=20,a)=>{t.ctx.beginPath(),a?(t.ctx.moveTo(c+a,e),t.ctx.arcTo(c+i,e,c+i,e+n,a),t.ctx.arcTo(c+i,e+n,c,e+n,a),t.ctx.arcTo(c,e+n,c,e,a),t.ctx.arcTo(c,e,c+i,e,a)):t.ctx.rect(c,e,i,n),d()},E=(c,e,i)=>{let n="",a=i||"",y=e||"sans-serif";if(typeof c=="number"&&(n=c.toString()+"px"),typeof c=="string"){const g=c.match(/^(\d+)([a-z%]*)\/?(\d*)([a-z%]*)$/);g&&(n=g[1],n+=g[2]?g[2]:"px",g[3]&&(n+=`/${g[3]}`,n+=g[4]?g[4]:"px"))}t.ctx.font=`${a} ${n} ${y}`.trim()};let b;const F=(c,e,i)=>{t.ctx.textAlign=c||"start",t.ctx.textBaseline=e||"alphabetic",b=i},I=(c,e,i,n)=>{t.ctx.fillText(c,e,i,n||b),t.ctx.strokeText(c,e,i,n||b)},d=()=>{t.ctx.fill(),t.ctx.stroke()},M=c=>{c===null?t.ctx.fillStyle="transparent":t.ctx.fillStyle=c},O=(c,e)=>{c===null?t.ctx.strokeStyle="transparent":t.ctx.strokeStyle=c,e!==void 0&&(t.ctx.lineWidth=e)},_=(c=0,e=0,i=f,n=u)=>{t.ctx.clearRect(c,e,i,n)};let m;t.stop=void 0;const w=c=>{t.looping=!0;let e;m=()=>{t.frame++,c(),e=requestAnimationFrame(m)},t.stop=()=>{t.looping=!1,cancelAnimationFrame(e)},m()};return t.CLOSE=S,t.PI=o,t.TAU=v,t.arc=P,t.circle=$,t.clear=_,t.draw=d,t.fill=M,t.font=E,t.getcanvas=T,t.line=s,t.loop=w,t.rect=C,t.settext=F,t.shape=A,t.stroke=O,t.text=I,t.vertex=k,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),t}({});
