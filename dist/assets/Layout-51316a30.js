import{A as c}from"./Asidebox-6283761f.js";import{_ as y}from"./MyNavBar-3f01dc6c.js";import{n as D}from"./articleApi-bc2a9a63.js";import{_ as j}from"./_plugin-vue_export-helper-c27b6911.js";import{r as _,c as p,a as x,b as i,o as A,d as C,e as a,f as s,w as l,p as k,g as B}from"./index-e5993185.js";import"./AntdIcon-d361e429.js";import"./StoreLogin-90de31fe.js";import"./categoryApi-7e1a6937.js";const o=n=>(k("data-v-384d5f12"),n=n(),B(),n),I={id:"main"},L={class:"header"},V={class:"container"},E=o(()=>a("img",{class:"carousel-img",src:"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"},null,-1)),G=o(()=>a("img",{class:"carousel-img",src:"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"},null,-1)),S=o(()=>a("img",{class:"carousel-img",src:"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"},null,-1)),N=o(()=>a("img",{class:"carousel-img",src:"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"},null,-1)),$=o(()=>a("footer",null,null,-1)),q={__name:"Layout",setup(n){const r=_({arr:[]}),m=_([{title:"vue3+webApi开发实战入门evfehbofihesbahfboeiabfihbeiaefhbkajbfabhfhbahyhfbaieb"},{title:"vue3+webApi开发实战入门"},{title:"vue3+webApi开发实战入门"},{title:"vue3+webApi开发实战入门"},{title:"vue3+webApi开发实战入门"}]);(async()=>{await D().then(e=>{e.data.success==!0?r.arr=e.data.data:console.log("获取失败")}).catch(e=>{console.error(e)})})();const h=p(()=>{let e=[];return r.arr.forEach(t=>{t.title.length>33&&(t.title=t.title.substring(0,20)+"..."),e.push(t)}),e}),d=p(()=>{let e=[];return m.forEach(t=>{t.title.length>33&&(t.title=t.title.substring(0,20)+"..."),e.push(t)}),e}),f=x(""),g=e=>{f.value=e,console.log("ffff"+e)};return(e,t)=>{const w=i("n-carousel"),v=i("router-view"),u=i("n-grid-item"),b=i("n-grid");return A(),C("div",I,[a("header",L,[s(y)]),a("div",V,[s(b,{cols:"24","x-gap":20,"item-responsive":""},{default:l(()=>[s(u,{span:"0 400:12 600:15 800:18"},{default:l(()=>[s(w,{autoplay:"",style:{height:"240px"}},{default:l(()=>[E,G,S,N]),_:1}),s(v)]),_:1}),s(u,{span:"0 400:12 600:9 800:6"},{default:l(()=>[s(c,{type:"search",onGetSearchValue:g}),s(c,{name:"公告",type:"announcement"}),s(c,{name:"最新文章",type:"news",newsData:h.value},null,8,["newsData"]),s(c,{name:"热门文章",type:"news",newsData:d.value},null,8,["newsData"])]),_:1})]),_:1})]),$])}}},R=j(q,[["__scopeId","data-v-384d5f12"]]);export{R as default};
