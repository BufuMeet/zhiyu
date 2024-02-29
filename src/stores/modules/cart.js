import {defineStore} from 'pinia'
import {ref,watch,watchEffect} from 'vue'

export const useCartStore=defineStore(
  'cart',
  ()=>{
    let checkAll=ref(true)
    let cartList=ref([])
    const setCartList=(list)=>{
       cartList.value=list.map(item=>{
        return {
          ...item,
          check:true
        }
       })
  
    }
    // 判断是否全选
 const isCheckAll=()=>{
  let isc=cartList.value.map(item=>item.check)
  let ischeck=isc.includes(false)
  checkAll.value=!ischeck
  return !ischeck
 }

 const total=()=>{
  let total={
    price:0,
    number:0,
  }
    cartList.value.forEach(item=>{
      if(item.check){
        total.price+=item.counter*item.discountPrice
        total.number+=item.counter
      }
     
    }) 
    return total
 }

 const order=()=>{
 const orderList=[]
  cartList.value.forEach(item=>{
    if(item.check){
      orderList.push({
        number:1,
        id:item.courseId,
      })
    }
  })
  return orderList
 }
// 选中的id 用于删除支付成功购物车的数据
const selectPayArr=ref([])
const selectArr=()=>{
  selectPayArr.value=[]
  cartList.value.forEach(item=>{
    if(item.check){
      selectPayArr.value.push(item.courseId)
    }
  })
  return selectPayArr.value
}
    
    
    return {
      cartList,
      setCartList,
      checkAll,
      isCheckAll,
      total,
      order,
      selectArr,
    }
  },{
    persist: true,
  }
)