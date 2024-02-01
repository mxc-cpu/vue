import{x as m,o as d,d as p,e,K as S,f as t,w as s,l as o,t as l,u as n,R as x,k,q as D,a as L,r as w,b as u,j as v,m as j,F as C}from"./index-e5993185.js";import{F as B}from"./FileLike-8cc43e54.js";const N={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},V=e("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{d:"M4 6h16"}),e("path",{d:"M4 12h16"}),e("path",{d:"M4 18h16"})],-1),T=[V],q=m({name:"Menu2",render:function(a,i){return d(),p("svg",N,T)}}),I={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},F=S('<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8l-4 4"></path><path d="M12 11v.01"></path><path d="M8 11v.01"></path><path d="M16 11v.01"></path></g>',1),O=[F],R=m({name:"MessageDots",render:function(a,i){return d(),p("svg",I,O)}}),H={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},E=e("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{d:"M21 14l-3-3h-7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10"}),e("path",{d:"M14 15v2a1 1 0 0 1-1 1H6l-3 3V11a1 1 0 0 1 1-1h2"})],-1),K=[E],P=m({name:"Messages",render:function(a,i){return d(),p("svg",H,K)}}),U={class:"media"},A=e("figure",{class:"media-left"},[e("p",{class:"image is-64x64"},[e("img",{src:"https://bulma.io/images/placeholders/128x128.png"})])],-1),G={class:"media-content"},J={class:"content"},Q=e("br",null,null,-1),W=e("br",null,null,-1),X={__name:"MessageItem",props:{userName:{type:String,default:"mxc",required:!0},action:{type:String,default:"评论",required:!0},actionObject:{type:String,default:"文章"},messageTime:{type:Date,default:"2024/1/24 14:22",required:!0},userLink:{type:String,default:"/"},messageLink:{type:String,default:"/"},messageDescription:{type:String,default:"cscscscscscscscscsc"}},setup(c){const a=c;return(i,h)=>(d(),p("article",U,[A,e("div",G,[e("div",J,[e("p",null,[e("strong",null,[t(n(x),{to:c.userLink},{default:s(()=>[o(l(a.userName),1)]),_:1},8,["to"]),o(l(a.action)+"了你的: ",1),t(n(x),{to:c.messageLink},{default:s(()=>[o(l(a.actionObject),1)]),_:1},8,["to"])]),Q,k(i.$slots,"messageDescription",{},()=>[o(l(a.messageDetail),1)]),W,e("small",null,[k(i.$slots,"messageTime",{},()=>[o(l(a.messageTime),1)])])])])])]))}},Y={class:"columns"},Z={class:"column is-two-fifth"},ee={class:"column"},te={class:"column"},se={class:"column"},ne={class:"level py-5"},re={__name:"MessageList",props:{type:{type:String,default:"评论",required:!0}},setup(c){D();var a=L(1),i=w({pageIndex:1,pageSize:9}),h=w({arr:[{}]});const $=()=>{};return(oe,f)=>{const _=u("n-icon"),g=u("n-button"),y=u("n-divider"),M=u("n-pagination"),b=u("n-card");return d(),v(b,null,{default:s(()=>[e("div",Y,[e("div",Z,[t(g,{text:"",style:{"font-size":"15px"}},{default:s(()=>[t(_,{size:"40",color:"hsl(344, 95%, 61%)"},{default:s(()=>[t(n(B))]),_:1}),o(" 点赞 ")]),_:1})]),e("div",ee,[t(g,{text:"",style:{"font-size":"15px"}},{default:s(()=>[t(_,{size:"40",color:"#8a2be2"},{default:s(()=>[t(n(P))]),_:1}),o(" 回复 ")]),_:1})]),e("div",te,[t(g,{text:"",style:{"font-size":"15px"}},{default:s(()=>[t(_,{size:"40",color:"hsl(204, 86%, 53%) "},{default:s(()=>[t(n(R))]),_:1}),o(" 评论 ")]),_:1})]),e("div",se,[t(g,{text:"",style:{"font-size":"15px"}},{default:s(()=>[t(_,{size:"40",color:"hsl(204, 71%, 39%)"},{default:s(()=>[t(n(q))]),_:1}),o(" 全部 ")]),_:1})])]),t(y,{style:{"margin-top":"0px"}}),(d(!0),p(C,null,j(n(h).arr,(r,z)=>(d(),v(X,{key:z,action:r.action,"action-object":r.actionObject,"user-name":r.userName,"user-link":`/PersonalCenter/${r.id}`,"message-link":r.messageLink},{messageDescription:s(()=>[o(l(r.messageDescription),1)]),messageTime:s(()=>[o(l(r.messageTime),1)]),_:2},1032,["action","action-object","user-name","user-link","message-link"]))),128)),e("div",ne,[t(M,{class:"level-item has-text-centered",page:n(i).pageIndex,"onUpdate:page":[f[0]||(f[0]=r=>n(i).pageIndex=r),$],"page-size":n(i).pageSize,"page-count":n(a)},null,8,["page","page-size","page-count"])])]),_:1})}}};export{re as default};
