<template>
  <n-tabs v-model:value="tabValue" justify-content="start" type="line">
    <n-tab-pane name="account" tab="账户信息">
      <article class="message is-warning">
        <div class="message-body">
          <strong>名称:</strong>
          <div style="display: flex; justify-content: flex-end">
            <span> {{name}} </span>
            <n-button  @click="showUpdatename=true"  style="margin-left: auto">编辑</n-button>
          </div>
        </div>
      </article>
      <article class="message is-warning">
        <div class="message-body">
          <strong>头像:</strong>
          <figure class="image is-128x128">
            <img :src="avatar" />
          </figure>

          <div style="display: flex; justify-content: flex-end">
            <n-button @click="showUpdateavater=true"  style="margin-left: auto">编辑</n-button>
          </div>
        </div>
      </article>
      <article class="message is-primary">
        <div class="message-body">
          <strong>注册时间:</strong> {{AddTime }}
        </div>
      </article>
      <article class="message is-dark">
        <div class="message-body"><strong>账号:</strong> {{ Email}}</div>
      </article>
      <article class="message is-link">
        <div class="message-body">
          <strong>密码:</strong>
          <div style="display: flex; justify-content: flex-end">
            <span> *********** </span>
            <n-button @click="showUpdatpassword=true" style="margin-left: auto">编辑</n-button>
          </div>
        </div>
      </article>
    </n-tab-pane>
    <n-tab-pane name="info" tab="用户资料">
      <n-form>
        <n-form-item label="性别" >
          <n-radio-group v-model:value="userInfo.sex" >
            <n-radio value="男"> 男 </n-radio>
            <n-radio value="女"> 女 </n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="以有地址">

         
<p>{{ userInfo.address }}</p>

</n-form-item>
        <n-form-item label="新的地址">
          <n-select
         
            v-model:value="l1"
            :placeholder="a1"
            :options="level1"
            
            @update-value="
              l2 = '';
              l3 = '';
            "
          ></n-select>
          -
          <n-select
          :placeholder="a2"
          
            v-model:value="l2"
            :options="level2"
            @update-value="l3 = ''"
          ></n-select>
          -
          <n-select :placeholder="a3" v-model:value="l3" :options="level3"></n-select>
        
        </n-form-item>
        <n-form-item label="兴趣">
          <n-input v-model:value="userInfo.interest"  placeholder="请输入兴趣" />
        </n-form-item>

        <n-form-item label="出生年月">
          <n-date-picker v-model:value="userInfo.birth" type="date" />
        </n-form-item>
        <n-form-item label="职业">
          <n-input v-model:value="userInfo.occupation" placeholder="请输入职业" />
        </n-form-item>
        <n-form-item label="留言">
          <n-input v-model:value="userInfo.message" placeholder="请输入留言" />
        </n-form-item>
        <n-form-item label="">
          <n-button @click="Update">提交</n-button>
        </n-form-item>
      </n-form>
    </n-tab-pane>
  </n-tabs>


  <n-modal
      :mask-closable="false"
      v-model:show="showUpdateavater"
      @after-leave="clearArticle"
      preset="dialog"
      title="Dialog"
      style="width: 900px; height: 900px;"
    >
      <template #header>
        <div>修改头像</div>
      </template>
      <div >
    <CropperImage/>
  </div>
  
    </n-modal>
    <n-modal
      :mask-closable="false"
      v-model:show="showUpdatpassword"
      @after-leave="clearArticle"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div>更改密码</div>
      </template>
      <n-form ref="passRef" :rules="rules" :model=updatePad >
        <n-form-item path="oldPad" label="旧密码">
        <n-input type="password" show-password-on="mousedown" v-model:value="updatePad.oldPad" placeholder="请输入密码" />
      </n-form-item>
      <n-form-item path="newPad" label="新密码">
        <n-input type="password" show-password-on="mousedown" v-model:value="updatePad.newPad" placeholder="请输入密码" />
      </n-form-item>
      <n-form-item path="rePad" label="重复密码">
        <n-input  show-password-on="mousedown" v-model:value="updatePad.rePad" placeholder="请再次输入密码" />
      </n-form-item>
     </n-form>
      <template #action>
        <div>
          <n-button :disabled="isAddcan" @click="handleValidateButtonClick"
            >提交</n-button
          >
        </div>
      </template>
    </n-modal><n-modal
      :mask-closable="false"
      v-model:show="showUpdatename"
      @after-leave="clearArticle"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div>修改名字</div>
      </template>
      <n-form ref="passRef" :rules="rules" :model=namemodle >
          <n-form-item path="name" label="新名称">
            <n-input
              v-model:value="namemodle.name"
              type="text"
              placeholder="请输入名称"
            />
          </n-form-item>
        </n-form>
      <template #action>
        <div>
          <n-button :disabled="isAddcan" @click="updateName"
            >提交</n-button
          >
        </div>
      </template>
    </n-modal>

</template>

<script setup>
import { computed,ref ,onBeforeUpdate, reactive} from "vue";
import { GetUserAvatar, GetUserInfo,GetUserName ,GetUserAddtime,
  GetUserEmail,UpdateInfo,UpdateName,
  UpdatePassWord
} from "../../api/getUserInfoApi";
import CropperImage  from "../../components/CropperImage.vue"
import districts from "../../assets/districts"
import { loginState } from "../../store/StoreLogin";
import { useMessage, useDialog } from "naive-ui";
import { info } from "sass";

const message = useMessage();
const dialog = useDialog();
const store = loginState();
const passRef=ref();

let showUpdatename=ref(false)
let showUpdateavater=ref(false)
let showUpdatpassword=ref(false)

const updatePad=reactive({

  oldPad:"",
 newPad:"",
 rePad:""
})



let a1=ref();
let a2=ref();
let a3=ref();
let l1 = ref('');
let l2 = ref('');
let l3 = ref('');
let d = ref("");
let Birth=ref(0);
let AddTime=ref();
let Email=ref();
let userInfo=ref();
let  avatar=ref();
let  name=ref("");
let namemodle=reactive({
  name:''
})
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
  oldPad: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 18, message: "密码长度在3-18个字符", trigger: "blur" },
  ],
  newOld: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 18, message: "密码长度在3-18个字符", trigger: "blur" },
  ],
  rePad: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    
    {
      validator: function validatePasswordSame(rule, value,callback) {
      if (value !==  updatePad.newPad) {
        console.log("11",value)
       console.log("00",updatePad.newPad)
       callback(new Error('两次输入密码不一致!'));
     } else {
       callback();
     }

      },
    
      trigger: 'blur'
    }
  ]
};

 
const handleValidateButtonClick=(e)=> {
        e.preventDefault();
        passRef.value?.validate((errors) => {
          if (!errors) {
            updatePassWord();
          } else {
            console.log(errors);
            message.error("验证失败");
          }
        });
      }
      const handleValidateButtonClick2=(e)=> {
        e.preventDefault();
        passRef.value?.validate((errors) => {
          if (!errors) {
            updateName();
          } else {
            console.log(errors);
            message.error("验证失败");
          }
        });
      }


const level1 =computed ({
  
 get:()=>{ var dis = [];

  for (let i in districts) {
    dis.push({ label: districts[i].name, value: i });
  }
  console.log("dis",dis)
  return dis;}
})


const level2 =computed ({get:() => {
  if (l1.value == '') return [];
  var dis = [];
  console.log("ss",l1.value)
  let ddd = districts[l1.value].districts;
  for (let i in ddd) {
    dis.push({ label: ddd[i].name, value: i });
  }
  return dis;}
})

const level3 = computed ({get:()=> {
  if (l2.value == '') return [];
  var dis = [];
  let ddd = districts[l1.value].districts[l2.value].districts;
  for (let i in ddd) {
    dis.push({ label: ddd[i].name, value: i });
  }
  return dis;}
})
const district = () => {
  if (this.l1 == "" || this.l2 == "") return {};

  let d = districts[l1.value].districts[l2.value];
  if (d.districts.length > 0 && l3.value != "") d = d.districts[l3.value];

  let loc = d.center.split(",");
  //d.lng=loc[0]
  d.lng = parseFloat(loc[0]);
  d.lat = parseFloat(loc[1]);
  console.log(d);
  d.value = d;
  return d;
};
const getInfo= async()=>{
  console.log("slll")


  const [infoOf,avatarOf, nameOf,addtimeOf,EmailOf] = await Promise.all([
          GetUserInfo(store.userId),
          GetUserAvatar(store.userId),
          GetUserName(store.userId),
          GetUserAddtime(store.userId),
          GetUserEmail(store.userId)
        ]);
   
        userInfo.value=infoOf.data.data
        avatar.value= avatarOf.data.data,
        name.value=nameOf.data,
        AddTime.value=addtimeOf.data.data,
        Email.value=EmailOf.data.data

// const list =  userInfo.value.address.split('-');
// a1.value=list[0];
// a2.value=list[1];
// a3.value=list[2];


// if (userInfo.value.address!=null){
//       const list =userInfo.value.address.split("-");

// let a1 = list[0] ; let a2=list[1] ;let a3=list[2];
// l1.value = districts.findIndex(value=>value.name == a1)
// l2.value = districts[l1.value].districts.findIndex(value=>value.name == a2)
// l3.value = districts[l1.value].districts[l2.value].districts.findIndex(value=>value.name == a3)
// // l1.value = a1
// // l2.value = a2
// // l3.value = a3;
// }
}
const Update=()=>{
   if (l1.value!='')
   userInfo.value.address=districts[l1.value].name+'-';
   if (l2.value!=''){
    userInfo.value.address =userInfo.value.address+'-'+districts[l1.value].districts[l2.value].name+'-' ;
   }
   if (l3.value!=''){
    userInfo.value.address =  userInfo.value.address +districts[l1.value].districts[l2.value].districts[l3.value].name;
   }
 
  UpdateInfo(userInfo.value,store.userId).then(res=>{
    if(res.data.success==true){
      message.success("信息更改成功")
      getInfo();
    }else{
      message.warning("信息更改失败")
    }
  })
}

const updatePassWord=()=>{

  const info ={
    Id:store.userId,
    Password: updatePad.oldPad,
    NewPassword: updatePad.newPad
  }
  UpdatePassWord(info).then(res=>{
    if (res.data.success==true){
      message.success("更改成功")
    }else{
      message.info("更改失败"+res.data.data)
    }
  })
}
const updateName=()=>{
  name.value=namemodle.name
UpdateName(name.value,store.userId).then(res=>{
  if (res.data.success==true){
    message.success("更改成功")
   store.name1=name.value
  }else{
    name.value=store.name1
    message.info("更改失败")
  }
})
}
getInfo();


</script>

<style lang="scss" scoped></style>
