import axios from './apiConfig';
export const GetUserName=async(Id)=>{
   
    return await axios.get('/Users/GetUserName/'+Id)
}

export const GetUserAvatar=async(Id)=>{
    return await axios.get('/Users/GetUserAvatar/'+Id)
}