<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="store.avatarUrl" />
      </p>
      <RouterLink :to="`/DynamicsUser/${store.userId}`"
        ><p class="has-text-centered">{{ store.name1 }}</p></RouterLink
      >
    </figure>

    <div class="media-content">
      <div class="field">
        <p class="control">
          <n-input
            v-model:value="commentConent"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            maxlength="300"
            placeholder="你在做什么？你在想什么？"
            show-count
          />
        </p>
      </div>
      <div class="field">
        <p class="control py-2 has-text-right">
          <n-button
            @click="pushcoment(0, 0, commentConent)"
            placeholder
            bordered
            type="primary"
          >
            发布
          </n-button>
        </p>
      </div>
    </div>
  </article>

  <article v-for="(item, index) in commentList" :key="index" class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="item.userUrl" />
      </p>
    </figure>

    <div class="media-content">
      <!--评论-->
      <div class="content">
        <p>
          <strong
            ><RouterLink :to="`/DynamicsUser/${item.userId}`">{{
              item.userName
            }}</RouterLink></strong
          >
          : <small> {{ item.createtime }}</small>

          <n-button
            text
            :color="color"
            @click="UpdateCommentUpvote(item.id), (item.upvoteSum += 1)"
            style="float: inline-end"
          >
            <template #icon>
              <LikeOutlined />
            </template>

            {{ item.upvoteSum }}
          </n-button>
          <br />
          {{ item.content }}
          <br />
        </p>
        <n-button
          class="has-text-info"
          type="text"
          @click="activate(item.userId, item.id)"
          >回复</n-button
        >
        <n-button
          style="float: inline-end"
          v-if="item.userId == store.userId || UserId == store.userId"
          class="has-text-info has-text-right"
          type="text"
          @click="delComment(item.id)"
        >
          删除
        </n-button>
      </div>

      <!--/评论-->

      <n-collapse v-if="item.replyComment.length > 0">
        <!--回复-->
        <n-collapse-item name="reply" :trigger-areas="extra1">
          <template #header-extra>
            <p class="has-text-info">展开评论</p>
          </template>
          <template #arrow> </template>
          <article v-for="replyitem in item.replyComment" class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img :src="replyitem.userUrl" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong
                    ><RouterLink :to="`/DynamicsUser/${item.userId}`">{{
                      replyitem.userName
                    }}</RouterLink></strong
                  >
                  <small>
                    · 回复 >
                    <RouterLink :to="`/DynamicsUser/${replyitem.replyId}`">{{
                      replyitem.replyName
                    }}</RouterLink>
                    : {{ replyitem.createtime }}</small
                  >
                  <br />
                  {{ replyitem.content }}
                  <br />
                </p>
                <div class="media-content">
                  <n-button
                    class="has-text-info"
                    type="text"
                    @click="activate(replyitem.userId, item.id)"
                  >
                    回复
                  </n-button>
                  <!--文章作者和评论的人可以删除-->
                  <n-button
                    style="float: inline-end"
                    v-if="
                      replyitem.userId == store.userId || UserId == store.userId
                    "
                    class="has-text-info has-text-right"
                    type="text"
                    @click="delComment(replyitem.id)"
                  >
                    删除
                  </n-button>
                </div>
              </div>
            </div>
          </article>
        </n-collapse-item>
      </n-collapse>
      <!--/回复-->
    </div>
  </article>

  <n-drawer
    v-model:show="active"
    :width="200"
    :height="200"
    :placement="placement"
    :trap-focus="false"
    :block-scroll="false"
  >
    <n-drawer-content title="回复">
      <div class="field">
        <p class="control">
          <n-input
            v-model:value="replyCommentConent"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            maxlength="300"
            placeholder="回复其他人"
            show-count
          />
        </p>
      </div>
      <div class="field">
        <p class="control py-2 has-text-right">
          <n-button
            @click="pushcoment(ridRef, pidRef, replyCommentConent)"
            placeholder
            bordered
            type="primary"
          >
            发布
          </n-button>
        </p>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { LikeOutlined } from "@ant-design/icons-vue";
import { ref, reactive, onMounted, onBeforeUpdate } from "vue";
import {
  QueryCommentList,
  DelComment,
  AddComment,
  UpdateUpvoteSum,
} from "../api/commentApi";
import { AddDynamics } from "../api/DynamicsApi";
import { useMessage } from "naive-ui";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { AddMessage } from "../api/messageApi";
import { loginState } from "../store/StoreLogin";
let isUpvote = ref(false);

const buttonState = ref(false);
const route = useRoute();
const store = loginState();
const message = useMessage();
const commentList = ref();
const extra1 = ref(["extra"]);

const ridRef = ref();
const pidRef = ref();
const active = ref(false);
const placement = ref("bottom");

let commentConent = ref("");
let replyCommentConent = ref("");

const props = defineProps({
  ArtivleId: {
    type: Number,
    default: 0,
  },
  UserId: {
    type: Number,
    default: -1,
  },
});

const getCommentList = async () => {
  await QueryCommentList(route.params.id).then((res) => {
    if (res.data.success == true) {
      commentList.value = res.data.data;
    } else {
      message.error(res.data.message + " : " + res.data.data);
    }
  });
};
const activate = (rid, pid) => {
  ridRef.value = rid;
  pidRef.value = pid;
  active.value = true;
  placement.value = "bottom";
};
const hidden = () => {
  ridRef.value = "";
  pidRef.value = "";
  active.value = false;
  placement.value = "bottom";
};

const delComment = async (id) => {
  await DelComment(id).then((res) => {
    if (res.data.success == true) {
      message.success("删除评论" + res.data.data + "成功");
      getCommentList();
    } else {
      message.success("删除评论失败" + res.data.message);
    }
  });
};

const UpdateCommentUpvote = (comid) => {
  const info = {
    CommentId: comid,
    UserId: 0,
  };
  //如果是未登入的就根据ip地址
  if (store.userId == 0) {
    console.log("IP", sessionStorage.getItem("ip"));
    info.UserId = sessionStorage.getItem("ip");
  } else {
    info.UserId = store.userId.toString();
    console.log("IP", store.userId);
  }
  UpdateUpvoteSum(info).then(() => {
    console.log("浏览");
  });
  getCommentList();
};

const pushcoment = async (rid, pid, content) => {
  if (store.userId != 0) {
    const info = {
      UserId: store.userId,
      ReplyId: rid,
      ParentId: pid,
      ArticleId: props.ArtivleId,
      Content: content,
    };

    AddComment(info).then((res) => {
      if (res.data.success == true) {
        replyCommentConent.value = "";
        commentConent.value = "";
        hidden();

        message.success("评论成功!");
        if (info.ParentId == 0) {
          //截取33个字的内容

          if (info.Content.length > 33) {
            info.Content = info.Content.substring(0, 33) + "...";
          }
          const dyInfo = reactive({
            UserId: info.UserId,
            typeNmae: "评论了",
            articleId: info.ArticleId,
            dynamicsDescription: info.Content,
          });
          //发表对文章的评论成功后就发布动态
          AddDynamics(dyInfo).then( message.info("发布动态"));
       

          //发消息给文章作者
          const messageInfo = {
            UserId: props.UserId,
            fromUser: store.userId,
            typeName: "评论",
            articleId: info.ArticleId,
            messageDescription: "",
          };

          let regex = /(<([^>]+)>)/gi;
          let cont2 = info.Content;

          cont2 = cont2.replace(regex, "");
          //截取33个字的内容
          if (cont2.length > 33) {
            cont2 = cont2.substring(0, 33) + "...";
          }
          messageInfo.messageDescription = cont2;
          AddMessage(messageInfo).then( message.info("发布消息"));
        }else{
          //发消息给回复的用户
          const messageInfo = {
            UserId: info.ReplyId,
            fromUser: store.userId,
            typeName: "回复",
            articleId: info.ArticleId,
            messageDescription: "",
          };

          let regex = /(<([^>]+)>)/gi;
          let cont2 = info.Content;

          cont2 = cont2.replace(regex, "");
          //截取33个字的内容
          if (cont2.length > 33) {
            cont2 = cont2.substring(0, 33) + "...";
          }
          messageInfo.messageDescription = cont2;
          AddMessage(messageInfo).then( message.info("发布消息"));


        }
      } else {
        message.info(res.data.data + ":" + res.data.message);
      }
    });
  } else {
    message.info("请登录后评论");
  }
  getCommentList();
};

onMounted(() => {
  getCommentList();
});
</script>

<style lang="scss" scoped>
@import "bulma/sass/elements/_all.sass";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/_all.sass";
@import "bulma/sass/layout/_all.sass";
@import "bulma/sass/grid/_all.sass";
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/helpers/_all.sass";
</style>
