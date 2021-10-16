import { toast } from "react-toastify";
import { likePost, unLikePost } from "../features/posts/postsSlice"

export const checkLikeStatus = (likedUsers, userId) => {
    
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
export const getPostShareLink = (e,postId) => {
    e.preventDefault();
    navigator.clipboard.writeText(`${window.location.hostname}/feed/${postId}`);
    toast.success("Link copied to clipboard", "success", {
        style: { backgroundColor: "##15b996" },
        autoClose: 2000,
        hideProgressBar: true,
            });
  };