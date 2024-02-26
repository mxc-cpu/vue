import axios from './apiConfig';

export const GetAnn=async ()=>{
    return await axios.get('/Announcement/GetAnn/')
}