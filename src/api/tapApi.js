import axios from './apiConfig';
export const AddTap=async(info)=>{
   
    return await axios.post('/Tap/AddTap/',info)
}
export const DelTap=async(info)=>{
   
    return await axios.post('/Tap/DelTap',info)
}
export const GetTap=async(Id)=>{
    return await axios.get('/Tap/FindAll/'+Id)
}