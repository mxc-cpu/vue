<template>
     <!--个人信息展示-->
     <n-card class="block">
            <div class="columns">
       
              <div class="column is-one-fifth">
                <div class="box py-2 px-2" style="width: 129px; height: 140px">
                  <img
                    class="image is- 128x128"
                    :src= avatar 
                  />
                 
                </div >
                <div class="column ">
                <p  class="title is-4  " >{{name}}</p>
                    <RouterLink v-if="name==store.name1" to="/">编辑个人资料</RouterLink>
                      <RouterLink v-else  :to="`/ArticleListByuser/${route.params.id}`">查看博客--> </RouterLink>
                  </div>
              </div>
              <n-tabs type="line" animated="true" class="column user">
                <n-tab-pane name="个人资料" tab="个人资料">
                 <p>名称:{{name}}</p>
                 <div v-if="userinfo!=null" >
                 <p v-if="userinfo.sex!=''" >性别:{{ userinfo.sex }}</p>
                 <p v-if="userinfo.dateBirth!='0001-01-01'" >出生日期:{{ userinfo.dateBirth }}</p>
                 <p v-if="userinfo.netAge!=0" >园龄:{{ userinfo.netAge }}天</p>
                 <p v-if="userinfo.address!=''">地址:{{userinfo.address}}</p>
                 <p v-if="userinfo.interest!=''">爱好:{{ userinfo.interest }}</p>
                 <p v-if="userinfo.occupation!=''">职业:{{ userinfo.occupation }}</p>
                </div>
                </n-tab-pane>
                <n-tab-pane v-if="name==store.name1" name="发布动态" tab="发布动态">
                  <div class="pp2">
                    <span id="message">
                      <n-input
                        type="textarea"
                        v-model:value="content"
                        :autosize="{ minRows: 3, maxRows: 5 }"
                        maxlength="33"
                        placeholder="你在做什么？你在想什么？"
                        show-count
                      />

                      <div class="py-2 has-text-right">
                        <n-button @click="aboutDynamics" placeholder bordered type="primary">
                          发布
                        </n-button>
                      </div>
                    </span>
                  </div>
                </n-tab-pane>
                <span id="last_ing" class="hide"></span>
              </n-tabs>
            </div>
          </n-card>
          <!--/个人信息展示-->
          <!--动态列表-->
          <n-tabs
            animated="true"
            type="card"
            tab-style="min-width: 80px;"
            @close="handleClose"
          >
            <n-tab-pane  v-if="name==store.name1" tab="动态" name="plane1">
              <BlogdynamicsList ref="DynRef" :user-id="store.userId" type="all" />
            </n-tab-pane>
            <n-tab-pane tab="我的动态" name="plane2">
              <BlogdynamicsList ref="DynRef" :user-id="route.params.id"  type="myself"/>
            </n-tab-pane>
           
          </n-tabs>

          <!--/动态列表-->
</template>

<script setup>
import BlogdynamicsList from "../views/BlogdynamicsList.vue";
import MessageList from "../views/MessageList.vue";
import { loginState } from "../store/StoreLogin";
import { useMessage } from "naive-ui";
import { GetUserAvatar, GetUserInfo,GetUserName } from "../api/getUserInfoApi";
import { useRoute } from "vue-router";
import { onBeforeUpdate, onMounted, onUpdated, reactive,ref } from "vue";
import { AddDynamics } from "../api/DynamicsApi";
const store = loginState();
const route=useRoute();
const   userinfo=ref();
const  avatar=ref();
const DynRef=ref();
const  name=ref();
const content=ref("");
const message=useMessage();
let isRunting= false;
let DynamicsTime =ref(0);

let  timerObject =null;

const  starTime=()=>{
  console.log("ddd");
  if(isRunting){
  if (DynamicsTime.value>0){
 
    timerObject=setInterval(()=>{
      DynamicsTime.value--;
if (DynamicsTime.value<=0){
  isRunting=false
  
  clearInterval(timerObject);
    DynamicsTime.value=0;}
    },1000);
  }
 
}

}






const aboutDynamics=()=>{


  if(DynamicsTime.value==0){
    if (  content.value==""){
      message.info("内容不能为空！")
    }else{
  const dyInfo = reactive({
            UserId: store.userId,
            typeNmae: "说道",
            articleId: -1,
            dynamicsDescription:content.value,
          });
        
          AddDynamics(dyInfo).then(res=>{
            if(res.data.success==true){
           
            DynRef.value.loadDynamics()}
          
          })
          isRunting=true
          DynamicsTime.value=20
          starTime()

          message.info("发布了一条动态")
          content.value=""
        }
        }
          else{
            
            message.info("请稍等，"+DynamicsTime.value+"秒后可发送")
          }

}

const getInfo= async()=>{
  console.log("slll")


  const [infoOf,avatarOf, nameOf] = await Promise.all([
          GetUserInfo(route.params.id),
          GetUserAvatar(route.params.id),
          GetUserName(route.params.id),
        ]);
   
        userinfo.value=infoOf.data.data
        if(userinfo.value.message!=""){
        store.message=userinfo.value.message
        console.log("ssss",store.message)

      }
        avatar.value= avatarOf.data.data,
        name.value=nameOf.data
   
        
 

 

}
onBeforeUpdate(()=>{
  getInfo();
})

getInfo();

</script>

<style lang="scss" scoped>
.pp2 #message {
  background-color: #f1eeee9f;
  padding: 15px 15px 5px 15px;
  display: inline-block;
  border-radius: 4px;
  margin: 10px;
  position: relative;
  display: block;
}

.pp2 #message::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 10px solid #f1eeee9f;
  position: absolute;
  top: 6px;
  left: -17px;
}
.user {
  height: 250px;
}

.ing_text {
  width: 540px;
}
</style>