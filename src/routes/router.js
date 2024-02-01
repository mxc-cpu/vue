
import { getToken } from "../auth/login"
import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import("../layout/Layout.vue"),
        redirect: '/ArticleList',
        children: [
            {
                path: '/ArticleList',
                name: 'ArticleList',
                component: () => import("../views/ArticleList.vue")
            },
            {
                path: '/ArticleListByCategoryId/:categoryId',
                name: 'ArticleListByCategoryId',
                component: () => import("../views/ArticleList.vue")
            }
        ]
    },
    {
        path:'/categoryList',
        name:'categoryList',
        component:()=>import('../views/CategoryList.vue'),
    },
    {
        path: '/Editor',
        name: 'Editor',
        component: () => import("../views/dashboard/Dashboard.vue"),
        redirect: '/articleEditor',
        children: [
            {
                path: "/articleEditor",
                name: 'articleEditor',
                component: () => import("../views/dashboard/ArticleEditor.vue")
            },
        ]
    },
    {
        path: '/Login',
        component: () => import("../views/Login.vue")
    },
    {
        path: '/Register',
        component: () => import("../views/Register.vue")
    },
    {
        path: '/userBlog',
        name: 'userBlog',
        component: () => import("../layout/UserBlog.vue"),
        redirect: '/Detail/:id',
        children: [
            {
                path: '/Detail/:id',
               
                component: () => import("../views/ArticleDetail.vue"),
            },
            {
                path: '/ArticleListByuser/:userId',
                name: 'ArticleListByuser',
                component: () => import("../views/ArticleList.vue")
            },
            

        ],
    },
    {
        path:'/Personal',
        name:"Parsonal",
        component:()=>import("../layout/PersonalCenter.vue"),
        redirect: '/Dynamics/:id',
        children: [
            {
                path: '/Dynamics/:id',
                props: true,
                component: () => import("../views/DynamicsList.vue"),
            },
        {   name: 'focus',
            path: '/focus/:id',
        component: () => import("../views/FocusAndFan.vue"),
           
        },{ name:'fan',
            path:'/fan/:id',
        component: () => import("../views/FocusAndFan.vue"),
        }
        ,{  name:'message',
            path: '/message/:id',
        component: () => import("../views/MessageList.vue"),
        }
        ,{  name:'collect',
        path: '/collect/:id',
        component: () => import("../views/CollectList.vue"),
    }
        ]
    }

]

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
export { router, routes };