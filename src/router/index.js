import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index'
import { ElMessage } from 'element-plus'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/views/Home/Home.vue')
    },
    {
      path:'/course',
      component: () => import('@/views/Course/Course.vue'),
    },
    {
      path:'/course/detail',
      component:() => import('@/views/Course/Detail.vue')
    },
    {
      path:'/login',
      component:()=>import('@/views/Login/Login.vue')
    },
    {
      path:'/coursePlay/:courseId/:chapterId',
      component:()=>import('@/views/Course/CoursePlay.vue')
    },
    {
      path:'/cart',
      component:()=>import('@/views/Cart/Cart.vue'),
      beforeEnter:(to,from)=>{
        const userStore = useUserStore()
        if(userStore.userInfo.id){
          return true
        }else{
          ElMessage.info('请先登录')
          router.push('/login')
        }
      }
    },
    {
      path:'/confirmOrder',
      component:()=>import('@/views/Cart/ConfirmOrder.vue'),
      beforeEnter:(to,from)=>{
        const userStore = useUserStore()
        if(userStore.userInfo.id){
          return true
        }else{
          ElMessage.info('请先登录')
          router.push('/login')
        }
      }
      
    }
    
    
  ]
})


export default router
