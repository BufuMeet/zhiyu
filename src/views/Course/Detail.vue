<script setup>
import {ref,reactive} from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import {Download} from '@element-plus/icons-vue'
import {useRoute} from 'vue-router'
import {getDetail,getCheckAuthService,downLoadAttchment} from '@/api/course'
import {addShopCar} from '@/api/cart'
import {useUserStore} from '@/stores/index'
import router from '@/router'
import {createToken} from '@/api/createToken'
import { ElMessage } from 'element-plus'

const userStore=useUserStore()
let route=useRoute()
let loading=ref(false)
const description=ref('')
// 章节与下载笔记代码的切换
let isActive=ref(1)
const detailList=ref({})
// course页面跳转传过来的id
const id=route.query.id
const getdetail=async()=>{
  detailList.value={}
  loading.value=true
  const res=await getDetail(id)
  detailList.value=res.data.data
  description.value=detailList.value.bizCourseDetail.description
  loading.value=false
}
getdetail()

// 下载资料
const downLoadSource=async(item)=>{
  if(!userStore.token){
    ElMessage.info('请先登录')
    return
  }
  const res=await getCheckAuthService(item.courseId)
  if(!res.data.data.hasAuth){//判断有权限购买
    ElMessage.info('请您先购买该课程')
    return
  }
  // 进行到下载过程
  const data=await downLoadAttchment({
    courseId:item.courseId,
    attachmentId:item.id})
  const blob=new Blob([data])
  
  let fileName=item.attachmentName
  let fileUrl=item.attachmentUrl
  const extName=fileUrl.substring(
    fileUrl.lastIndexOf('.')
  )
  fileName=fileName+extName
  const link=document.createElement('a')
  link.download=fileName
  link.target="_blank"
  link.style.display='none'
  link.href=URL.createObjectURL(blob)//将blob等相关文件流转换为一个下载路径
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(link.href)
  document.body.removeChild(link)

}

// 点击开始学习
const goPlay=async(item,chapterId)=>{
  if(!userStore.token){
    ElMessage.info('请先登录')
    return
  }
  const res=await getCheckAuthService(item.courseId)
  if(!res.data.data.hasAuth){//判断有权限购买
    ElMessage.info('请您先购买该课程')
    return
  }
  // 进行到开始学习页面
  router.push({
    path:'/coursePlay/'+item.courseId+'/'+chapterId
  })

}

// 加入购物车
const addCart=async()=>{
// createToken().then((res)=>{
//   let token=res.data.token
//   addShopCar({
//     courseId:id,
//     memberId:userStore.userInfo.id
//   },token).then((res)=>{
//     console.log(res);
//   })
// })

const {data}=await createToken()
const res=await addShopCar({
    courseId:id,
    memberId:userStore.userInfo.id
  },data.token)

   if(res.meta.code==='200'){
  ElMessage.success('加入成功')
 }else {
  ElMessage.error(res.meta.msg)
 }
  


}
</script>

<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="title">
      <div class="main">
        <div class="map">
          <!-- 面包屑 -->
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item>课程</el-breadcrumb-item>
            <el-breadcrumb-item>免费课</el-breadcrumb-item>
            <el-breadcrumb-item>{{ detailList.courseName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="name">{{ detailList.courseName }}</div>
        <div class="content">难度 入门</div>
      </div>
    </div>

    <!-- 章节 -->
    <div class="chapter" v-loading="loading">
      <div class="tab-name">
        <ul>
          <li :class="isActive===1?'active':''" @click="isActive=1">章节</li>
          <li :class="isActive===2?'active':''" @click="isActive=2" >下载笔记代码</li>
        </ul>
      </div>
      <div v-if="isActive===1" class="tab-chapter">
        <div class="tab-txt">
         <div class="txt-content">{{ description!=''?description:'暂无详情~~~' }}</div>
         <div class="txt-btn">
          <span class="payment">立即购买</span>
          <span class="add-cart" @click="addCart">加入购物车</span>
         </div>
        </div>
        <div class="detail-list">
          <div class="item" v-for="item in detailList.bizCourseChapters" :key="item.id">
            <div class="item-title">
              <div>{{ item.chapterName }}</div>
              <div>{{ item.description }}</div>
            </div>
            <ul>
            <li v-for="k in item.children" :key="k.id" >
              <div>
                <img src="@/imgs/detail-video.png" alt="">
                <span>视频:{{ k.chapterName }}</span>
              </div>
              <div @click="goPlay(item,k.id)">开始学习</div>
              </li>
          </ul>
          </div>
        </div>
      </div>
      <div v-else class="tab-main">
        <ul>
          <li v-for="item in detailList.bizCourseAttachments" :key="item.id">
            <div><el-icon size="20" color="#007bff"><Download /></el-icon>{{ item.attachmentName}}</div>
            <button @click="downLoadSource(item)">下载资料</button>
            
          </li>
        </ul>
         <el-empty v-if="detailList.bizCourseAttachments!=''?false:true"  description="暂无数据" />
      </div>
      
    </div>
  </div>
</template>

<style scoped lang="less">
  .container{
    .title{
      width: 100%;
      height: 183px;
      background: url('@/imgs/detail-bg.png') no-repeat;
      background-size: 100% 100% ;
       margin: 0 auto;

      .main{
        width: 1000px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
       margin: 0 auto;
        height: 100%;
        padding-left: 25px;
      }
     .map{
     :deep(.el-breadcrumb__separator.el-icon){
      color: #fff;
     }
     :deep(.el-breadcrumb__inner){
        color: #fff;
     }
     :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover){
       color: #fff;
       font-weight: 600;
       
     }
      }
      .name{
        font-size: 27px;
        font-weight: 600;
        color: #fff;
      }
      .content{
        font-size: 12px;
        font-weight: 600;
        color: #fff;
      }
    }

    // 章节
    .chapter{
      width: 100%;
      margin: 0 auto;
      .tab-name{
        height: 57px;
        width: 100%;
        border-color: #fff;
        box-shadow: 0px 2px 4px rgba(0,0,0,.2);
        ul{
          display: flex;
          align-items: center;
         max-width: 1000px;
          height: 57px;
          margin: 0 auto;
          font-size: 16px;
          li{
            cursor: pointer;
            margin-left: 67px;
            position: relative;
          }
          .active{
            color: #388FFF;
            font-weight: bold;
          }
          .active:after{
            content: '';
            position: absolute;
            bottom: -7px;
            left: 25%;
            width: 50%;
            height: 3px;
            background-color: #388FFF;
            border-radius: 1px;
           
          }
        }
      }
      .tab-chapter{
        padding-top: 1px;
        width: 100%;
        height: 100%;
        background-color: #F8FAFC;
        .tab-txt{
          position: relative;
          margin: 29px auto;
          max-width: 1000px;
          height: 147px;
          background-color: #FFF;
          box-shadow: 0px 2px 4px rgba(0,0,0,.2);
          border-radius: 5px;
          .txt-content{
            padding: 5px;
            height: 100px;
            word-break: break-all;//单词内的断句
          overflow: hidden;//溢出隐藏
          text-overflow: ellipsis;//省略号
          display: -webkit-box;//将对象作为弹性伸缩盒子模型显示
          -webkit-box-orient: vertical;//设置弹性盒子的子元素的排列方式
          -webkit-line-clamp: 6;//设置显示文本的行数

         
          } 
          .txt-btn{
            position: absolute;
            bottom: 3px;
            right: 20px;
            .payment{
              cursor: pointer;
              display: inline-block;
              width: 80px;
              height:20px;
              color: #fff;
              background-color: #F11D1D;
              border-radius: 15px;
              text-align: center;
              line-height: 20px;
              font-size: 10px;
            }
            .add-cart{
            cursor: pointer;
              display: inline-block;
              width: 80px;
              height:20px;
              color: #F11D1D;
              background-color: #FDE7E7;
              border-radius: 10px;
              text-align: center;
              line-height: 20px;
              font-size: 10px;
              margin-left: 5px;
              margin-right: -10px;
            }
          }
        }
        .detail-list{
          margin-top: 10px;
          .item{
            padding: 5px;
            margin: 3px auto;
           max-width: 1000px;
            background-color: #fff;
            box-shadow: 0px 2px 4px rgba(0,0,0,.2);
            .item-title{
              padding:16px 27px;
              &>div:nth-child(1){
                font-size: 16px;
                font-weight: bold;
                color: #333;
              }
                &>div:nth-child(2){
                  margin-top: 10px;
                font-size: 12px;
                font-weight: 400;
                color: #5C5C5C;
              }
            }
            ul{
              display: flex;
              flex-direction: column;
              li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 27px;
                text-align: center;
                div{
                  display: flex;
                  align-items: center;
                  
                  img{
                    margin-right: 7px;
                  }
                  span{
                    font-size: 14px;
                    font-weight: 400;
                    color: #333;
                  }
                  
                }
                &>div:last-child{
                  display: flex;
                  justify-content: center;
                  width: 100px;
                  height: 30px;
                  color: #fff;
                  background-color: #388FFF;
                  border-radius:20px;
                  cursor: pointer;
                  font-size: 14px;
                  text-align: center;
                  line-height: 30px;
                }
              }
            }
          }
        }
      }
      .tab-main{
        max-width: 1000px;
        margin: 0 auto;
        ul{
          display: flex;
          flex-direction: column;
          li{
            
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            padding: 7px;
            line-height: 30px;
            background: #fff;
            border-radius: 3px;
            margin: 10px 0;
            box-shadow: 0px 3px 6px rgba(0,0,0,.1);
            div{
              display: flex;
              align-items: center;
            }
            button{
              cursor: pointer;
              width: 100px;
              height: 28px;
              border: none;
              border-radius: 20px;
              font-size: 14px;
              text-align: center;
              color: #fff;
              background-color: #007bff;
            }
          }
        }
      }
    }
   
  }
</style>