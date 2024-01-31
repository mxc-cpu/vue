<template>
        <n-card class="box login-panel " >
            <h1 class=" title container login-tiele-center">登录</h1>
            <n-divider />
            <n-form :rules="rules" :model="user">
               <n-form-item path="email" label="邮箱">
                  <n-input v-model:value="user.email" placeholder="请输入邮箱"/>
               </n-form-item>
               <n-form-item path="password" label="密码">
                  <n-input  type="password" show-password-on="mousedown" v-model:value="user.password" placeholder="请输入密码"/>
               </n-form-item>
               <n-form-item v-show="hidden" part="ip" >
                <n-input :input-props="{ type: 'hidden' }" v-model:value="user.ip" />
             </n-form-item>
            </n-form>
          <template #footer>
            <n-checkbox v-model:Checked="user.rember" label="记住我"/>
            <RouterLink  to="/Register" style="float:right;">还未注册?</RouterLink>
            <n-divider />
            <n-button class="container" color="#8a2be2" block="false" size="large" @click="login" style="width: 100px;" >登 录</n-button>
          </template>
        </n-card>
  
</template>

<script setup>

import{reactive}from 'vue'

import { UserLoginStore } from '../store/StoreLogin';
let rules={
    email:[
        {required:true,message:"请输入邮箱",trigger:"blur"},
        {
            validator: function( rules,value, callback) {
              if (/^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) == false) 
              {
                callback(new Error("邮箱格式错误"));
              } 
              else 
              {
                callback();
              }
            },
            trigger: "blur"
          }
         ],
   password:[
            {required:true,message:"请输入密码",trigger:"blur"},
            {min:3,max:18,message:"密码长度在3-18个字符",trigger:"blur"},
   ],  
};
 
 const user= reactive(
    {
        email:"",
        password:"",
        ip:sessionStorage.getItem('ip')
    }
 )
  const LoginStore=UserLoginStore() 
 const login= async ()=>{
  await  LoginStore.UserLigonAuthorization(user);
 // console.log(LoginStore.emial)
 }
</script>

<style lang="scss" scoped>

@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/box.sass";
@import "bulma/sass/elements/container.sass";
@import "bulma/sass/elements/title.sass";
.login-panel{
    width: 500px;
margin: 0 auto;
margin-top: 130px;

}
.login-tiele-center{

    text-align: center;
    letter-spacing: 20px;
}
</style>