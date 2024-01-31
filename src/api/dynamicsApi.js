import axios from '../api/apiConfig';
export const Addfouces=(info)=>{
   
    return  axios.post('/Dynamics/FocusUser/',info)
}
export const Delfouces=(info)=>{
    return  axios.post('/Dynamics/DelFocusUser/',info)
}
export const QueryFocusUser=(info)=>{
    return  axios.post('/Dynamics/QueryFocusUser/',info)
}
export const   FindFocusList= async (Id)=>{
    return await  axios.get('/Dynamics/FindFocusList/'+Id)
}
export const FindFansList=async (Id)=>{
    return  await axios.get('/Dynamics/FindFansList/'+Id)
}
export const PageFocus=(info)=>{
    return  axios.post('/Dynamics/PageQueryFocusList/',info)
}
export const PageFan=(info)=>{
    return  axios.post('/Dynamics/PageQueryFanList/',info)
}