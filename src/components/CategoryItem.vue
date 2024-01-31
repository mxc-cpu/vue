
<template>
    <div class="card" :title="props.categoryName">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="props.categorycoverUrl">
            </figure>
        </div>

        <div class="card-content">
            <div class="media">

                <div class="media-content">
                    <p class="title is-4">
                    <slot name="categoryName">
                        {{ props.categoryName }}
                    </slot>
                </p>
                </div>
            </div>
            <div class="content">
            <slot name="categoryDescription">
              {{ props.categoryDescription }}
            </slot>
        </div>
        </div>
      
        <footer class="card-footer ">
            <RouterLink class="card-footer-item "  style="background-color:rgb(141, 236, 204);" :to="props.categoryDescriptionlLink">
            <p class="title is-5 " > 进入
            <RightSquareOutlined />
            </p>
            </RouterLink>
        </footer>
   
    </div>
</template>




<script setup>
import { RightSquareOutlined } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router';
const props = defineProps({
    categoryName: { type: String, required: true },
    categoryDescription: { type: String, default: "一个分区", required: true },
    categoryDescriptionlLink: { type: String, default: '/' },
    categorycoverUrl: { type: String, required: true },

})
</script>

<style lang="scss" scoped>

</style>