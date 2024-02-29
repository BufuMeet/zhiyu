<script setup>
import {ref} from 'vue'
import  {CaretTop,CaretBottom} from '@element-plus/icons-vue'
import {GetFirstCategorys,GetSecondCategorys,courseSearch} from '@/api/course'
import {isLevel} from '@/hook/level.js'
import router from '@/router';

const firstCategoryList=ref([])//课程页一级分类数据
let loading=ref(false)

// 获取一级分类
const firstCategorys=async()=>{
  const res=await GetFirstCategorys()
  firstCategoryList.value=res.data.list
}
firstCategorys()

// 获取二级分类
const SecondCategorysList=ref([])
const SecondCategorys=async(id=-1)=>{
 const res=await GetSecondCategorys(id)
 SecondCategorysList.value=res.data.list
}
SecondCategorys()

// 查询课程

const courseSearchList=ref([])
let pageInfo=ref({
  pageNum:1,//当前页数
  pageSize:8,//每页显示多少个
  total:0,//课程总数量
  entity:{
    firstCategory:'',
    secondCategory:'',
    courseLevel:'',
    sortBy:'',
    isMember:'',
    isFree:'',

  }
})
const getCourse=async(obj)=>{
  loading.value=true
 courseSearchList.value=[]
  const res=await courseSearch(obj)
  courseSearchList.value=res.data.pageInfo.list
  pageInfo.value.total=res.data.pageInfo.total
  loading.value=false
}
const coursesearch=()=>{
getCourse(pageInfo.value)
}
coursesearch()

// 点击页码按钮
const current=($event)=>{
  pageInfo.value.pageNum=$event
  getCourse(pageInfo.value)
}

// 点击一级标题
const oneId=ref('')
const twoId=ref('')
const threeId=ref('')
const oneTitle=(id)=>{
  oneId.value=id
  SecondCategorys(id)
  pageInfo.value.entity.firstCategory=id
  pageInfo.value.entity.secondCategory=''
  getCourse(pageInfo.value)
}
// 点击二级标题
const twoTitle=(id)=>{
  twoId.value=id
  pageInfo.value.entity.secondCategory=id
  getCourse(pageInfo.value)
}
const oneAll=()=>{
  oneId.value=''
  twoId.value=''
  threeId.value=''
  pageInfo.value.entity.firstCategory=''
  pageInfo.value.entity.secondCategory=''
  pageInfo.value.entity.courseLevel=''
  SecondCategorys()
   coursesearch()

getCourse(pageInfo.value)
}
const twoAll=()=>{
  twoId.value=''
  pageInfo.value.entity.secondCategory=''
   coursesearch()
}

// 课程难度
let levelList=ref([{
  id:1,
  name:'初阶'
},
{
  id:2,
  name:'中阶'
},
{
  id:3,
  name:'高阶'
}])
const entLevel=(id)=>{
  threeId.value=id
  pageInfo.value.entity.courseLevel=id
  getCourse(pageInfo.value)
}
const threeAll=()=>{
  threeId.value=''
  pageInfo.value.entity.courseLevel=''
  getCourse(pageInfo.value)
}

// 课程条件筛选的数据
let courseFilter=ref([
  {id:1,name:'综合'},
  {id:2,name:'最新课程'},
  {id:3, name:'最多购买'},
  {id:4,name:'价格',status:''},
])

let currentId=ref(1)
// 点击筛选条件
const evtFilter=(id,status)=>{
currentId=id
 if(id===1){
   pageInfo.value.entity.sortBy=''
 }else if(id===2){
   pageInfo.value.entity.sortBy='time-desc'
 }else if(id===3){
   pageInfo.value.entity.sortBy='clicks-desc'
 }else if(id===4){
  if(status==='price-desc'||status===''){
     status='price-asc'
  }else {
    status='price-desc'
  }
  courseFilter.value[3].status=status
  pageInfo.value.entity.sortBy=status
  console.log(courseFilter.value[3].status);
 }
 getCourse(pageInfo.value)
}

//单选按钮
const radio = ref(0)
const tabcourse=(value)=>{
  if(value===0){
    pageInfo.value.pageNum=1
    pageInfo.value.entity.isMember=''
    pageInfo.value.entity.isFree=''
  }
  else if(value===1){
    pageInfo.value.pageNum=1
    pageInfo.value.entity.isMember=''
    pageInfo.value.entity.isFree=1
  } else if(value===2){
    pageInfo.value.pageNum=1
    console.log(pageInfo.value.pageNum);
    pageInfo.value.entity.isMember=1
    pageInfo.value.entity.isFree=''
  }
  getCourse(pageInfo.value)
}

// 跳转detail页面
const goDetail=(id)=>{
  router.push({
   path:'/course/detail',
      query:{id}

  })
}

</script>

<template>
  <div class="container">
    <div class="header">
     <div class="item">
      <span class="title">课程方向：</span>
      <ul>
        <li :class="oneId?'':'all'" @click="oneAll">全部</li>
        <li :class="item.id===oneId?'all':''" v-for="item in firstCategoryList" :key="item.id" @click="oneTitle(item.id)">{{item.categoryName}}</li>
      </ul>
     </div>
     <div class="item">
      <span class="title">课程分类：</span>
      <ul>
        <li :class="twoId?'':'all'" @click="twoAll">全部</li>
        <li :class="item.id===twoId?'all':''" v-for="item in SecondCategorysList" :key="item.id" @click="twoTitle(item.id)">{{item.categoryName}}</li>
      </ul>
     </div>
     <div class="item">
      <span class="title">课程难度：</span>
      <ul>
        <li :class="threeId?'':'all'" @click="threeAll">全部</li>
        <li :class="item.id===threeId?'all':''" v-for="item in levelList" :key="item.id" @click="entLevel(item.id)">{{ item.name }}</li>
      </ul>
     </div>
    </div>
    <div class="course-list">
      <div class="list-main">
        <div class="top">
          <ul>
            <li :class="item.id!==4 ?'line':''" v-for="item in courseFilter" :key="item.id" class="list-price">
              <span :class="item.id===currentId?'active':''" @click="evtFilter(item.id,courseFilter[3].status)">{{item.name}}</span>
              <div v-if="item.id===4">
                <el-icon :size="8" :color="item.status==='price-desc'?'#2C81FF':''"><CaretTop /></el-icon>
                <el-icon :size="8" :color="item.status==='price-asc'?'#2C81FF':''"><CaretBottom /></el-icon>
              </div>
            </li>
          </ul>
          <div>
            <el-radio-group v-model="radio" @change="tabcourse">
              <el-radio :label="0">全部课程</el-radio>
              <el-radio :label="1">免费课程</el-radio>
              <el-radio :label="2">会员免费课程</el-radio>
            </el-radio-group>
          </div>
        </div>
       <div class="center"> 
        <ul v-loading="loading">
          <li v-for="item in courseSearchList" :key="item.id" @click="goDetail(item.id)">
          <img :src="item.courseCover" alt="">
          <div class="content">
            <h3>{{item.courseName}}</h3>
            <span> {{isLevel(item.courseLevel)}}·{{item.clicks}}人报名</span>
            <div class="price">
              <div>会员专享</div>
              <span>￥{{ item.discountPrice }}</span>
            </div>
          </div>
        </li>
        </ul>
       </div>
        <div class="bottom">
           <el-pagination :current-page="pageInfo.pageNum" @update:current-page="currentChange" background layout="prev, pager, next" :total="pageInfo.total" @current-change="current"/>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
  .container {
    width: 100%;
    background-color: #F3F5F9;
    opacity: 1;
    border-radius: 0px;
    .header{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 1000px;
      height: 197px;

      margin: 0 auto;
      .item{
        display: flex;
        align-items: center;
        margin-left: 20px;
        flex: 1;
        flex-grow: 1;
        .title{
          flex-wrap: wrap;
          font-size: 14px;
          font-weight: bold;
          color: #333333;
          text-wrap: nowrap;
        }
        ul{
          flex-wrap: wrap;
            display: flex;
            align-items: center;
            text-wrap: wrap;
            li{
              text-wrap: nowrap;
              cursor: pointer;
              margin-right: 30px;
              font-size:14px;
              font-weight: 400;
              color:#515759
              
              
            }
            .all{
              color: #388fff;
              line-height: 30px;
              text-align: center;
              text-decoration: none;
              font-size: 14px;
              background: rgba(44, 128, 255, .1);
              border-radius: 5px;
            }
          }
      }
    }
    .course-list{
      padding: 50px 0;
      background-color: #fff;
      .list-main{
        width: 1000px;
        margin: 0 auto;
        .top{
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          ul{
            display: flex;
            align-items: center;
            text-align: center;
            li{
             
              margin-right: 16px;
              font-size: 14px;
              font-weight: 400;
              color:#515759;
              span{
                 cursor: pointer;
              }
              .active{
                color:#2C81FF
              }
            }
            .line::after{
             content: '|';
             margin-left: 10px;
            }
            .list-price{
              display: flex;
              div{
                display: flex;
                flex-direction: column;
               margin-top: 3px;
              }
            }
          }
        }
        .center{
        ul{
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      margin-top: 38px;
        li{
          cursor: pointer;
          flex: 1;
          flex-grow: 0;
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
        .bottom{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 50px;
        }
      }
    }
  }
</style>