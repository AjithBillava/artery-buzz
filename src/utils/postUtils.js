import { likePost, unLikePost } from "../features/posts/postsSlice"

export const checkLikeStatus = (likedUsers, userId) => {
    console.log(likedUsers)
    return likedUsers?.find((user) => user._id === userId) ? true : false;
  };
export   const handleLikeButton = (e,userId,postId,likedUsers,dispatch,setLikeButtonColor) =>{
    e.preventDefault()
    if(likedUsers){
        if(checkLikeStatus(likedUsers,userId)){
            
            return dispatch(unLikePost({userId,postId})).then(()=>setLikeButtonColor("none"))
        }else{
           
            return dispatch(likePost({postId,userId})).then(()=> setLikeButtonColor("red"))
        }
    }
    
}