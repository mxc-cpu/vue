import { getToken } from "../auth/login";
import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("../layout/Layout.vue"),
    redirect: "/ArticleList",
    children: [
      {
        path: "/ArticleList",
        name: "ArticleList",
        component: () => import("../views/ArticleList.vue"),
      },
      {
        path: "/Boutique",
        name: "Boutique",
        component: () => import("../views/ArticleList.vue"),
      },
      {
        path: "/ArticleListByCategoryId/:categoryId",
        name: "ArticleListByCategoryId",
        component: () => import("../views/ArticleList.vue"),
      },
      {
        path: "/ArticleList/SearchResult/:title",
        name: "SearchResult",
        component: () => import("../views/Search.vue"),
      },
    ],
  },
  {
    path: "/categoryList",
    name: "categoryList",
    component: () => import("../views/CategoryList.vue"),
  },
  {
    path: "/Editor",
    name: "Editor",
    component: () => import("../views/dashboard/Dashboard.vue"),
    redirect: "/Editor/articleEditor",
    children: [
      {
        path: "/Editor/articleEditor",
        name: "articleEditor",
        component: () => import("../views/dashboard/ArticleEditor.vue"),
      },
      {
        path: "/Editor/articleEditor/:tap",
        name: "articleEditorUpate",
        component: () => import("../views/dashboard/ArticleEditor.vue"),
      },
      {
        path: "/Editor/CompilationsEditor/:id",
        name: "CompilationsArticleEditor",
        component: () => import("../views/dashboard/ArticleEditor.vue"),
      },

      {
        path: "/Editor/CompilationsEditor",
        name: "CompilationsEditor",
        component: () => import("../views/dashboard/CompilationsEditor.vue"),
      },
      {
        path: "/Editor/UserInfoEditor",
        name: "UserInfoEditor",
        component: () => import("../views/dashboard/UserInfoEditor.vue"),
      },
    ],
  },

  {
    path: "/Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/userBlog",
    name: "userBlog",
    component: () => import("../layout/UserBlog.vue"),
    redirect: "/Detail/:id",
    children: [
      {
        path: "/Detail/:id",
        name: "Deail",
        component: () => import("../views/ArticleDetail.vue"),
      },
      {
        path: "/ArticleListByuser/:userId",
        name: "ArticleListByuser",
        component: () => import("../views/ArticleList.vue"),
      },
      {
        path: "/AreticleListByCompilationsId/:CompilationsId/:owningUserId",
        name: "CompilationsArticle",
        component: () => import("../views/ArticleList.vue"),
      },
    ],
  },
  {
    path: "/Personal",
    name: "Parsonal",
    component: () => import("../layout/PersonalCenter.vue"),
    redirect: "/Dynamics/:id",
    children: [
      {
        name: "dynamics",
        path: "/Dynamics/:id",
        component: () => import("../views/DynamicsList.vue"),
      },
      {
        name: "dynamicsUser",
        path: "/DynamicsUser/:id",

        component: () => import("../views/DynamicsList.vue"),
      },
      {
        name: "focus",
        path: "/focus/:id",
        component: () => import("../views/FocusAndFan.vue"),
      },
      {
        name: "fan",
        path: "/fan/:id",
        component: () => import("../views/FocusAndFan.vue"),
      },
      {
        name: "message",
        path: "/message/:id",
        component: () => import("../views/MessageList.vue"),
      },
      {
        name: "collect",
        path: "/collect/:id",
        component: () => import("../views/CollectList.vue"),
      },
    ],
  },
  {     path: '/404',       
  component: () => import('../views/404.vue'),       
  hidden: true     
}, 
{     path: '/403',       
component: () => import('../views/403.vue'),       
hidden: true     
}, 
//这个*匹配必须放在最后，将改路由配置放到所有路由的配置信息的最后，否则会其他路由path匹配造成影响。     
{     path: '/:pathMatch(.*)',
  redirect: '/404', 
  hidden: true 
}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// router.beforeEach((to,from,next )=>{
//     if (getToken()){

//     }else{
//        if(to.path=="/Login"){
//         next()
//        }else{
//         next("/ArticleList")
//        }
//     }
// })

router.beforeEach((to, from, next) => {
  if (to.path === "/Login") return next();
 else if (to.path === "/ArticleList") return next();
  //获取token
  //const tokenStr = window.sessionStorage.getItem('token')\
else  if (to.name === "dynamicsUser") {
    if (!getToken()) {
      alert("请先登入");
      next("/login");
    } else {
      next();
    }
  }
else  if (
    to.name === "articleEditor" ||
    to.name === "CompilationsEditor" ||
    to.name === "UserInfoEditor" ||
    to.name === "CompilationsArticleEditor" ||
    to.name === "articleEditorUpate"
  ) {
    if (!getToken()) {
      alert("请先登入");
      next("/login");
    } else {
      next();
    }
  } 
  else {
  return next();
  }
});

export { router, routes };
