import { info } from 'sass';
import axios from '../api/apiConfig';
export const ArticlePage=async(pageInfo)=>{
   
    return await axios.post('/Article/PageQuery',pageInfo)
}
export const BoutiquePageQuery=async(pageInfo)=>{
   
    return await axios.post('/Article/BoutiquePageQuery',pageInfo)
}
export const ArticleGetDetail=async(id)=>{
    return await axios.get('/Article/GetDetailbyId/'+id )
}
export const GetUserIDByArticleId=async(ArticleId)=>{
    return await axios.get('/Article/GetUserByArticleId/'+ArticleId)
}
export const QueryUserArticleByList=async(userId)=>{
    return await axios.get('/Article/QueryUserArticleByList/'+userId)
}
export const  ArticlePageByuser=async(pageInfo)=>{
    return await axios.post('/Article/PageQueryByList',pageInfo)
}
export const  ArticlePageByuserAll=async(pageInfo)=>{
    return await axios.post('/Article/PageQueryByListAll',pageInfo)
}
export const  UploadArticleCover=async(image)=>{
    //Multipart 实体请求 使用 multipart/form-data 类型发起 POST 请求 详情看https://www.axios-http.cn/docs/multipart,以下两种都一样，后一种方便
    // return await axios.post('/Article/UploadArticleCover',image, {headers: {
    //     'Content-Type': 'multipart/form-data'}
    //   })
      return await axios.postForm('/Article/UploadArticleCover',image)
}
export const  UploadArticleContentImage=async(wangeditorUploadedImage)=>{
    //Multipart 实体请求 使用 multipart/form-data 类型发起 POST 请求 详情看https://www.axios-http.cn/docs/multipart,以下两种都一样，后一种方便
    // return await axios.post('/Article/UploadArticleCover',image, {headers: {
    //     'Content-Type': 'multipart/form-data'}
    //   })
      return await axios.postForm('/Article/UploadArticleContentImage',wangeditorUploadedImage)
}
export const UpdateArticle=async(update)=>{
    //Multipart 实体请求 使用 multipart/form-data 类型发起 POST 请求 详情看https://www.axios-http.cn/docs/multipart,以下两种都一样，后一种方便
    // return await axios.post('/Article/UploadArticleCover',image, {headers: {
    //     'Content-Type': 'multipart/form-data'}
    //   })
      return await axios.post('/Article/UpdateArticle',update)
}
export const AddArticle=async(addInfo)=>{
    return await axios.post('/Article/AddArticle',addInfo)
}
export const newestArticle=async()=>{
    return await axios.get('/Article/NewestArticle')
}
export const newestUserArticle=async(id)=>{
    return await axios.get('/Article/NewestUserArticle/'+id)
}
export const HotAboutArticle=async()=>{
    return await axios.get('/Article/HotAboutArticle')
}
export const DelArticle = async(id)=>{
    return await axios.get('/Article/DelArticle/'+id)
}
export const UpdateSeeCheck=async(info)=>{
    return await axios.post('/Article/UpdateCheckSum',info)
}
export const FuzzySearch=async(info)=>{
    return await axios.post('/Article/FuzzySearch?FuzzyTitle='+info)
}
export const StatisticsUserArticle = async(id)=>{
    return await axios.get('/Article/StatisticsUserArticle/'+id)
}
export const StatisticsUserArticleUpvoteSum = async(id)=>{
    return await axios.get('/Article/StatisticsUserArticleUpvoteSum/'+id)
}