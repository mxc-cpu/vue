<template>
    <header class="header">
        <NavBar />
    </header>
    <div class="container">
        <n-grid  :x-gap="20" :y-gap="8" cols="1 400:2 600:3 1000:5 ">
            <n-grid-item  v-for="(item, index) in categoryListInfo.arr ">
                <CategoryItem  :key="index"
                    :categorycoverUrl="item.categoryCover" :categoryName="item.categoryName"
                    :categoryDescriptionlLink="`/ArticleListByCategoryId/${item.id}`">
                    <template #categoryName>
                        {{ item.categoryName }}
                    </template>
                    <template #categoryDescription>
                        {{ item.categoryDescription }}  
                    </template>

                </CategoryItem>
            </n-grid-item>
           
        </n-grid>
    </div>
    <footer>
    </footer>
</template>

<script setup>
import { reactive, } from "vue";
import NavBar from '../components/MyNavBar.vue';
import CategoryItem from '../components/CategoryItem.vue';
import { useRoute } from 'vue-router'
import { CategoryListStore } from "../store/SroreCategory";


const route = useRoute()
const CategoryStore = CategoryListStore()

var categoryListInfo = reactive({
    arr: [
        {

        }
    ]
})
categoryListInfo.arr = CategoryStore.CategoryListData
console.log("categoryListInfo.arr", categoryListInfo.arr)
</script>

<style lang="scss" >
@import "bulma/sass/elements/_all.sass";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/_all.sass";
@import "bulma/sass/layout/_all.sass";
@import "bulma/sass/grid/_all.sass";
@import "bulma/sass/base/_all.sass";
@import "bulma/sass/helpers/_all.sass";
</style>