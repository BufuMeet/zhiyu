import request from '@/utils/request.js'

// 结算订单
export const settlement=(data)=>{
  return request.post('/api/order/settlement',data)
}

//支付宝结算
export const alipayOrder=(data)=>{
  return request.post('/api/pay/alipay/createOrder',data)
}

// 查询支付宝的订单状态
export const queryAlipay=(pramas)=>{
  return request.get('/api/pay/alipay/queryOrder',{
    params:{
      ...pramas,
    }
  })
}


//vx结算
export const wxpayOrder=(data)=>{
  return request.post('/api/pay/wxpay/createOrder',data)
}
// 查询wx的订单状态
export const queryWxpay=(pramas)=>{
  return request.get('/api/pay/alipay/queryOrder',{
    params:{
      ...pramas,
    }
  })
}

// 支付成功删除购物车数据
export const deleteShopCars=(ids,token)=>{
  console.log(ids,token);
 return request({
  url:'/api/shopcar/deleteShopCars',
  method:'POST',
  data:ids,
  headers:{
    token
  }
 })
}