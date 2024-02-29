<script setup>
import {ref,watch} from "vue"
import Header from "@/components/Header.vue"
import Footer from "./components/Footer.vue"
import router from "./router";
import { useRoute } from "vue-router";
const route=useRoute()
let isShow=ref(false)
watch(()=>route.path,function(nv){
  if(nv==='/login'||nv==='register'){
    isShow.value=false
  }else{
    isShow.value=true
  }
},{
  immediate:true
})

</script>

<template>
<Header v-if="isShow"/>
  <router-view></router-view>
<Footer  v-if="isShow"/>
</template>

<style scoped>
</style>