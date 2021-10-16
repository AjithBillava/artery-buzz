import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { checkLikeStatus, getPostShareLink, handleLikeButton } from "../../utils/postUtils"
import { Avatar } from "../Header/avatar"
import { LoaderComponent } from "../loader/loader"

export function PostCardDetails (){
const {postId} = useParams()
const{status,posts} = useSelector(state=>state.posts)
const{status:userStatus,currentUser} = useSelector(state=>state.user)


let currentPost = posts?.filter(post=>post._id===postId)
currentPost = currentPost[0]

const userId = currentUser._id

const [likeButtonColor, setLikeButtonColor] = useState("none");
useEffect(() => {
    if (checkLikeStatus(currentPost?.likedUsers, userId)) {
        setLikeButtonColor("red");
    }
    if (!checkLikeStatus(currentPost?.likedUsers, userId)) {
        setLikeButtonColor("none");
    }
}, [setLikeButtonColor, currentPost?.likedUsers, userId]);

const dispatch = useDispatch()

return (
    <div className=" md:m-5 rounded-md md:p-5 lg:mx-32 " >
        {userStatus==="loading" && <LoaderComponent/> }

        {userStatus==="fulfilled" && 
            <div className="flex p-2 md:p-5 border-2 border-gray-200 mt-8">
                <Avatar firstname={currentPost?.author?.firstname} lastname={currentPost?.author?.lastname} profilePic={currentPost?.author ? currentPost?.author?.profilePic : currentUser?.profilePic} username={currentPost?.author?.username} />

                <div className="w-screen ml-2">
                    <div className="flex">
                        <p className="font-bold">{`${currentPost?.author?.firstname} ${currentPost?.author?.lastname}`}</p>
                        <p className="ml-2 text-gray-600 ">@{currentPost?.author?.username} </p>
                    </div>
                    <div>
                        {currentPost?.content}
                        <div className="flex justify-around mt-4">
                            <div className="flex items-center " >
                                <button  className="cursor-pointer  " onClick={(e) => handleLikeButton(e,userId,postId,currentPost?.likedUsers,dispatch,setLikeButtonColor)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " title="like" fill={likeButtonColor} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                                
                                <p>{currentPost?.likedUsers?.length} </p>
                            </div>
                            <button className=" cursor-pointer  " onClick={(e)=>getPostShareLink(e,postId)}>
                                    <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
);
}
