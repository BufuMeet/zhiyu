<script setup>
import {ref} from "vue"
import {ArrowRight} from '@element-plus/icons-vue'
import {GetSliderServices} from '@/api/slider.js'
import {GetFirstCategorys,GetSecondCategorys,courseSearch} from "@/api/course.js"
import {isLevel} from '@/hook/level.js'

// loading
let loading=ref(false)
const sliderList=ref([])
// 控制显示隐藏
let isShow=ref(false)
// 控制li的显示class
let currentIndex=ref('')

const getSlider=async ()=>{
  const data=await GetSliderServices()
  sliderList.value=data.data.list
  console.log(sliderList.value);

}
getSlider()
// 获取一级分类
const FirstCategorysList=ref([])
  const courseList=ref([])//课程数据
const FirstCategorys= async()=>{
  const res=await GetFirstCategorys()
  FirstCategorysList.value=res.data.list
}
FirstCategorys()

const secondCategoryList=ref([])//二级分类数据
  // 鼠标移入移出事件
const mouseHover=async(id)=>{
   courseList.value=[]
  loading.value=true
  isShow.value=true
  currentIndex.value=id
  const res=await GetSecondCategorys(id)
  secondCategoryList.value=res.data.list
  // 获取课程
  const data=await courseSearch({
    pageNum:1,
    pageSize:4,
    entity:{
      firstCategory:id
    }
  })
  courseList.value=data.data.pageInfo.list
   loading.value=false
}
const mouseOut=()=>{
   
  isShow.value=false
  currentIndex.value=''
 
}


</script>

<template>
<div class="swiper-main">
  <div class="container">
    
    <div class="top">
      <ul @mouseleave="mouseOut">
        <li  v-for=" item in FirstCategorysList" :key="item.id" @mouseenter="mouseHover(item.id)"  :class="item.id===currentIndex ?'active':''">
          <span>{{item.categoryName}}</span>
          <el-icon class="icon-ArrowRight"><ArrowRight /></el-icon>
        </li>
         <div class="active-r" v-if="isShow">
            <div class="active-r-t">
              <h3>基础知识</h3>
              <div>
              <span>知识点：</span>
              <ul>
                <li v-for="item in  secondCategoryList" :key="item.id">{{item.categoryName}}</li>
               
              </ul>
              </div>
            </div>
          <div class="active-r-b">
            <ul v-loading="loading">
              <li v-for="item in courseList" :key="item.id">
                <img :src="item.courseCover" alt="">
                <div>
                  <span>{{ item.courseName }}</span>
                  <span>{{isLevel(item.courseLevel)}}·{{item.clicks}}人报名</span>
                  <span>免费学习</span>
                </div>
              
              </li>
 

            </ul>
          </div>
        </div>
      </ul>
      <!-- 轮播图 -->
      <div class="lbt">
          <el-carousel v-if="sliderList.length>0" :interval="5000" arrow="always">
            <el-carousel-item v-for="item in sliderList" :key="item.id">
             <img :src="item.imageUrl" alt="">
            </el-carousel-item>
          </el-carousel>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li >
          <h3>
            <img src="@/imgs/chuji.png" >
          </h3>
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
        <li>
          <h3>
            <img src="@/imgs/gaoji.png" >
          </h3>
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
        <li>
          <h3>
            <img src="@/imgs/suanfa.png" >
          </h3>
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
        <li>
          <h3>
            <img src="@/imgs/xiangmu.png" >
          </h3>
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
        <li>
            <img src="@/imgs/chuji.png" >
          <div>
            <h4>初级课程</h4>
            <span>入门快，岗位多</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<style scoped>
.swiper-main{
background: url("@/imgs/transitionbg.png");
width: 100%;
height: 600px;

.container {
  max-width: 1000px;
  padding: 47px 0;
  margin: 0 auto;
  .top{
    display: flex;
    width: inherit;
    height: 373px;
    border-radius:11px 11px 0px 0px ;
    &>ul{
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: space-around;
      width: 160px;
      height: 100%;
      background: #2B283D;
      border-radius:11px,0px,0px,0px ;
       .active{
          background-color: rgba(255,255,255,.2);
        }
        .active-r{
          display: flex;
          flex-direction: column;
        position: absolute;
        top: 0;
        left: 160px;
        max-width: 724px;
        height: 373px;background-color: #fff;
        border-radius: 0px 11px 0px 0px;
        z-index: 98;
        .active-r-t{
          padding: 23px 30px;
          h3{
            font-weight:900;
          }
          /* 知识点 */
          div{
            display:flex;
            ul{
              display: flex;
              flex-wrap: wrap;
              li:not(:nth-child(1)){
                margin-left: 20px;
              }
            }
          }
          li{
            color: #000000;
          }
        
        }
        .active-r-b{
          width: 724px;
          height: 373px;
          background-color: #F3F5F6;
          ul{
            display: flex;
            height: 100%;
            justify-content:space-around;
            flex-wrap: wrap;
            padding: 0 30px;

            li{
            display: flex;
            width: 50%;
           
            img{
              width: 140px;
              height: 80px;
            }
            div{
              display: flex;
              flex-direction: column;
            span:nth-child(1){
              font-size: 14px;
              color:#333;
            }
             span:nth-child(2){
               font-size: 14px;
              color:#cac8c8;
            }
             span:nth-child(3){
               font-size: 12px;
              color:#3586FF;
            }
            }
          }          padding: 16px 30px ;
          }
          
        }
        }
      &>li{
        width: 160px;
        height: 37px;
        color: #ffffff;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        line-height: 37px;
      
        .icon-ArrowRight{
        float: right;
        right: 5px;
        top: 10px;
        
        transform: translateY(2px);
        }
      }
    }
    .lbt{
    width: 840px;
    height: 373px;
    img{
     width: 100%;
      height: 373px;
      object-fit:cover;
    }
 .el-carousel{
      width: inherit;
      height: 373px;
    }
    ::v-deep  .el-carousel__container{
      height: 373px;
    }
  }
  }
  .bottom{
    ul{
      display: flex;
      min-width: 780px;
      li{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 213px;
        height: 133px;
        background: #ffff;
        text-align: center;
        
        img{
          width: 64px;
          height: 64px;
        }
         div{
         margin-left: 11px;
         h4{
          font-size: 16px;
          color: #000000;
         }
         span{
          font-size: 12px;
          color:#3a3a3a;
         }
        }
      }
    }
  }
}
}
</style>