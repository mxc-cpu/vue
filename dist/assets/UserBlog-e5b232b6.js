import{G as B}from"./articleApi-bc2a9a63.js";import{a as f,i as A,b as u,o as y,d as N,f as o,w as n,e,t as p,u as c,R as x,j as k,l as b,I as L,p as q,g as $,n as j,q as C,h as G,F as P,J as R}from"./index-e5993185.js";import{l as S,G as w,a as D}from"./StoreLogin-90de31fe.js";import{_ as F}from"./MyNavBar-3f01dc6c.js";import{A as I}from"./Asidebox-6283761f.js";import{Q as O,A as V,D as E}from"./dynamicsApi-00344969.js";import{_ as Q}from"./_plugin-vue_export-helper-c27b6911.js";import"./categoryApi-7e1a6937.js";import"./AntdIcon-d361e429.js";const m=r=>(q("data-v-c5da7137"),r=r(),$(),r),z={class:"box"},J={class:"has-text-centered is-three-fifths"},M={class:"title is-3"},T={style:{display:"flexbox"},class:"level is-mobile"},H={class:"level-item has-text-centered is-three-fifths"},K=m(()=>e("p",{class:"heading"},"获赞",-1)),W={class:"title is-5"},X={class:"level-item has-text-centered"},Y=m(()=>e("p",{class:"heading"},"文章",-1)),Z={class:"title is-5"},ee={class:"level-item has-text-centered"},te=m(()=>e("p",{class:"heading"},"粉丝",-1)),se={class:"title is-5"},ae={class:"columns"},oe=m(()=>e("p",{class:"title is-5 has-text-link has-text-centered",style:{"text-align":"right"}}," 我的文章 ",-1)),ne=m(()=>e("p",{class:"title is-5 has-text-link has-text-centered",style:{"text-align":"right"}}," 个人中心 ",-1)),le={__name:"UserInfoPlan",props:{avatar:{type:String,default:"https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",required:!0},userId:{type:Number,default:0,required:!0},userName:{type:String,default:"xxx",required:!0},upvoteSum:{type:Number,default:20,required:!0},ArticleSum:{type:Number,default:10,required:!0},fans:{type:Number,default:200,required:!0},userArticleLink:{type:String,default:"/"}},setup(r){const l=f("+关注"),i=S(),t=r,d=async()=>{if(i.InLogin){const s={focusID:t.userId,fansID:i.userId};O(s).then(a=>{a.data.success&&(a.data.data?l.value="+关注":l.value="取消关注")})}},h=()=>{if(i.InLogin){const s={focusID:t.userId,fansID:i.userId};console.log("dddfdsd",s),l.value!=="取消关注"?V(s).then(a=>{a.data.success==!0?l.value="取消关注":consol.log("关注失败")}).catch(a=>console.error(a)):E(s).then(a=>{a.data.success==!0?l.value="+关注":consol.log("取消关注失败")}).catch(a=>console.error(a))}else L.push("/login")};return A(()=>{d()}),(s,a)=>{const _=u("n-avatar"),v=u("n-divider"),g=u("n-button"),U=u("n-card");return y(),N("div",z,[o(U,null,{header:n(()=>[o(_,{style:{display:"block",height:"100px",width:"100px"},class:"container",round:"",lazy:"",src:t.avatar,"fallback-src":"https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"},null,8,["src"]),e("div",J,[e("div",null,[e("p",M,"< "+p(t.userName)+" >",1)])])]),default:n(()=>[e("nav",T,[e("div",H,[e("div",null,[K,e("p",W,p(t.upvoteSum),1)])]),e("div",X,[e("div",null,[Y,e("p",Z,p(t.ArticleSum),1)])]),e("div",ee,[e("div",null,[te,e("p",se,p(t.fans),1)])])])]),action:n(()=>[e("div",ae,[o(c(x),{class:"column",to:t.userArticleLink},{default:n(()=>[oe]),_:1},8,["to"]),o(c(x),{class:"column",to:"/"},{default:n(()=>[ne]),_:1})]),o(v),r.userName!=c(i).name1?(y(),k(g,{key:0,onClick:h,block:"true",color:"#07ceaf",class:"title is-5 has-text-link"},{default:n(()=>[b(p(l.value),1)]),_:1})):(y(),k(c(x),{key:1,to:"/Editor"},{default:n(()=>[o(g,{block:"true",color:"#07ceaf",class:"title is-5 has-text-link"},{default:n(()=>[b(" 博客管理 ")]),_:1})]),_:1}))]),_:1})])}}},ie=Q(le,[["__scopeId","data-v-c5da7137"]]);const ce={class:"header"},re={class:"container"},ue=e("footer",null,null,-1),xe={__name:"UserBlog",setup(r){j();const l=C();S();let i=f("fff"),t=f(0),d=f();G(()=>{h()}),A(()=>{h()});const h=async()=>{if(l.params.id!=null)await B(l.params.id).then(async s=>{if(s.data.success==!0){t.value=s.data.data;const[a,_]=await Promise.all([w(t.value),D(t.value)]);i.value=a.data.data,d.value=_.data}else console.log("失败")}).catch(s=>{console.log(s)});else if(l.params.userId!=null){t.value=l.params.userId;const[s,a]=await Promise.all([w(t.value),D(t.value)]);i.value=s.data.data,d.value=a.data}};return f({}),(s,a)=>{const _=u("n-message-provider"),v=u("n-grid-item"),g=u("n-grid");return y(),N(P,null,[e("header",ce,[o(F)]),e("div",re,[o(g,{cols:"24","x-gap":20,"item-responsive":""},{default:n(()=>[o(v,{span:"0 400:12 600:15 800:18"},{default:n(()=>[o(_,null,{default:n(()=>[o(c(R))]),_:1})]),_:1}),o(v,{span:"0 400:12 600:9 800:6"},{default:n(()=>[o(ie,{userArticleLink:`/ArticleListByuser/${c(t)}`,userName:c(d),avatar:c(i),"user-id":c(t)},null,8,["userArticleLink","userName","avatar","user-id"]),o(I,{name:"公告",type:"announcement"}),o(I,{name:"最新文章",type:"news",newsData:s.newDataComp},null,8,["newsData"]),o(I,{name:"热门文章",type:"news",newsData:s.hotnewDataComp},null,8,["newsData"])]),_:1})]),_:1})]),ue],64)}}};export{xe as default};
