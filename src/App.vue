<template>
<!-- <RouterView  /> -->
<router-view :key="$route.fullPath"></router-view>
</template>

<script setup>
import { RouterView } from 'vue-router';
import {GetAnn} from "../src/api/annApi"
import {AnnStore} from "../src/store/StoreAnn"

const store= AnnStore()
const  getInfo= async()=>{

    store.annInfo = await  GetAnn().then(res=>{
    if (res.data.success==true){
      return  res.data.data.content+":" +res.data.data.editTime
      
    }
    
  })
  
 
}
getInfo()
</script>

<style scoped>

</style>
