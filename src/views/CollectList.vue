<template>
  <n-tabs
    animated="true"
    type="card"
    tab-style="min-width: 80px;"
    v-model:value="tabValue"
    @update:value="change"
  >
    <n-tab-pane tab="收藏夹" name="collect">
      <table v-if ="collect.arr.length!=0" class="table  is-striped  is-hoverable is-fullwidth" >
        <thead>
      <tr>
       
        <th>标题</th>
      
        <th><abbr title="操作">操作</abbr></th>
      </tr>
    </thead>
    <tbody>
        <tr  v-for="(item, index) in collect.arr">
            <td  style="width: 90%;">
          <router-link   :to="`/Detail/${item.artileId}`">
         <p style="text-decoration: underline;"> {{ item.title }}</p>
          </router-link></td> 
        
          <td ><a @click="del(item.id)">删除</a></td>
   
   
       
         
    </tr>
    
    </tbody>
      </table>
      <div class="px-3" v-else>
        <p >您还没有中意的文章</p>
      </div>
      <div class="level py-6">
        <n-pagination
          class="level-item has-text-centered"
          v-model:page="pageinfo.pageIndex"
          :page-size="pageinfo.pageSize"
          :page-count="pageCount"
          @update:page="loadCollect"
        />
      </div>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import {
  onMounted,
  onBeforeMount,
  reactive,
  ref,
  watch,
  onBeforeUpdate,
} from "vue";
import { DelCollectById,PageQuery } from "../api/collectAip";
import { routes } from "../routes/router";
import { useRouter, useRoute } from "vue-router";
import { useMessage, useDialog } from "naive-ui";
import { loginState } from "../store/StoreLogin";
const dialog = useDialog();
const message = useMessage();
const route=useRoute()
const store = loginState();
const collect=reactive({arr:[]});
var pageCount = ref(1);
var pageinfo = reactive({
  pageIndex: 1,
  pageSize: 20,

})

const del = (id) => {
  dialog.warning({
    title: "注意",
    content: "你要删除该收藏吗",
    positiveText: "是的我义无反顾",
    negativeText: "不了我有所留恋",
    onPositiveClick: () => {
      DelCollectById(id).then((res) => {
        if (res.data.success == true) {
            loadCollect()
          message.info("删除成功，旧的不去新的不来");
        } else {
            loadCollect()
          message.info("删除失败，它还有未尽之事");
        }
      });
    },
    onNegativeClick: () => {
      message.info("经典值得回味");
    },
  });
};
const loadCollect =async(page = 0) => {
  if (page != 0) {
    pageinfo.pageIndex = page
  }

    const info = reactive({
      Id: store.userId,
      pageIndex: pageinfo.pageIndex,
      pageSize: pageinfo.pageSize,
    })
    PageQuery(info).then(res=>{
        if(res.data.success==true){
            collect.arr=res.data.data.dataList
        }else{
            collect.arr=null
        }
    }).catch(error=>{console.error(error);})
}
onBeforeUpdate(()=>{
    loadCollect()
})
onMounted(()=>{
    loadCollect()
})
</script>

<style lang="scss" scoped></style>
