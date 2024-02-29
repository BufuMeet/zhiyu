import request from '@/utils/request'


export const getShopCart=()=>{
  return request.get('/api/shopcar/getShopCarList')
}

// 删除商品
export const deleterShopCarService=(args,token)=>{
  return request.get('/api/shopcar/deleteShopCar',{
    params:{
      ...args
    },
    headers:{
      token
    }
  })
}

// 加入购物车

// export const addShopCar=(data,token)=>{
//   return request({
//     url:'/api/shopcar/addShopCar',
//     method:'post',
//     data,
//     headers:{
//       token
//     }
//   })
// }
export const addShopCar=(data,token)=>{
  return request.post('/api/shopcar/addShopCar',data,{headers:{token}})
}