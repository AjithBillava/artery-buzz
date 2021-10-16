
import { useDispatch } from "react-redux"
import { Avatar } from "../Header/avatar"
import { useEffect, useState } from "react"
import { checkLikeStatus, handleLikeButton } from "../../utils/postUtils"

export const PostCard = ({post,userId,currentUser}) =>{
    const dispatch = useDispatch()
    const [likeButtonColor,setLikeButtonColor] = useState("none")

  
    const {author,content,likedUsers,_id:postId} = post
   
    useEffect(() => {
        console.log(likedUsers,userId)
        if(checkLikeStatus(likedUsers,userId)){
            setLikeButtonColor("red")
        }
        if(!checkLikeStatus(likedUsers,userId)){
            setLikeButtonColor("none")
        }
    }, [setLikeButtonColor,likedUsers,userId])
    
    return(
        <div >
            {
                <div className="flex p-2 border-2 border-gray-200 mb-1 ">
                    <Avatar firstname={author?.firstname} lastname={author?.lastname} profilePic={author?author?.profilePic:currentUser?.profilePic} username={author?.username} />

                    <div className="w-screen ml-2">
                        <div className="flex" >
                            <p className="font-bold">{`${author?.firstname} ${author?.lastname}`}</p>
                            <p className="ml-2 text-gray-600 " >@{author?.username} </p>
                        </div>
                        <div>
                            {content}
                            <div className="flex justify-around mt-4 ">
                                <div className="flex items-center " >
                                    <button className=" cursor-pointer  "  onClick={(e) => handleLikeButton(e,userId,postId,likedUsers,dispatch,setLikeButtonColor)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " title="like" fill={likeButtonColor} viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                    <p>{likedUsers?.length} </p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </div>
                        </div>                            
                    </div>
                </div>
            }
        </div>
    )
}