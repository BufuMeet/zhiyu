<script setup>
import {defineAsyncComponent,ref} from "vue"
import NavSwiper from "@/views/Home/NavSwiper.vue"
import Loading from "@/components/Loading.vue"
const NewCourse = defineAsyncComponent({
  loader:()=>import('@/views/Home/NewCourse.vue'),
  loadingComponent: Loading,
  delay: 200,
}
)


</script>

<template>
  <NavSwiper/>
  <NewCourse v-loading="loading"/>
</template>

<style scoped>

</style>