import axios from '../api/apiConfig';

 


export const registerUser=async(Register)=>{
   
    return await axios.post('UserRegister/register',Register)
}

