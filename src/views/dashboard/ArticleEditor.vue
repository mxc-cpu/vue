<template>
  <n-tabs v-model:value="tabValue" justify-content="start" type="line">
    <n-tab-pane name="list" tab="文章列表">
      <n-list
      
        class="box"
        v-for="(item, index) in blogListInfo"
        :key="index"
        style="margin-bottom: 15px"
      
      >
 
        <template #footer>
          <span>发布时间：{{ item.releaseDate }}</span>
        </template>

        <n-list-item>
          <n-thing content-style="margin-top: 20px;">
            <template #header
              ><div   @click="ItemDescription=item.description,title=item.title,showDetail=true" class="title is-4"><a>{{ item.title }}</a></div></template
            >
            
            <template #avatar>
              <n-tag  v-if="item.isBoutique" type="warning"> 精品 </n-tag>
            </template>
            <template #default
              ><span>是否发布：{{ item.isPublished }}</span></template
            >
          </n-thing>
               <n-modal
    :mask-closable="false"
    v-model:show="showDetail"
    @after-leave="Rest"
    preset="dialog"
    title="Dialog"
    @negative-click="cancelCallback"
    style="width: 1000px"
  >
    <template #header>
      <div>文章内容查看</div>
    </template>
    <div class="content">
      <h1>《{{ title }}》</h1>
      <html v-html="ItemDescription"></html>
    </div>

    <template #action>
      <n-button @click="showDetail = false">以阅</n-button>
    </template>
  </n-modal>
          <template #suffix>
            <div class="mx-4">
              <div class="columns is-variable is-1">
                <div class="column">
                  <n-button @click="toUpdate(item)">修改</n-button>
                </div>
                <div class="column">
                  <n-button @click="toDelete(item.id)">删除</n-button>
                </div>
                <div class="column is-half">
                  <n-switch
                    v-if="item.isPublished"
                    v-model:value="item.isTap"
                    @update:value="SetTap(item.isTap, item)"
                    style="height: 35px"
                  >
                    <template #checked> 置顶 </template>
                    <template #unchecked> 不置顶 </template>
                  </n-switch>
                </div>
              </div>
            </div>
          </template>
        </n-list-item>
      </n-list>

      <n-space>
        <n-pagination
          v-model:page="pageinfo.pageIndex"
          :page-size="pageinfo.pageSize"
          :page-count="pageCount"
          @update:page="loadBlogs"
        />
      </n-space>
    </n-tab-pane>
    <n-tab-pane name="add" tab="添加文章">
      <n-form>
        <n-form-item label="标题">
          <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item label="分区">
          <n-select
            placeholder="请选择分区"
            v-model:value="addArticle.categoryId"
            :options="categortyOptions"
            @update:value="getname"
          />
        </n-form-item>
        <n-form-item label="封面">
          <img :src="addArticle.imageUrl" />
        </n-form-item>
        <n-form-item>
          <n-button @click="(showUpdatcover = true), (state = 'add')">
            上传封面
          </n-button>
        </n-form-item>
        <n-form-item label="内容">
          <rich-text-editor v-model="addArticle.description"></rich-text-editor>
        </n-form-item>
        <n-form-item label="选项">
          <n-checkbox
            @update:checked="changePublished"
            :checked="checkis"
            label="是否发布"
          />
          <n-checkbox
            @update:checked="changeBoutique"
            :checked="check"
            label="申请精品"
          />
        </n-form-item>
        <n-form-item label="">
          <n-button @click="add">提交</n-button>
        </n-form-item>
      </n-form>
    </n-tab-pane>
    <n-tab-pane name="update" tab="修改">
      <n-form>
        <n-form-item label="标题">
          <n-input
            v-filter
            v-model:value="updateArticle.title"
            placeholder="请输入标题"
          />
        </n-form-item>
        <n-form-item label="分区">
          <p>{{ updateArticle.categoryName }}</p>
        </n-form-item>
        <n-form-item label="封面">
          <img :src="updateArticle.imageUrl" />
        </n-form-item>
        <n-form-item>
          <n-button @click="(showUpdatcover = true), (state = 'upd')">
            上传封面
          </n-button>
        </n-form-item>
        <n-form-item label="内容">
          <rich-text-editor
            v-model="updateArticle.Description"
          ></rich-text-editor>
        </n-form-item>
        <n-form-item label="">
          <n-checkbox
            @update:checked="updatePublished"
            :default-checked="updateArticle.isPublished"
            label="是否发布"
          />
        </n-form-item>
        <n-form-item label="">
          <n-button @click="update">提交</n-button>
        </n-form-item>
      </n-form>
    </n-tab-pane>
  </n-tabs>
  <n-modal
    :mask-closable="false"
    v-model:show="showUpdatcover"
    @after-leave="clearArticle"
    preset="dialog"
    title="Dialog"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submitCallback(state)"
    @negative-click="cancelCallback"
    style="width: 900px; height: 900px"
  >
    <template #header>
      <div>上传封面</div>
    </template>
    <div>
      <CropperImage
        :type="2"
        :autoCropWidth="1920"
        :autoCropHeight="1080"
        :fixedNumber="[16, 9]"
      ></CropperImage>
    </div>
  </n-modal>
 

</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ArticlePageByuserAll,
  UpdateArticle,
  AddArticle,
  DelArticle,
} from "../../api/articleApi";
import { ArticleCoverStore } from "../../store/storeArticle";
import CropperImage from "../../components/CropperImage.vue";
import { AddDynamics } from "../../api/DynamicsApi";
import RichTextEditor from "../../components/RichTextEditor.vue";
import { CategoryGetList, ByCategoryName } from "../../api/categoryApi";
import { loginState } from "../../store/StoreLogin";
import { useMessage, useDialog } from "naive-ui";
import { AddTap, DelTap } from "../../api/tapApi.js";
import { CompilationsListStore } from "../../store/StoreCompilations";
const comStore = CompilationsListStore();
const dialog = useDialog();
const state = ref("add");
const userState = loginState();
const CoverStore = ArticleCoverStore();
let checkis = ref(false);
let showDetail=ref(false);
let title=ref("")
let check = ref(false);
let ItemDescription=ref("");
let pageCount = ref(1);
const message = useMessage();
const showUpdatcover = ref(false);
//分类选项
let categortyOptions = ref([]);
const blogListInfo = ref([]);
//标签页
const tabValue = ref("list");

//分页数据
const pageinfo = reactive({
  pageIndex: 1,
  pageSize: 2,
});
//路由
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (route.params.tap != null) {
    updateArticle.id = comStore.updateArticle.id;
    updateArticle.title = comStore.updateArticle.title;
    updateArticle.Description = comStore.updateArticle.description;
    updateArticle.imageUrl = comStore.updateArticle.imageUrl;
    updateArticle.categoryName = comStore.updateArticle.categoryName;
    updateArticle.isPublished = comStore.updateArticle.isPublished;
    tabValue.value = route.params.tap;
  } else {
    loadBlogs();
    loadCategorys();
  }
});

//更新封面
const submitCallback = (state) => {
  if (state == "add") {
    addArticle.imageUrl = CoverStore.ArticleCoverUrl;
  } else if ((state = "upd")) {
    updateArticle.imageUrl = CoverStore.ArticleCoverUrl;
  }
};
//重置
const cancelCallback = () => {
  CoverStore.ArticleCoverUrl = "";
  CoverStore.ArticleCoverUrl = "";
};

//是否发布（新增）
const changePublished = (checked) => {
  if (checked == false) {
    check.value = false;
  }

  checkis.value = !checkis.value;
  addArticle.isPublished = checked;
};
//申请精品
const changeBoutique = (checked) => {
  if (checked == true) {
    checkis.value = true;
  }
  check.value = !check.value;
  addArticle.isBoutique = check.value;
};
//是否发布（修改）
const updatePublished = (checked) => {
  updateArticle.isPublished = checked;
};
//置顶
const SetTap = (value, item) => {
  console.log("ddd", value, item);
  if (value) {
    let info = reactive({
      tapArticleId: item.id,
      userId: userState.userId,
      title: item.title,
    });
    AddTap(info)
      .then((res) => {
        if (res.data.success == true) {
          message.success("置顶成功");
        } else {
          message.error("置顶失败");
        }
      })
      .catch((error) => console.log(error));
  } else {
    console.log("item的Id", item.id);
    DelTap(item.id)
      .then((res) => {
        if (res.data.success == true) {
          message.success("取消置顶");
        } else {
          message.error("取消失败");
        }
      })
      .catch((error) => console.log(error));
  }
};

//文章添加数据
const addArticle = reactive({
  userId: Number(userState.userId),
  authorName: userState.name1,
  imageUrl: "",
  categoryId: null,
  categoryName: "",
  title: "",
  description: "",
  isPublished: false,
  isBoutique: false,
});

//文章修改数据
const updateArticle = reactive({
  id: 0,
  categoryName: "",
  imageUrl: "",
  title: "",
  Description: "",
  isPublished: false,
});

//读取博客列表
const loadBlogs = async () => {
  const info = reactive({
    Id: userState.userId,
    pageIndex: pageinfo.pageIndex,
    pageSize: pageinfo.pageSize,
  });
  await ArticlePageByuserAll(info)
    .then((res) => {
      if (res.data.success === true) {
        blogListInfo.value = res.data.data.dataList;
        
        pageCount.value =
          parseInt(res.data.data.recordCount / pageinfo.pageSize) +
          (res.data.data.recordCount % pageinfo.pageSize > 0 ? 1 : 0);
      } else {
      }
    })
    .catch((error) => {
      console.log("未知错误，查询失败");
    });
};

//读取分类
const loadCategorys = async () => {
  CategoryGetList()
    .then((res) => {
      if (res.data.success == true) {
        res.data.data.forEach((element) => {
          var item = {
            label: element.categoryName,
            value: element.id,
          };
          categortyOptions.value.push(item);
        });
      } else {
        console.log("获取分类失败");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
// 获取分类名
const getname = () => {
  ByCategoryName(addArticle.categoryId)
    .then((res) => {
      if (res.data.success == true) {
        addArticle.categoryName = res.data.data;
        message.success(addArticle.categoryName);
      } else {
        message.error("获取失败");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
//添加文章
const add = async () => {
  AddArticle(addArticle)
    .then((res) => {
      if (res.data.success == true) {
        if (res.data.message == "认真点!就这还想申请精品") {
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
          message.success(res.data.data + res.data.message);
          //文章发表成功后就发布动态
          //正则替换掉HTML标签
          let regex = /(<([^>]+)>)/gi;
          let cont = addArticle.description;
          console.log("没替换", cont);
          cont = cont.replace(regex, "");
          //截取33个字的内容
          console.log("替换了", cont);
          if (cont.length > 33) {
            cont = cont.substring(0, 33) + "...";
          }
          const info = reactive({
            UserId: userState.userId,
            typeNmae: "发表了",
            articleId: res.data.data,
            dynamicsDescription: cont,
          });

          AddDynamics(info);

          loadBlogs();
        }
      } else {
        message.error("新增失败", res.data.message);
      }
    })
    .catch((error) => {
      message.error(error);
    });
};

const toUpdate = async (blog) => {
  tabValue.value = "update";
  updateArticle.id = blog.id;
  updateArticle.title = blog.title;
  updateArticle.Description = blog.description;
  updateArticle.imageUrl = blog.imageUrl;
  updateArticle.categoryName = blog.categoryName;
  updateArticle.isPublished = blog.isPublished;
};

const update = async () => {
  UpdateArticle(updateArticle)
    .then((res) => {
      if (res.data.success == true) {
        message.success(res.data.message);
        loadBlogs();
      } else {
        message.error("修改失败", res.data.message);
      }
    })
    .catch((error) => {
      message.error(error);
    });
  // if (res.data.code == 200) {
  //     message.info(res.data.msg)

  //     tabValue.value = "list"
  // } else {
  //     message.error(res.data.msg)
  // }
};

const toDelete = async (id) => {
  dialog.warning({
    title: "警告",
    content: "是否要删除你的努力成果",
    positiveText: "我想写个更好的",
    negativeText: "留下吧",
    maskClosable: false,
    onMaskClick: () => {
      message.info("请选择");
    },
    onPositiveClick: async () => {
      DelArticle(id).then((res) => {
        if (res.data.success == true) {
          message.info(res.data.data);
          if (blogListInfo.value.length == 1) {
            if (pageinfo.pageIndex != 1) {
              pageinfo.pageIndex = pageinfo.pageIndex - 1;
            } else {
              pageinfo.pageIndex = 1;
            }
          }
          loadBlogs();
        } else {
          message.error(res.data.data);
        }
      });
    },
    onNegativeClick: () => {},
  });
};
</script>

<style lang="scss" scoped></style>
