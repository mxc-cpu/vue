<template>
  <!--封面-->

  <div class="card">
    <div class="card-image">
      <figure class="image is-3by1">
        <img :src="data.imageUrl" alt="Placeholder image" />
      </figure>
    </div>

    <!--标题-->
    <section class="hero is-link">
      <div class="hero-body container">
        <p class="title is-2">
          {{ data.title }}
        </p>
      </div>
    </section>

    <n-divider>
      <p class="title is-6">
        {{ data.authorName }} &Proportion; {{ data.releaseDate }}
      </p>
    </n-divider>
    <!--文章内容-->
    <div class="card-content content container">
      <div v-html="data.description"></div>
    </div>

    <!--相关操作和信息-->
    <n-divider> </n-divider>
    <div class="card-content">
      <div class="media">
        <!-- <div class="colums is-desktop ">
                    <div class="column ">
                        <RouterLink to="/">上一篇{{ }}</RouterLink>
                    </div>
                    <div class="column ">
                        <RouterLink to="/">下一篇 {{ }}</RouterLink>
                    </div>



                </div> -->

        <div class="columns is-desktop">
          <div style="display: inline-block; width: auto">
            <n-button
              class="column is-1"
              text
              @click="upvote"
              :disabled="isUpvote"
            >
              <n-icon size="50" :color="color">
                <FileLike />
              </n-icon>
              <p>{{ upvoteState }}:</p>
              <p style="font-size: 16px">{{ upvoteSum }}</p>
            </n-button>
          </div>
          <div style="display: inline-block; width: auto">
            <n-button class="column is-1" text @click="collect">
              <n-icon size="50" :color="color2">
                <Star />
              </n-icon>
              <p>{{ collectState }}:</p>
            </n-button>
          </div>
        </div>
      </div>

      <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
    </div>

    <div class="hero is-info is-small">
      <div class="hero-body container">
        <p class="title is-4 container">评论</p>
      </div>
    </div>

    <!--评论-->
    <div class="card-content">
      <Comment />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { ArticleGetDetail } from "../api/articleApi";
import Comment from "../components/comment.vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { Star, FileLike } from "@vicons/tabler";
import { DoUpvote, YetUpvote } from "../api/upvoteApi";
import { useMessage } from "naive-ui";
import { loginState } from "../store/StoreLogin";
import { DelCollect, AddCollect, YetCollect } from "../api/collectAip";

const router = useRouter();
const route = useRoute();
const blogInfo = ref(
  "sssssssssssssssssddddddddddddddddddddddddddddddddddddddddd"
);
const message = useMessage();
const store = loginState();
const cloorActive = "hsl(344, 95%, 61%)";
const colorHidden = "#DCDCDC";
const colorActive = "hsl(48, 100%, 67%)";

let data = ref({});
let upvoteState = ref("点赞");
let collectState = ref("收藏");
let upvoteSum = ref();
let color = ref(colorHidden);
let color2 = ref(colorHidden);
let isUpvote = ref(true);
let isCollect = ref(false);
onMounted(() => {
  loadDetail();
 
});

/**
 * 读取文章详情
 */

const loadDetail = async () => {
  await ArticleGetDetail(route.params.id)
    .then((res) => {
      console.log("xxx");
      if (res.data.success == true) {
        data.value = res.data.data;
        upvoteSum.value = data.value.upvoteSum;
      yetUpvote();
  isyetCollect();  
    
    
    } else {
        console.log("没有找到");
      }
    })
    .catch((error) => {
      console.log("mmmd", error);
    });
};

const back = () => {
  router.push("/");
};

const yetUpvote = () => {
  if (store.userId != null) {
    const info = reactive({
      ArticleId: data.value.id,
      userId: store.userId,
    });
    YetUpvote(info).then((res) => {
      if ((res.data.success = true)) {
        isUpvote.value = res.data.data;

        if (isUpvote.value) {
          // upvoteSum.value += 1;
          upvoteState.value = "以点赞";
          color.value = cloorActive;
        } else {
          color.value = colorHidden;
        }
      }
    });
  }
};

const upvote = () => {
  if (store.userId != null) {
    const info = reactive({
      ArticleId: data.value.id,
      userId: store.userId,
    });
    DoUpvote(info)
      .then((res) => {
        if (res.data.success == true) {
          upvoteSum.value += 1;
          isUpvote.value = true;
          upvoteState.value = "以点赞";
          color.value = cloorActive;
        } else {
          color.value = cloorActive;
          message.info(你已经对此文章点过赞了);
        }
      })
      .catch((error) => console.error(error));
  } else {
    message.info("还未登录");
  }
};
const isyetCollect = () => {
  if (store.userId != null) {
    message.info( data.value.id)
    const info = reactive({
      ArticleId: data.value.id,
      userId: store.userId,
    });
    YetCollect(info).then((res) => {
      if ((res.data.success = true)) {
        isCollect.value = res.data.data;
        console.log("isCollect",isCollect.value)
        if (isCollect.value) {
          collectState.value = "以收藏";
          color2.value = colorActive;
        } else {
          color2.value = colorHidden;
        }
      }
    });
  }
};

const collect = () => {
  if (store.userId != null) {
    const info = reactive({
      ArticleId: data.value.id,
      title: data.value.title,
      userId: store.userId,
    });
    if (isCollect.value == false) {
        AddCollect(info).then((res) => {
            message.create(info.ArticleId)
        if (res.data.success == true) {
          isCollect.value = true;
          collectState.value = "以收藏";
          message.info(res.data.data)
          color2.value = colorActive;
        }
      });
    } else {
      DelCollect(info).then((res) => {
        if (res.data.success == true) {
          isCollect.value = false;
          collectState.value = "收藏";
          color2.value = colorHidden;
        }
      });
    }
  } else {
    message.info("还未登录");
  }
};
</script>

<style lang="scss">
.imge {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.blog-content img {
  max-width: 100% !important;
}
</style>
