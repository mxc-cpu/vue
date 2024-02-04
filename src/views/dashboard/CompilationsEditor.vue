<template>
  <div>
    <n-button @click="showAddModel = true">添加</n-button>
    <n-table
      v-if="CompilationsList != null"
      :bordered="false"
      :single-line="false"
    >
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(Compilations, index) in CompilationsList">
          <td>{{ Compilations.compilationsName }}</td>
          <td>{{ Compilations.compilationsDescription }}</td>
          <td>
            <n-space>
              <n-button @click="toUpdate(Compilations)">修改</n-button>
              <n-button @click="deleteCompilations(Compilations)"
                >删除</n-button
              >
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>

    <div class="px-3" v-else>
      <p>您还没有合集</p>
    </div>

    <n-pagination
      class="py-4"
      v-model:page="pageinfo.pageIndex"
      :page-size="pageinfo.pageSize"
      :page-count="pageCount"
      @update:page="loadCompilations"
    />

    <n-modal
      :mask-closable="false"
      v-model:show="showAddModel"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div>添加分类</div>
      </template>
      <div>
        <n-form>
          <n-form-item label="合集名">
            <n-input
              v-model:value="addCompilations.CompilationsName"
              type="text"
              placeholder="请输入名称"
            />
          </n-form-item>
          <n-form-item label="描述">
            <n-input
              v-model:value="addCompilations.compilationsDescription"
              type="text"
              placeholder="请输入描述"
            />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div>
          <n-button @click="add">提交</n-button>
        </div>
      </template>
    </n-modal>

    <n-modal
      :mask-closable="false"
      v-model:show="showUpdateModel"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div>修改分类</div>
      </template>
      <div>
        <n-input
          v-model:value="updateCompilations.name"
          type="text"
          placeholder="请输入名称"
        />
      </div>
      <template #action>
        <div>
          <n-button @click="update">提交</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { loginState } from "../../store/StoreLogin";
import { ref, reactive, onMounted,onBeforeUpdate } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMessage, useDialog } from "naive-ui";
import {
  PageQuery,
  AddCompilations,
  UpdateCompilations,
  AddArticleToCompilations,
  DelArticleToCompilations,
  DelCompilationsById,
  QueryCompilationsArticleById,
} from "../../api/CompilationsApi";
import{CompilationsListStore} from "../../store/StoreCompilations";
const comStore=CompilationsListStore();
const router = useRouter();
const route = useRoute();

const message = useMessage();
const dialog = useDialog();

const store = loginState();

const showAddModel = ref(false);
const showUpdateModel = ref(false);

const CompilationsList = ref([]);
const addCompilations = reactive({
  CompilationsName: "",
  CompilationsDescription: "",
  OwningUserId: store.userId,
});

//分页数据
const pageinfo = reactive({
  pageIndex: 1,
  pageSize: 5,
});
let pageCount = ref(1);

const updateCompilations = reactive({
  id: 0,
  name: "",
});

onMounted(() => {
  loadCompilations();
});

const loadCompilations = async () => {
  const info = reactive({
    Id: store.userId,
    pageIndex: pageinfo.pageIndex,
    pageSize: pageinfo.pageSize,
  });
  await PageQuery(info)
    .then(async(res) => {
      if (res.data.success === true) {
        CompilationsList.value = res.data.data.dataList;
       
        pageCount.value =
          parseInt(res.data.data.recordCount / pageinfo.pageSize) +
          (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
          comStore.QueryCompilations(store.userId);
         comStore.add();
      } else {
        message.error("未知错误，查询失败");
      }
    })
    // .catch((error) => {
    //   console.log("未知错误，查询失败");
    // });
};

const add = async () => {
  AddCompilations(addCompilations)
    .then((res) => {
      if (res.data.success == true) {
       
        loadCompilations();
        message.info(res.data.message);
      } else {
        if (res.data.message == "合集添加失败，存在敏感字") {
          dialog.error({
            closable: false,
            title: res.data.message,
            content: res.data.data,
            positiveText: "好的",
            maskClosable: false,
            onMaskClick: () => {
              message.info("请点击好的");
            },
          });
        } else {
          message.error(res.data.message + "   原因:" + res.data.data);
        }
      }
      showAddModel.value = false;
    })
    .catch((error) => console.log(error));
 
};

const toUpdate = async (Compilations) => {
  showUpdateModel.value = true;
  updateCompilations.id = Compilations.id;
  updateCompilations.name = Compilations.name;
};

const update = async () => {
  let res = await axios.put("/Compilations/_token/update", {
    id: updateCompilations.id,
    name: updateCompilations.name,
  });
  if (res.data.code == 200) {
    loadCompilations();
    message.info(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
  showUpdateModel.value = false;
};

const deleteCompilations = async (Compilations) => {
  dialog.warning({
    title: "警告",
    content: "是否要删除",
    positiveText: "确定",
    negativeText: "取消",
    maskClosable: false,
    onMaskClick: () => {
      message.info("请选择");
    },
    onPositiveClick: async () => {
        DelCompilationsById(Compilations.id).then(res=>{
            if (res.data.success == true) {
          
                if( CompilationsList.value.length==1){
                    console.log("dddd")
        if( pageinfo.pageIndex!=1){
        pageinfo.pageIndex=pageinfo.pageIndex-1}else{
            pageinfo.pageIndex=1
        }

       }
        loadCompilations();
        message.info(res.data.message);
      } else {
        message.error(res.data.message);
      }
        })
     
    },
    onNegativeClick: () => {},
  });
};

</script>

<style lang="scss" scoped></style>
