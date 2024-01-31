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
                  <n-button @click="toUpdate(item)">修改</n-button>
                </div>
                <div class="column">
                  <n-button @click="toDelete(item)">删除</n-button>
                </div>
                <div class="column is-half">
                  <n-switch
                  
                    v-model:value="item.isTap"
                    @update:value="SetTap(item.isTap,item)"
                    
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
            v-model:value="addArticle.categoryId"
            :options="categortyOptions"
            @update:value="getname"
          />
        </n-form-item>
        <n-form-item label="封面">
          <img :src="addArticle.imageUrl" />
        </n-form-item>
        <n-form-item>
          <input type="file" :multiple="true" @change="uploadadd" />
        </n-form-item>
        <n-form-item label="内容">
          <rich-text-editor v-model="addArticle.Description"></rich-text-editor>
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
          <input type="file" :multiple="true" @change="upload" />
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
            :checked="checkis"
            label="是否发布"
          />
        </n-form-item>
        <n-form-item label="">
          <n-button @click="update">提交</n-button>
        </n-form-item>
      </n-form>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ArticlePageByuserAll,
  UploadArticleCover,
  UpdateArticle,
  AddArticle,
} from "../../api/articleApi";
import RichTextEditor from "../../components/RichTextEditor.vue";
import { CategoryGetList, ByCategoryName } from "../../api/categoryApi";
import { loginState } from "../../store/StoreLogin";
import { useMessage } from "naive-ui";
import { AddTap, DelTap } from "../../api/tapApi.js";

const userState = loginState();
let checkis = ref(false);
let check = ref(false);
const dialog = inject("dialog");
const axios = inject("axios");
let pageCount = ref(1);
const message = useMessage();
//分类选项
let categortyOptions = ref([]);
var categortyValue = ref(0);
const blogListInfo = ref([]);
//标签页
const tabValue = ref("list");

//分页数据
const pageinfo = reactive({
  pageIndex: 1,
  pageSize: 2,
});

onMounted(() => {
  loadBlogs();
  loadCategorys();
});

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
    console.log("ddd",value,item)
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
    console.log("item的Id",item.id)
    DelTap(item.articleId)
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
  categoryId: 0,
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

//图片上传
const upload = async (image) => {
  const file = image.target.files[0];
  if (beforeUpload(file)) {
    let formData = new FormData();
    //将file存入formData key为image，名字必须和后端接口参数名统一
    formData.append("image", file);
    console.log("66", formData.get("image"));
    UploadArticleCover(formData)
      .then((response) => {
        console.log("Upload successful:", response);
        if (response.data.success == true) {
          message.success("上传成功");
          updateArticle.imageUrl = response.data.data;
        } else {
          message.error("请重新上传");
        }
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  }
};

const uploadadd = async (image) => {
  const file = image.target.files[0];
  if (beforeUpload(file)) {
    let formData = new FormData();
    //将file存入formData key为image，名字必须和后端接口参数名统一
    formData.append("image", file);
    console.log("66", formData.get("image"));
    UploadArticleCover(formData)
      .then((response) => {
        console.log("Upload successful:", response);
        if (response.data.success == true) {
          message.success("上传成功");
          addArticle.imageUrl = response.data.data;
        } else {
          message.error("请重新上传");
        }
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  }
};

//图片上传检查
function beforeUpload(data) {
  if (
    data.type == "image/png" ||
    data.type == "image/jpg" ||
    data.type == "image/jpeg" ||
    data.type == "image/bmp"
  ) {
    return true;
  } else {
    message.error("只能上传png格式的图片文件，请重新上传");
    return false;
  }
}

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
        console.log("uhfopaj", res.data.data);
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
  console.log("eiayufpuwqhnap[foinq[pfimnq[pifm[qpiomeqwp[ofm]]]]]");

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
const add = () => {
  AddArticle(addArticle)
    .then((res) => {
      if (res.data.success == true) {
        message.success(res.data.message);
        loadBlogs();
      } else {
        message.error("新增失败", res.data.message);
      }
    })
    .catch((error) => {
      message.error(error);
    });
};

const toPage = async (pageNum) => {
  pageInfo.page = pageNum;
  loadBlogs();
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

const toDelete = async (blog) => {
  let res = await axios.delete("/blog/_token/delete?id=" + blog.id);
  if (res.data.code == 200) {
    message.info(res.data.msg);
    loadBlogs();
  } else {
    message.error(res.data.msg);
  }
};
</script>

<style lang="scss" scoped></style>
