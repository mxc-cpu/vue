<template>
     <!--个人信息展示-->
     <n-card class="block">
            <div class="columns">
              <div class="column is-one-fifth">
                <div class="box py-2 px-2" style="width: 129px; height: 140px">
                  <img
                    class="image is- 128x128"
                    src="https://bulma.io/images/placeholders/128x128.png"
                  />
                </div>
              </div>
              <n-tabs type="line" animated="true" class="column user">
                <n-tab-pane name="个人资料" tab="个人资料">
                  <span class="user">
                    <a
                      href="https://home.cnblogs.com/set/profile/"
                      class="set_profile"
                      >编辑个人资料</a
                    >
                  </span>
                  <span>
                    <a
                      id="lnk_current_user"
                      href="https://home.cnblogs.com/u/formxc/"
                      class="big bold"
                      >ForMXC</a
                    >
                  </span>
                </n-tab-pane>
                <n-tab-pane name="发布动态" tab="发布动态">
                  <div class="pp2">
                    <span id="message">
                      <n-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 5 }"
                        maxlength="50"
                        placeholder="你在做什么？你在想什么？"
                        show-count
                      />

                      <div class="py-2 has-text-right">
                        <n-button placeholder bordered type="primary">
                          发布
                        </n-button>
                      </div>
                    </span>
                  </div>
                </n-tab-pane>
                <span id="last_ing" class="hide"></span>
              </n-tabs>
            </div>
          </n-card>
          <!--/个人信息展示-->
          <!--动态列表-->
          <n-tabs
            animated="true"
            type="card"
            tab-style="min-width: 80px;"
            @close="handleClose"
          >
            <n-tab-pane tab="动态" name="plane1">
              <BlogdynamicsList />
            </n-tab-pane>
            <n-tab-pane tab="我的动态" name="plane2">
              <BlogdynamicsList :user-id="store.userId" />
            </n-tab-pane>
           
          </n-tabs>

          <!--/动态列表-->
</template>

<script setup>
import BlogdynamicsList from "../views/BlogdynamicsList.vue";
import MessageList from "../views/MessageList.vue";
import { loginState } from "../store/StoreLogin";
const store = loginState();
</script>

<style lang="scss" scoped>

</style>