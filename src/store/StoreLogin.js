import { defineStore } from "pinia";
import { loginUser, logOut } from "../auth/login.js";
import { GetUserName, GetUserAvatar } from "../api/getUserInfoApi.js";
import { router } from "../routes/router.js";
import { Logout } from '../api/getUserInfoApi.js';

import * as jwtToken from "jose";

export const UserLoginStore = defineStore("StoreLogin", {
  state: () => ({
    exp: Date.now(),
    token: null,
  }),

  actions: {
    async UsrerLogin(token1) {
      this.token = await token1;
      localStorage.setItem("tokenAnt", this.token);
    },
    logOut() {
      Logout(loginState().userId).then(res=>{
        if(res.data.success==true){
       //移除token
        logOut()
        //用户信息改变，调用该方法进行重置
        loginState().changeState()
        location. reload()
      
      }})
    },

    async UserLigonAuthorization(login) {
      const { data } = await loginUser(login);
      //记入登入状态检查是否关闭了浏览器
      sessionStorage.setItem("isClose", false);
      this.UsrerLogin(data.token);
   
      router.replace("/");
    },
  },
});
export const loginState = defineStore("loginState", {
  state: () => ({
    InLogin: false,
    name1: "",
    avatarUrl: "",
    userId: 0,
    message: "他什么都没写下",
  }),
  actions: {
    async changeState() {
        if (sessionStorage.getItem("isClose") == null&&this.InLogin) {
            this.name1 = "";
            this.userId = 0;
            this.InLogin = false;
            logOut();
            console.log("退出登入");
          }
         
          else  if (localStorage.getItem("tokenAnt")) {
        
          const token = localStorage.getItem("tokenAnt");

          this.InLogin = true;

          const decoded = jwtToken.decodeJwt(token);
          //保存用户id
          this.userId = Number(decoded.id);

          //用异步的方法同时获取用户的名字和获取用户的头像，效率二倍
          const [avatarOf, nameOf] = await Promise.all([
            GetUserAvatar(decoded.id),
            GetUserName(decoded.id),
          ]);
          this.name1 = nameOf.data;
          if (avatarOf.data.success == true) {
            this.avatarUrl = avatarOf.data.data;
          } else {
            console.log("获取头像失败");
          }
        
      } else {
        this.name1 = "";
        this.userId = 0;
        this.InLogin = false;
        //取消标记
        sessionStorage.removeItem("isClose");
        console.log("退出登入");
      }
    },
  },
});
