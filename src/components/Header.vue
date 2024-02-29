<script setup>
import {ref} from 'vue'
import { Search,ShoppingCart} from '@element-plus/icons-vue'
import {createToken} from '@/api/createToken'
import {getInfoService,logoutService} from '@/api/login'
import {useUserStore} from '@/stores/index'
import router from '@/router'

const userStore= useUserStore()
let endTimeVip=ref('')
const vipInfo=ref({})


//创建临时token
const userLoading=ref(false)
const temporarilToken=ref('')
const temporarilyToken=async()=>{
  const res=await createToken()
  temporarilToken.value=res.data.token
  const data=await getInfoService(temporarilToken.value)
  if(data.meta.code==='200'){
    userLoading.value=true
    userStore.userInfo=data.data.data
		// 用户vip情况
		vipInfo.value=userStore.userInfo.vipInfo
		let now=new Date().getTime()
		let endTime=vipInfo.value.endTime-now
		endTimeVip.value=Math.floor(endTime/1000/60/60/24)
  }
}
temporarilyToken()
const isShow=ref(false)

// 退出登录
const outLogin=async()=>{
	await ElMessageBox.confirm(
    '你确定要退出嘛？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
	const res=await logoutService()
	if(res.meta.code==='200'){
	userStore.token=''
	userStore.userInfo={}
	router.go(0)
	ElMessage.success('退出成功')
	}

}

</script>

<template>
  <header>
    <div class="container">
     <div class="left">
      <h1 class="logo">
        <img src="@/imgs/logo.png" alt="">
      </h1>
      <ul>
      <router-link to="/home" ><li>首 页</li></router-link>
      <router-link to="/course"> <li>课 程</li></router-link>
        <li>会 员</li>
      </ul>
     </div>
     <div class="right">
      <div class="search">
        <input placeholder="请搜索"  type="text" name="" id="" >
      <el-icon  :size="20"  class="icon-search"><Search /></el-icon>
      </div>
      <router-link to="/cart"><el-icon :size="20" class="icon-shoppingCart"><ShoppingCart /></el-icon></router-link>
     </div>
     <div>
      <el-avatar v-if="userLoading"  @mouseenter="isShow=true"
        :src="userStore.userInfo.avatar===''?'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png':userStore.userInfo.avatar"
      />
    </div>
     <div v-if="!userLoading" class="login">
      <router-link to="/login">登录</router-link>
      /
      <router-link to="/register">注册</router-link>
     </div>
         <!-- 划过头像显示  -->
				<div class="user-info" v-show="isShow" @mouseleave="isShow=false">
				  <div class="user-info-top">
				    <div class="u-i-t-top">
				      <img
				        class="avator"
				        :src="userStore.userInfo.avatar"
				        alt=""
				        v-if="userStore.userInfo.avatar"
				      />
				      <img class="avator" src='@/imgs/Avat62.png' v-else />
				      <div class="avator-info">
				        <p>{{userStore.userInfo.nickName}}</p>
				      </div>
				      <div class="vip" v-if="vipInfo">
				        <div class="vipImg">
				          <img :src="vipInfo.vipIcon" :class="endTimeVip < 0 ? 'gray':''">
				        </div>
				        <div class="vipName">{{vipInfo.vipName}}</div>
				        <div class="endTime" v-if="vipInfo.isExpired === 0 ">{{endTimeVip}}天到期</div>
				        <div class="endTime" v-else>已过期{{Math.abs(endTimeVip)}}天</div>
				      </div>
							
				    </div>
				    <div class="u-i-i-bottom">
				      <div>
				        <router-link to="/">
				          <div class="info-item">
				            <img src="@/imgs/course.png"/>
				            <p>我的课程</p>
				          </div>
				        </router-link>
				      </div>
				      <div>
				        <router-link to="/">
				          <div class="info-item">
				            <img src="@/imgs/order.png" />
				            <p>订单中心</p>
				          </div>
				        </router-link>
				      </div>
				      <div>
				        <router-link to="/">
				          <div class="info-item">
				            <img src="@/imgs/mess.png"/>
				            <p>我的消息</p>
				          </div>
				        </router-link>
				      </div>
				      <div>
				        <router-link to="/">
				          <div class="info-item">
				            <img src="@/imgs/setting.png"/>
				            <p>个人设置</p>
				          </div>
				        </router-link>
				      </div>
				    </div>
				  </div>
				  <div class="user-info-bottom">
				    <div class="logout" @click="outLogin">退出登录</div>
				  </div>
				</div>
				 
    </div>

  </header>
</template>

<style scoped lang="less">
header{
  width: 100%;
  height: 80px;    
  z-index: 99;
  margin-bottom: 2px;
  box-shadow: 0px 4px 4px rgba(193,193,193,.4);

  .container{
    width: 1000px;
    height: 80px;
    margin:0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left{
      display: flex;
      justify-content: space-between;
      align-items: center;
     .logo{
      width: 127px;
      height: 50px;
      margin-right: 51px;
       img{
        width: 100%;
        height: 100%;
      }
     }
      ul{
        display: flex;
        line-height: 50px;
        li{
         margin-right: 79px;
         font-weight:500;
         font-size: 16px;
         color:#808080;
         cursor: pointer;
        }
        :deep(.router-link-active.router-link-exact-active){
          position: relative;
          text-decoration: none;
          &::after{
            content: '';
            position: absolute;
            bottom: 0;
            left: -2px;
            width: 50px;
            height: 2px;
            background-color: #3585FF;
            margin-left: -3px;
          }     
          li{
            color: #3585FF;
            font-weight: 600;
          }
        }
      }
    }
    .right{
      display: flex;
      align-items: center;
      .search{
        display: flex;
        width: 320px;
        height: 43px;
        background: #F0F2F4;
        border-radius: 5px;
        align-items: center;
        input{
         height: inherit;
         width: 290px;
         border-radius: 5px;
        background: #F0F2F4;
        padding: 0 10px;
        } 
      }
      .icon-shoppingCart{
        display: flex;
        align-items: center;
        margin-left: 42px;
        cursor: pointer;
      }
    }
  }
  .login{
    cursor: pointer;
  }
}

.header-content{
	position: relative;
	display: flex;
	justify-content: space-around;
	width:1200px;
}
.content-logo{
	width:160px;
	height: 55px;
	margin:10px 0;
	cursor: pointer;
}
.content-logo img{
	height: 100%;
}
.content-nav{
	width: 300px;
	height: 75px;
}
.content-nav ul{
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 75px;
}
.content-nav ul li{
	font-size:18px;
	color:#808080;
	cursor: pointer;
}
.content-nav ul li a{
	font-size:18px;
	color:#808080;
	cursor: pointer;
	text-decoration: none;
}
.search-buy-login{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 650px;
}
.content-search{
	display: flex;
	align-items: center;
	padding:5px 10px;
	width: 350px;
	height: 35px;
	background: #F0F2F4;
	border-radius: 8px;
}
.content-search input{
	padding:0 10px;
	width:430px;
	height: 40px;
	border:0;
	border-radius: 8px;
	background: #F0F2F4;
	color:#808080;
	font-size:16px;
	outline: none;
}
.content-login a{
	font-size: 18px;
	color:#808080;
	text-align: center;
	cursor: pointer;
	text-decoration: none;
}
.content-login-success {
	height: 53px;
	color: #808080;
	text-align: center;
	width: 180px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 18px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #707070;
}
.avator {
	height: 53px;
	width: 53px;
	cursor: pointer;
	border-radius: 50%;
}
.user-info {
	width: 200px;
	height: 194px;
	background-color: #fff;
	border: 1px solid rgba(248, 250, 252, 1);
	box-shadow: 0px 5px 15px 3px #888888;
	position: absolute;
	top: 75px;
	right: 160px;
	z-index: 999;
	display: block;
	border-radius: 10px;
}
.user-info-top {
	display: flex;
	width: 100%;
	height: 160px;
	border-bottom: 1px solid rgba(248, 250, 252, 1);
	flex-direction: column;
}
.u-i-t-top {
	display: flex;
	height: 80px;
	width: 100%;
	align-items: center;
}
.u-i-t-top img {
	width: 40px;
	height: 40px;
	margin: 0 10px;
	cursor: pointer;
}
.avator-info {
	width: 120px;
	height: 60px;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	display: flex;
	flex-direction: column;
	/*align-items: center;*/
}
/*有会员了之后高度微调*/
.avator-info p {
	height: 40px;
	line-height: 40px;
	cursor: pointer;
}
.u-i-i-bottom {
	display: flex;
	height: 100px;
	width: 200px;
	margin-top: 10px;
	flex-wrap: wrap;
	justify-content: space-around;
}
.u-i-i-bottom a{
	text-decoration: none;
}
.info-item {
	width: 90px;
	line-height: 30px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	border-radius: 3px;
	cursor: pointer;
  vertical-align: middle;
	background-color: rgba(0, 0, 0, 0.1) !important;
}
.info-item img {
	width: 14px;
	height: 16px;
}
.user-info-bottom {
	position: relative;
	width: 100%;
	height: 30px;
}
.logout {
	line-height: 30px;
	position: absolute;
	top: 0;
	right: 10px;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #93999f;
	cursor: pointer;
}
/*vip开始*/
.vip{
  display: flex;
  flex-direction: row;
  /*flex-wrap: wrap;*/
  width: 100%;
  height: 30px;
  margin-left: -105px;
  margin-top: 18px;
  font-size: 12px;
  line-height:30px;
}
.vipImg{
  width: 15px;
  height: 15px;
  margin-right: 12px;
}
.vipImg img{
  width: 100% !important;
  height: 100% !important;
	margin-top: 7px;
}
.vipName{
  color: #93999F;
}
.endTime{
  padding-left: 2px;
  color:#FF0000 ;
  position: absolute;
  top: 45px;
  left: 73px;
  font-size: 12px;
}
</style>