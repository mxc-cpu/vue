import axios from '../api/apiConfig';
export const CategoryGetList=async()=>{
   
    return await axios.get('/Category/GetCategoryNameList')
}
export const ArticlePageByCategory=async(pageInfo)=>{
   
    return await axios.post('/Category/pageQueryByList',pageInfo)
}

export const ByCategoryName=async(id)=>{
   
    return await axios.get('/Category/GetCategoryNameById/'+id)
}