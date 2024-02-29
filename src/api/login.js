import request from '@/utils/request.js'

// 登录
export const loginService = (data)=>{
  return request.post('/api/u/loginByJson',data)
}

// 发送验证码
export const sendCaptchaService =(phone)=>{
  return request.get('/api/sms/sendRegisterOrLoginCaptcha',{
   params:{
    mobile:phone
   }
  })
}

// 短信登录
export const loginByMobileService=(data)=>{
  return request({
    url:'/api/u/loginByMobile',
    method:'post',
    data
  })
}

// 获取个人信息
export const getInfoService =(id)=>{
 return request.get('/api/member/getInfo',{
  params:{
    token:id
  }
 })
}

// 退出登录
export const logoutService=()=>{
  return request.get('/api/u/logout')
}