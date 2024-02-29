import request from "@/utils/request"

export const createToken=()=>{
  return request.get('/api/token/createToken')
}