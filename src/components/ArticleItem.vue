<template>
    <n-list class="box" content-style="padding:0px">
        <template #header>

            <n-h1 style="margin-bottom:auto;">
                <n-tag  v-if="props.isBoutique"  style=" margin-right: 20px; transform: translateY(-5px);" type="warning">
     精
    </n-tag>
                <router-link :to="props.detailLink">

                    <slot name="title">
                        {{ props.title }}
                    </slot>
                </router-link>
            </n-h1>
        </template>
        <n-list-item>
            <template #suffix>
<div  style=" display:inline-block; height: 180px; width: 320px;" >  <n-image class="image is-16by9"    width="100" :src=props.imageUrl
                    fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"></n-image></div>

              
            </template>
            <n-thing content-style=" padding: 0px 0px 200px 0px; height:70px;">
                <n-ellipsis :line-clamp="3" :tooltip="false">
                    <n-p v-html="Context" depth="3" style="font-size: 15px; word-break:break-all;" >
                  
                        
                    </n-p>
                    <template #tooltip>
                        <div style="text-align: center">

                        </div>
                    </template>
                </n-ellipsis>
            </n-thing>
        </n-list-item>
        <template #footer>
            <n-breadcrumb separator="|" style="width: 20px;">
                <n-breadcrumb-item>
                    <UserOutlined></UserOutlined>作者:
                    <a @click="getAuthorId"  class="has-text-link">
                        <slot name="author">
                            {{ props.author }}
                        </slot>
                    </a>
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                    <ClockCircleOutlined></ClockCircleOutlined>发布时间:
                    <slot name="time">
                        {{ props.time }}
                    </slot>
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                    <folder-outlined></folder-outlined>分类:
                    <router-link :to="{ path: '/' }" class="has-text-link">
                        <slot name="category">
                            {{ props.category }}
                        </slot>
                    </router-link>
                </n-breadcrumb-item>
            </n-breadcrumb>
            <div style="display: block;float: right;">
                <n-space>
                    <n-button text color="#8a2be2">
                        <template #icon>
                            <EyeOutlined />
                        </template>
                        <slot name="checkSum">
                            {{ props.checkSum }}
                        </slot>
                    </n-button>
                    <n-button text color="#ff69b4">
                        <template #icon>
                            <MessageOutlined />
                        </template>
                        <slot name="commentSum">
                            {{ props.commentSum }}
                        </slot>
                    </n-button>
                    <n-button text :color=color @click="upvote" :disabled="isUpvote">
                        <template #icon>
                            <LikeOutlined />
                        </template>
                        
                           {{ sum }}
                        
                    </n-button>
                </n-space>
            </div>
        </template>
    </n-list>
</template>
<script setup>
import { FolderOutlined, UserOutlined, ClockCircleOutlined, EyeOutlined, MessageOutlined, LikeOutlined } from '@ant-design/icons-vue'
import { reactive, ref,onBeforeUpdate,onMounted } from 'vue';
import { DoUpvote,YetUpvote } from '../api/upvoteApi';
import { loginState } from '../store/StoreLogin';
import { useMessage } from 'naive-ui';
import { GetUserIDByArticleId } from '../api/articleApi';
import { useRoute ,useRouter} from 'vue-router';
import { AddMessage } from '../api/messageApi';
const route=useRoute()
const router =useRouter()
const props = defineProps({
    
    id:{ type:String, default: 0,required: true },
    isBoutique:{type:Boolean , default :false ,require:true},
    title: { type: String, required: true },
    author: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    category: { type: String, default: "", required: true },
    time: { type: String, default: "", required: true },
    checkSum: { type: Infinity, default: 0, required: true },
    commentSum: { type: Infinity, default: 0, required: true },
    upvoteSum: { type: String, default: '0', required: true },
    detailLink: { type: String, default: '/' },
    imageUrl: { type: String, required: true },

})

let sum=ref()
const message=useMessage()
const store=loginState()
const cloorActive= '#ff9980'
const colorHidden='#DCDCDC'
let color= ref(colorHidden)
let isUpvote= ref(true)
let userId = ref(0);
const Context=ref("");
onMounted(()=>{
    yetUpvote()
    getUserId()
    ContextRe()
    sum.value=props.upvoteSum
})


const getUserId = async () => {
    if (Number(props.id)!=0){
  await GetUserIDByArticleId(Number(props.id)).then((res) => {
    if (res.data.success == true) {
      userId.value = res.data.data;
      console.log("作者ID2", props.id);
      console.log("作者ID", userId.value);
    }
  });}
};
onBeforeUpdate(() => {
    getUserId()
    yetUpvote()
    ContextRe()
   sum.value=props.upvoteSum

})
const yetUpvote=()=>{
if(store.userId!=null){
    const info= reactive({
        ArticleId:props.id,
        userId:store.userId
    })
    YetUpvote(info).then(res=>{
        if(res.data.success=true){
            isUpvote.value=res.data.data
            if (isUpvote.value){
            color.value=cloorActive
            }else{
                color.value=colorHidden
            }
        }
    })
}

}



const upvote=()=>{
      if (store.userId!=0){
    const info= reactive({
        ArticleId:props.id,
        userId:store.userId
    })
    DoUpvote(info).then(res=>{
        if(res.data.success==true){
            sum.value=res.data.data
            isUpvote.value=true
            color.value=cloorActive


            const messageInfo = {
            UserId: userId.value,
            fromUser: store.userId,
            typeName: "点赞",
            articleId: props.id,
            messageDescription: "",
          };

          let regex = /(<([^>]+)>)/gi;
          let cont = props.description;
console.log("内容",cont)
          cont = cont.replace(regex, "");
          //截取33个字的内容
          if (cont.length > 33) {
            cont = cont.substring(0, 33) + "...";
          }
          console.log("内容2",cont)
          messageInfo.messageDescription = cont;
          console.log("内容3",messageInfo.messageDescription)
          AddMessage(messageInfo);
        }
        else{
            color.value=cloorActive
            message.info(你已经对此文章点过赞了)
        }
    }).catch(error=>console.error(error))


}else{
    message.info("还未登录");
}
}


const ContextRe=()=>{
    
    let regex =/(<([^>]+)>)/gi
   // /<img[^>]*>[^<]*<\/img>/gm;
         

    Context.value=props.description
    Context.value =Context.value.replace(regex, "");
          //截取33个字的内容
          if ( Context.value.length > 100) {
            Context.value =  props.description.substring(0, 100) + "...";
          }
          console.log("内容ppp",Context.value)

}

const getAuthorId=()=>{
    
    GetUserIDByArticleId(props.id).then(res=>{
        if(res.data.success==true){

router.push(`/ArticleListByuser/${res.data.data}`)
        }
    })
}

</script>

<style lang="scss" scoped>

</style>