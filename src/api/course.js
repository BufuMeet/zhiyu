import request from "@/utils/request"
export const GetCourseService =(data)=>{
  return request.post('/api/course/mostNew',data)
}
// 获取一级分类
export const GetFirstCategorys=()=>{
  return request.get('/api/course/category/getFirstCategorys')
}

// 获取二级分类
export const GetSecondCategorys=(id)=>{
  return request.get('/api/course/category/getSecondCategorys',{
    params:{
      categoryId:id
    }
  })
}

// 获取课程
export const courseSearch=(data)=>{
  return request.post('/api/course/search',{
    ...data
  })
}

// 课程详情的接口
export const getDetail=(id)=>{
  return request.get('/api/course/getDetail',{
    params:{
      courseId:id
    }
  })
}

// 检查是否有权限下载资料、
export const getCheckAuthService=(id)=>{
  return request.get('/api/course/checkAuth',{
    params:{
      courseId:id
    }
  })
}

// 资料下载
export const downLoadAttchment=(id)=>{
  return request.get('/api/course/downloadAttachment',{
    params:{
      ...id
    },
    responseType:'blob'
  })
}

// 课程播放页接口
export const playerService=(id)=>{
  return request.get('/api/player/play',{
    params:{
      ...id
    }
  })
}

// 记录用户播放到什么位置
export const recordHistory =(data)=>{
  return request.post('/api/course/history/recordHistory',data)
}

// z最后一次记录
export const getLastHistoryByChapterId=(id)=>{
 return request.get('/api/course/history/getLastHistoryByChapterId',{
  params:{
    ...id
  }
 })
}