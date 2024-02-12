<template>
  <div id="main">
    <header class="header">
      <NavBar />
    </header>
    <div class="container">
      <section class="hero is-primary is-small">
        <div class="hero-body" style="padding: 24px 283px">
          <p class="title">Hi {{ store.name1 }} 欢迎</p>
          <p class="subtitle">欢迎参观我的园子</p>
          <p class="subtitle has-text-right">{{store.message}}</p>
        </div>
      </section>
      <n-grid cols="24" :x-gap="10" item-responsive>
        <n-grid-item span="0 400:8 600:5 800:5">
          <Asidebox name="公告" type="announcement"></Asidebox>
          <n-card >
          <n-menu  :options="menuOptions">   </n-menu>
          
        </n-card>
        </n-grid-item>
        <n-grid-item span="24 400:8 600:14 800:14">
       <!---->
       <n-message-provider >
       <n-dialog-provider >
       <RouterView/>
      </n-dialog-provider>
      </n-message-provider>
        </n-grid-item>
        <n-grid-item span="0 400:8 600:5 800:5">
     

          <Asidebox
            name="我的关注"
            type="focus"
            :focusData="focusDataComp.arr"
            :user-id="route.params.id"
          ></Asidebox>
          <Asidebox
            name="我的粉丝"
            type="fan"
            :fanData="fanDataComp.arr"
            :user-id="route.params.id"
          ></Asidebox>
        </n-grid-item>
      </n-grid>
    </div>

    <footer></footer>
  </div>
</template>

<script setup>
import Asidebox from "../components/asidebox.vue";
import NavBar from "../components/MyNavBar.vue";
import BlogdynamicsList from "../views/BlogdynamicsList.vue";
import MessageList from "../views/MessageList.vue";
import { loginState } from "../store/StoreLogin";
import { onBeforeMount, onBeforeUpdate, onMounted, reactive, ref,h } from "vue";
import { FindFocusList, FindFansList } from "../api/DynamicsApi";
import { GetUserAvatar, GetUserName } from "../api/getUserInfoApi";
import { RouterView,RouterLink,useRoute } from "vue-router";
import{ NIcon } from 'naive-ui'
import {Bell,Books,Activity,Star} from "@vicons/tabler";
const route=useRoute()

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions= [
  {
    label: () => h(
     
      RouterLink,
      {
        to: {
          path: '/Dynamics/'+`${store.userId}`,
         
        },
       
      },
     
      { default: () => "动态" },
    
    ),
    key: '动态',
    icon: renderIcon(Activity)
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px'
      }
    }
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/collect/'+`${store.userId}`,
          params: {
            userId:store.userId,
          }
        }
      },
      { default: () => "收藏" }
    ),
    key: '收藏',
    icon: renderIcon(Star)
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px'
      }
    }
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name:"ArticleListByuser",
          params: {
            userId:store.userId,
          }
         
        }
      },
      { default: () => "博客" }
    ),
    key: '博客',
    icon: renderIcon(Books)
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px'
      }
    }
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name:"message",
          params: {
            Id:store.userId,
          }
         
        }
      },
      { default: () => "消息" }
    ),
    key: '消息',
    icon: renderIcon(Bell)
  },
 
]
const store = loginState();

const fanDataComp = reactive({ arr: [] });

const focusDataComp = reactive({ arr: [] });
const props = defineProps({ id: { type: Number, required: true },})
const loadfoucus = () => {
  let dataList = { arr: [] };

  FindFocusList(route.params.id).then(async (res) => {
    focusDataComp.arr.splice(0);
    console.log("清空", focusDataComp.arr);
    if (res.data.success == true) {
      dataList.arr = res.data.data;

      for (let index in dataList.arr) {
        if (index > 8) {
          break;
        }
        //    await GetUserAvatar(dataList.arr[index]).then(res=>{data.avatar= res.data.data})
        //    await GetUserName(dataList.arr[index]).then(res=>{data.name= res.data})
        //因为这二个调用方法是异步的所有为了保证在在拿到值后才进行赋值，所有要用await，但是要用await就必须把方法设成async的才可以用，然后如果向上面那二个一样调用
        //这二个axios请求就不能并行运行，要用下面这种方法(提高两倍效率,毕竟2个方法同时执行)，注意forEach 里面不能调用异步他会直接结束循环到外面，for 才可以，所以这不用Foreach(map也不可以)
        const [avatarOf, nameOf] = await Promise.all([
          GetUserAvatar(dataList.arr[index]),
          GetUserName(dataList.arr[index]),
        ]);
        let data = {
          userId: dataList.arr[index],
          avatar: avatarOf.data.data,
          name: nameOf.data,
        };

        focusDataComp.arr.push(data);
      }
      console.log("Data", dataList.arr);
      console.log("数组", focusDataComp.arr);
    } else {
      focusDataComp.arr = await res.data.data;
    }
  });
};
const loadfan = () => {
  let dataList = { arr: [] };

  FindFansList(route.params.id).then(async (res) => {
    fanDataComp.arr.splice(0);
    console.log("清空", fanDataComp.arr);
    if (res.data.success == true) {
      dataList.arr = res.data.data;

      for (let index in dataList.arr) {
        if (index > 8) {
          break;
        }

        //    await GetUserAvatar(dataList.arr[index]).then(res=>{data.avatar= res.data.data})
        //    await GetUserName(dataList.arr[index]).then(res=>{data.name= res.data})
        //因为这二个调用方法是异步的所有为了保证在在拿到值后才进行赋值，所有要用await，但是要用await就必须把方法设成async的才可以用，然后如果向上面那二个一样调用
        //这二个axios请求就不能并行运行，要用下面这种方法(提高两倍效率,毕竟2个方法同时执行)，注意forEach 里面不能调用异步他会直接结束循环到外面，for 才可以，所以这不用Foreach(map也不可以)
        const [avatarOf, nameOf] = await Promise.all([
          GetUserAvatar(dataList.arr[index]),
          GetUserName(dataList.arr[index]),
        ]);
        let data = {
          userId: dataList.arr[index],
          avatar: avatarOf.data.data,
          name: nameOf.data,
        };

        fanDataComp.arr.push(data);
      }
      console.log("Data2", dataList.arr);
      console.log("数组2", fanDataComp.arr);
    } else {
      fanDataComp.arr = await res.data.data;
    }
  });
};

onMounted(() => {
  loadfan();
  loadfoucus();
});
onBeforeUpdate(()=>{
  loadfan();
  loadfoucus();
});
</script>

<style lang="scss">
@import "bulma/sass/elements/_all.sass";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/_all.sass";
@import "bulma/sass/layout/_all.sass";
@import "bulma/sass/grid/_all.sass";
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/helpers/_all.sass";

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
