import axios from 'axios'
import { getToken } from '../auth/login'
axios.defaults.baseURL="http://localhost:5173/api"
axios.defaults.headers['X-Requested-with']="XMLHttpRequest"
axios.defaults.headers.post["Content-Type"] = "application/json";
//拦截器
//请求拦截
axios.interceptors.request.use(options=>{
//为请求添加授权token
const jwtToken=getToken()
if(jwtToken){
  options.headers.Authorization= `Bearer ${jwtToken}`;
 
}
return options
})
//响应拦截
axios.interceptors.response.use(res=>{

return res
},error=>{
alert(error.response.data.message)
return error
})
export default axios;