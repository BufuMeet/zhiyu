import request from "@/utils/request"

export const GetSliderServices=()=>{
 return request.get('/api/slider/getSliders')
}