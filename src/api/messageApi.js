import axios from '../api/apiConfig';
export const  AddMessage=async(info)=>{
    return await axios.post('/Message/AddMessage',info)
}
export const  DelMessage=async(id)=>{
    return await axios.get('/Message/DelMessage/'+id)
}
export const  pageQueryMessageByMyself=async(info,typeName)=>{
    return await axios.post('/Message/pageQueryMessageByMyself/'+typeName,info)
}