import axios from './apiConfig';
export const GetHeadlineList=async()=>{
   
    return await axios.get('/Headline/GetHeadlineList/')
}