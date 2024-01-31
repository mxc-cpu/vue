<template>
  <aside class="box side-title">
    <h1 v-if="props.type == 'focus'">
      <router-link to="/focus/">
        {{ props.name }}
      </router-link>
    </h1>
    <h1 v-else-if="props.type == 'fan'">
      <router-link to="/fan/">
        {{ props.name }}
      </router-link>
    </h1>
    <h1 v-else>{{ props.name }}</h1>
    <div v-if="props.type == 'search'">
      <n-input-group>
        <n-input
          v-model:value="searchValue"
          @input="GetSearchValue"
          type="text"
          placeholder="..."
        >
        </n-input>
        <n-button type="primary" ghost @click="GetSearchValue">
          <SearchOutlined />
        </n-button>
      </n-input-group>
    </div>

    <div class="news" v-if="props.type == 'news' && props.newsData.length > 0">
      <ul>
        <li v-for="(item, index) in props.newsData" :key="index">
          <router-link :to="`/Detail/${item.id}`">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>

    <div v-if="props.type == 'announcement'">
      <p>{{ props.announcementData }}</p>
    </div>

    <div v-if="props.type == 'fan'">
      <n-grid :key="index" x-gap="20" y-gap="2" :cols="3">
        <n-gi v-for="(item, index) in props.fanData">
          <p v-if="item == '没有粉丝'">{{ item }}</p>
          <router-link v-else :to="`/DynamicsUser/${item.userId}`">
            <div>
              <img class="image is- 1by1" :src="item.avatar" />
              <p class="has-text-centered">{{ item.name }}</p>
            </div>
          </router-link>
        </n-gi>
      </n-grid>
    </div>

    <div v-if="props.type == 'focus'">
      <n-grid :key="index" x-gap="20" y-gap="2" :cols="3">
        <n-gi v-for="(item, index) in props.focusData">
          <p v-if="item == '没有关注'">{{ item }}</p>
   
          <router-link v-else :to="`/DynamicsUser/${item.userId}`">
            <div>
              <img class="image is- 1by1" :src="item.avatar" />
              <p class="has-text-centered">{{ item.name }}</p>
            </div>
          </router-link>
        </n-gi>
      </n-grid>
    </div>
  </aside>
</template>

<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref, defineEmits } from "vue";
import { router } from "../routes/router";
const props = defineProps({
  name: {
    type: String,
    default: "搜索",
  },
  type: {
    type: String,
    default: "search",
    validator(value) {
      return ["search", "news", "announcement,fan,focus"].includes(value);
    },
  },
  newsData: {
    type: Array,
    default: [],
  },
  announcementData: {
    type: String,
    default: "无通知",
  },
  fanData: {
    type: Array,
    default: [],
  },
  focusData: {
    type: Array,
    default: [
      {
        avatar: "ss",
        name: "formxc",
        userId: 2,
      },
    ],
  },
});
const searchValue = ref("");

const emit = defineEmits(["GetSearchValue"]);
//子向父
const GetSearchValue = () => {
  emit("GetSearchValue", searchValue.value);
};
</script>

<style lang="scss" scoped>
@import "bulma/sass/elements/_all.sass";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/_all.sass";
@import "bulma/sass/layout/_all.sass";
@import "bulma/sass/grid/_all.sass";
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/helpers/_all.sass";

.side-title h1 {
  font-size: 17px;
  font-weight: bold;
  border-bottom: solid 1px #eee;
  padding-bottom: 0.6em;
  margin-top: 0px;
}

.news li {
  line-height: 2.5em;
  border-bottom: dashed 1px #eee;
}
</style>
