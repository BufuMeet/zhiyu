
const isLevel=(data)=>{
let val=''
  switch(data){
    case 1:
      val="初级"
      break
    case 2:
      val="中级"
      break
    case 3:
      val="高级"
      break
    default:
      val=''
  }
  return val
}


export{
isLevel
}