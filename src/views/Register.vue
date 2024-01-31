<template>
  <n-card class="box login-panel " style="margin-top: 5%; margin-bottom: 5%; ">
    <h1 class=" title container login-tiele-center">注 册</h1>
    <n-divider />
    <n-form :rules="rules" :model=user >
      <n-form-item path="name" label="用户名">
        <n-input v-model:value="user.name" placeholder="请输入你的昵称" />
      </n-form-item>
      <n-form-item path="email" label="邮箱">
        <n-input v-model:value="user.email" placeholder="请输入邮箱" />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input type="password" show-password-on="mousedown" v-model:value="user.password" placeholder="请输入密码" />
      </n-form-item>
      <n-form :rules="rules" :model=reuser >
      <n-form-item path="repassword" label="重复密码">
        <n-input  show-password-on="mousedown" v-model:value="reuser.repassword" placeholder="请再次输入密码" />
      </n-form-item>
      </n-form>
      <n-form-item v-show="hidden" part="ip">
        <n-input :input-props="{ type: 'hidden' }" v-model:value="user.ip" />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-checkbox v-model:checked="agree"  label="同意用户协议" />
      <n-divider />
      <n-button  class="container" color="#ff69b4" block="false" size="large" :disabled="!agree" @click="register" style="width: 100px;" >注 册</n-button>
    </template>
  </n-card>
</template>

<script setup>

import { reactive, ref } from 'vue'

import { UserLoginStore } from '../store/StoreLogin';
import { registerUser } from '../auth/register';

const reuser=reactive({
  repassword:""
})
const agree=ref(false)
const user = reactive(
  {
   
    name: "",
    email: "",
    password: "",
    ip: sessionStorage.getItem('ip'),
   
  }
)

let rules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 3, max: 6, message: "姓名长度在3-6个字符", trigger: "blur" },
    {
      validator: function checkSpecialKeyPath(rules, value, callback) {
        let specialKey =
          "[`~!#$^&*()=|{}';'<>?~！#￥……&*（）——|{}【】‘；”“'。，、？@·]‘'";
        for (let i = 0; i < str.length; i++) {
          if (specialKey.indexOf(str.substr(i, 1)) != -1) {
            callback(new Error("姓名不能有特殊字符"));
          }
        }
        callback();
      }
    }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      validator: function (rules, value, callback) {
        if (/^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) == false) {
          console.log(value)
          callback(new Error("邮箱格式错误"));
        }
        else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 18, message: "密码长度在3-18个字符", trigger: "blur" },
  ],
  repassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    
    {
      validator: function validatePasswordSame(rule, value,callback) {
      if (value !== user.password) {
        console.log(value);
        console.log("re"+user.password)
       callback(new Error('两次输入密码不一致!'));
     } else {
       callback();
     }

      },
    
      trigger: 'blur'
    }
  ]
};

const LoginStore = UserLoginStore()
const register = async () => {
  if ( await registerUser(user)){
 //注册成功就直接登录
  await LoginStore.UserLigonAuthorization(user);
}
  // console.log(LoginStore.emial)
}
</script>

<style lang="scss" scoped>
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/box.sass";
@import "bulma/sass/elements/container.sass";
@import "bulma/sass/elements/title.sass";

.login-panel {
  width: 500px;
  margin: 0 auto;
  margin-top: 130px;

}

.login-tiele-center {

  text-align: center;
  letter-spacing: 20px;
}
</style>