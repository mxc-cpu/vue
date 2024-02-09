<template>
  <div>
    <!--    :addable="addable"
      tab-style="min-width: 80px;"
      @add="handleAdd"-->

    <n-tabs
      v-if="CompilationsList != null"
      v-model:value="tabvalue"
      :closable="closable"
      @close="handleClose"
      type="card"
    >
      <n-tab-pane name="list" tab="列表" key="panel">
        <n-button @click="showAddModel = true">添加</n-button>
        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th>名称</th>
              <th>描述</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(Compilations, index) in CompilationsList">
              <td
                @click="
                  handleAdd(Compilations.id, Compilations.compilationsName)
                "
              >
                {{ Compilations.compilationsName }}
              </td>
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
        <n-pagination
          class="py-4"
          v-model:page="pageinfo.pageIndex"
          :page-size="pageinfo.pageSize"
          :page-count="pageCount"
          @update:page="loadCompilations"
        />
      </n-tab-pane>
      <n-tab-pane
        v-for="(panel, indexbase) in panels"
        :key="indexbase"
        :name="panel.CompilationsName"
        :tab="panel.CompilationsName"
      >
        <n-button
          @click="
            (showAddLinkModel = true), canAddLinkArticle(panel.id, indexbase)
          "
          >添加文章关联</n-button
        >
        <n-list
          class="box"
          v-for="(item, index) in panel.list"
          :key="index"
          style="margin-bottom: 15px"
        >
          <template #footer>
            <span>发布时间：{{ item.releaseDate }}</span>
          </template>

          <n-list-item>
            <n-thing content-style="margin-top: 20px;">
              <template #header
                ><div class="title is-4">{{ item.title }}</div></template
              >
              <template #default
                ><span>是否发布：{{ item.isPublished }}</span></template
              >
            </n-thing>
            <template #suffix>
              <div class="mx-4">
                <div class="columns is-variable is-1">
                  <div class="column">
                    <n-button @click="goUpdate(item)">修改</n-button>
                  </div>
                  <div class="column">
                    <n-button
                      @click="
                        ArticletoCompilationsDelete(
                          item.id,
                          panel.id,
                          indexbase
                        )
                      "
                      >删除</n-button
                    >
                  </div>
                </div>
              </div>
            </template>
          </n-list-item>
        </n-list>
      </n-tab-pane>
    </n-tabs>
    <div class="px-3" v-else>
      <p>您还没有合集</p>
    </div>

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
        <n-form>
          <n-form-item label="合集名">
            <n-input
              v-model:value="updateCompilations.CompilationsName"
              type="text"
              placeholder="请输入名称"
            />
          </n-form-item>
          <n-form-item label="描述">
            <n-input
              v-model:value="updateCompilations.CompilationsDescription"
              type="text"
              placeholder="请输入描述"
            />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div>
          <n-button @click="update">提交</n-button>
        </div>
      </template>
    </n-modal>

    <n-modal
      :mask-closable="false"
      v-model:show="showAddLinkModel"
      @after-leave="clearArticle"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div>添加文章关联</div>
      </template>
      <n-checkbox-group v-model:value="comRef" @update:value="selectArticle">
        <n-grid v-for="item in addArticleLinkData" :y-gap="10" :cols="1">
          <n-gi>
            <n-checkbox :value="item.id"
              >{{ item.title }} 发布时间: {{ item.releaseDate }} 分类{{
                item.categoryName
              }}</n-checkbox
            >
          </n-gi>
        </n-grid>
      </n-checkbox-group>
      <template #action>
        <div>
          <n-button :disabled="isAddcan" @click="ArticleLinkCompilations"
            >提交</n-button
          >
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { loginState } from "../../store/StoreLogin";
import { ref, reactive, onMounted, onBeforeUpdate, computed } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
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
import { QueryUserArticleByList } from "../../api/articleApi";
import { CompilationsListStore } from "../../store/StoreCompilations";
import { Plane } from "@vicons/tabler";

const tabvalue = ref("list");
const comStore = CompilationsListStore();
const router = useRouter();
const route = useRoute();

const message = useMessage();
const dialog = useDialog();

const store = loginState();

const showAddModel = ref(false);
const showUpdateModel = ref(false);
const showAddLinkModel = ref(false);

const panels = reactive([]);
let closable = computed(() => {
  return panels.length >= 1;
});
const CompilationsList = ref([]);
const addCompilations = reactive({
  CompilationsName: "",
  CompilationsDescription: "",
  OwningUserId: store.userId,
});
let isAddcan = ref(false);
const addArticleLinkData = ref([]);
const comRef = ref();
let selectCom = ref();

let indexbase = ref();

const handleClose = (name) => {
  // const { value: panels } = panelsRef;
  const nameIndex = panels.findIndex((panelName) => {
   //列表面板不在panels里面所以不能关闭面板
   
   return panelName.CompilationsName == name
    
  });
  if (!~nameIndex) return;
  panels.splice(nameIndex, 1);
  if (panels.length==0) {
    //没有合集标签页打开了就回到列表页
    tabvalue.value  = 'list';
  }else{
    //关闭标签后总是跳转到当前最小页
    tabvalue.value  = panels[Math.min(nameIndex, panels.length - 1)].CompilationsName;
  }
};

const canAddLinkArticle = async (Id, indexbase2) => {
  selectCom.value = Id;
  indexbase.value = indexbase2;

  const [userArticle, compilationArticle] = await Promise.all([
    QueryUserArticleByList(store.userId),
    QueryCompilationsArticleById(Id),
  ]);
  let user = userArticle.data.data;
  let com = compilationArticle.data.data;

  for (var i = 0, userLen = user.length; i < userLen; i++) {
    for (var j = 0, comLen = com.length; j < comLen; j++) {
      console.log("i", user[i].id);
      console.log("j", com[j].id);
      if (user[i].id == com[j].id) {
        break;
      }
    }
    if (j === comLen) {
      addArticleLinkData.value.push(user[i]);
    }
  }
  console.log("addArticleLinkData:", addArticleLinkData.value);
};
const clearArticle = () => {
  addArticleLinkData.value = [];
  comRef.value = [];
};
const selectArticle = (value) => {
  comRef.value = value;
  message.info(JSON.stringify(value));
  if (comRef.value.length > 0) {
    isAddcan.value = false;
  } else {
    isAddcan.value = true;
  }
};
const ArticleLinkCompilations = async () => {
  let list = [];
  for (var i = 0, comLen = comRef.value.length; i < comLen; i++) {
    let data = {
      articleId: comRef.value[i],
      compilationsId: selectCom.value,
    };
    console.log("dddx", comRef.value[i]);
    list.push(data);
  }

  AddArticleToCompilations(list).then((res) => {
    if (res.data.success == true) {
      message.success("添加成功");
      showAddLinkModel.value = false;

      QueryCompilationsArticleById(selectCom.value).then((res) => {
        if (res.data.success == true) {
          panels[indexbase.value].list = res.data.data;
        } else {
          console.log("错误");
        }
      });

      message.info(res.data.message);

      clearArticle();
    }
  });
};

//分页数据
const pageinfo = reactive({
  pageIndex: 1,
  pageSize: 5,
});
let pageCount = ref(1);

const updateCompilations = reactive({
  Id: 0,
  CompilationsName: "",
  CompilationsDescription: "",
  OwningUserId: store.userId,
});

onMounted(() => {
  loadCompilations();
});

//添加合集标签页
const handleAdd = async (Id, Name) => {
  QueryCompilationsArticleById(Id).then((res) => {
    if (res.data.success == true) {
      console.log("卡速", Name);
      let info = {
        id: Id,
        CompilationsName: Name,
        list: res.data.data,
      };

      if (JSON.stringify(panels).indexOf(JSON.stringify(info)) == -1) {
        panels.push(info);
        tabvalue.value = Name; // 进行动态的操作,如果不存在就放进去，存在就直接跳转
      } else {
        tabvalue.value = Name;
      }
    } else {
      console.log("错误");
    }
  });
};

const loadCompilations = async () => {
  const info = reactive({
    Id: store.userId,
    pageIndex: pageinfo.pageIndex,
    pageSize: pageinfo.pageSize,
  });
  await PageQuery(info).then(async (res) => {
    if (res.data.success === true) {
      CompilationsList.value = res.data.data.dataList;

      pageCount.value =
        parseInt(res.data.data.recordCount / pageinfo.pageSize) +
        (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
      comStore.QueryCompilations(store.userId);
    } else {
      message.error("未知错误，查询失败");
    }
  });
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

const goUpdate = async (CompilationsData) => {
  comStore.updateArticle = await CompilationsData;

  router.push({ path: "articleEditor/update/" });
};

const toUpdate = async (Compilations) => {
  showUpdateModel.value = true;
  updateCompilations.OwningUserId = Compilations.owningUserId;
  updateCompilations.CompilationsName = Compilations.compilationsName;
  updateCompilations.CompilationsDescription =
    Compilations.compilationsDescription;
  updateCompilations.Id = Compilations.id;
};

const update = async () => {
  UpdateCompilations(updateCompilations)
    .then((res) => {
      if (res.data.success == true) {
        loadCompilations();
        message.info(res.data.message);
      } else {
        if (res.data.message == "合集更改失败，存在敏感字") {
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
      showUpdateModel.value = false;
    })
    .catch((error) => console.log(error));
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
      DelCompilationsById(Compilations.id).then((res) => {
        if (res.data.success == true) {
          if (CompilationsList.value.length == 1) {
            console.log("dddd");
            if (pageinfo.pageIndex != 1) {
              pageinfo.pageIndex = pageinfo.pageIndex - 1;
            } else {
              pageinfo.pageIndex = 1;
            }
          }
          loadCompilations();
          message.info(res.data.message);
        } else {
          message.error(res.data.message);
        }
      });
    },
    onNegativeClick: () => {},
  });
};

const ArticletoCompilationsDelete = async (id, comid, index) => {
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
      DelArticleToCompilations(id).then((res) => {
        if (res.data.success == true) {
          QueryCompilationsArticleById(comid).then((res) => {
            if (res.data.success == true) {
              panels[index].list = res.data.data;
            } else {
              console.log("错误");
            }
          });

          message.info(res.data.message);
        } else {
          message.error(res.data.message);
        }
      });
    },
    onNegativeClick: () => {},
  });
};
</script>

<style lang="scss" scoped></style>
