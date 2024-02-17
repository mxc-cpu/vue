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
            <n-checkbox v-model:checked="rember" label="记住我"/>
            <RouterLink  to="/Register" style="float:right;">还未注册?</RouterLink>
            <n-divider />
            <n-button class="container" color="#8a2be2" block="false" size="large" @click="login" style="width: 100px;" >登 录</n-button>
          </template>
        </n-card>
  
</template>

<script setup>

import{reactive ,onMounted,ref}from 'vue'
import { Base64 } from 'js-base64';
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
    },
    
 )

 let rember =ref(false);
  const LoginStore=UserLoginStore() 
  // const Base64 = Base64();
  //引入64编码

 const login= async ()=>{

if (rember.value){

  let password = Base64.encode(user.password); // base64加密
            setCookie(user.email, password, 7);
}else
{
  console.log("xxx",rember.value)
  setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
}



  await  LoginStore.UserLigonAuthorization(user);
 // console.log(LoginStore.emial)
 }
// 设置cookie
 const setCookie=(userId, password, days) =>{

  let date = new Date(); // 获取时间
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days); // 保存的天数
  // 字符串拼接cookie
  window.document.cookie ="userId" + "=" + userId + ";path=/;expires=" + date.toGMTString();
  window.document.cookie ="password" + "=" + password + ";path=/;expires=" + date.toGMTString();


 
}

// 读取cookie 将用户名和密码回显到input框中
const getCookie=()=> {

  if (document.cookie.length > 0) {
    let arr = document.cookie.split("; "); //分割成一个个独立的“key=value”的形式
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].split("="); // 再次切割，arr2[0]为key值，arr2[1]为对应的value
      if (arr2[0] === "userId") {
        user.email = arr2[1];
      } else if (arr2[0] === "password") {
         
        user.password= Base64.decode(arr2[1]);// base64解密
        rember.value = true;
      }
    }
  }
}
onMounted(()=>{
  getCookie()
})

 
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