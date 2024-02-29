<script setup>
import {ref} from "vue"
import { GetCourseService } from "@/api/course.js";
import {isLevel} from '@/hook/level.js'
import router from "@/router";


// 新上好课的数据
const courseList=ref([])
const getCourse= async()=>{
  const res=await GetCourseService({
    pageNum:1,
    pageSize:8
  })
  courseList.value=res.data.pageInfo.list
}
  getCourse()
  const goDetail=(id)=>{
  router.push({
   path:'/course/detail',
      query:{id}

  })
}
</script>

<template >
<div class="new-course">
  <div class="container">
    <div class="top">
      <div class="title">
        <div class="hot">HOT</div>       
      </div>
      <sapn class="txt">
       新上好课
      </sapn>
    </div>
    <div class="bottom">
      <ul >
        <li v-for="item in courseList" :key="item.id" @click="goDetail(item.id)">
          <img :src="item.courseCover" alt="">
          <div class="content">
            <h3>{{ item.courseName }}</h3>
            <span>{{ isLevel(item.courseLevel) }} ·{{item.clicks}}人报名</span>
            <div class="price">
              <div>会员专享</div>
              <span>￥{{ item.discountPrice }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>

</template>

<style scoped>
.new-course{
 padding-top: 38px;
 background: #F3F5F9;
 overflow: hidden;
  .container{
    max-width: 1000px;
    margin: 0 auto;
    .top{
      display: flex;
      align-items: center;
      .hot{
        position: relative;
        width: 65px;
        height: 25px;
        background: linear-gradient(90deg,#FF727F 0%,#FC685C 100%);
        opacity: 1;
        border-radius: 5px 0px 5px 5px;
        text-align: center;
        line-height: 25px;
        color: #fff;
        &::after{
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          top: 0;
          right: 0;
          transform: translateX(5px);
         border:3px solid #FC685C;
         border-bottom-color: transparent ;
         border-right-color: transparent;
        }
      }
      .txt{
        position: relative;
        margin-left: 5px;
        font-size: 23px;
        line-height: 35px;
        color: #333;
        z-index: 99;
        &::after{
          content: '';
          position: absolute;
          bottom: 3px;
          left: 2px;
          width: 110px;
          height: 9px;
          background: linear-gradient(90deg,#FBF84F 0%,#FEA935 100%);
          border-radius: 5px;
          z-index: -1;
        }
      }
    }
    .bottom{
      ul{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-top: 38px;
        li{
          cursor: pointer;
          flex: 1;
          margin: 5px;
          width: 250px;
          height: 275px;
          background-color: #fff;
          box-shadow: 1px 3px 3px rgba(27,39,94,0.1);
          border-radius: 5px;
          &:hover{
            transform: translateY(-10px);
            transition: 0.5s;
          }
          img{
            width: 230px;
            height: 153px;
            margin-top: 5px;
            margin-left: 5px;
          }
          .content{
            margin-left: 10px;
            height: 122px;
            h3{
              font-size: 12px;
              font-weight: 700;
              color:#333333;
            }
            &>span{
              display: block;
              font-size: 12px;
              color:#808080;
              padding: 10px 0;
              
            }
            .price{
               display: flex;
              div{
                width: 64px;
                height: 16px;
               
                background: linear-gradient(90deg,#FF928E 0%,#FE7062 99%);
                border-radius: 16px 0px 16px 0px;
                text-align: center;
                color: #fff;
                
              }
              span{
                font-size: 12px;
                color: #FF727F;
              }
            }
          }
        }
      }
    }
  }
}
</style>