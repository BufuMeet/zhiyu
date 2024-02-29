import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore=defineStore(
  'user',
  ()=>{
  let token = ref(null)
  let userInfo=ref({})
  const setToken=(newToken)=>{
  token.value=newToken
 }
   const setUserInfo=(newUserInfo)=>{
  userInfo.value=newUserInfo
 }

    return{
      token,
      setToken,
      userInfo
    }
  },{
    namespaced:true,
    persist:{
      enable:true,
    }
  }
)