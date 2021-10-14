import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { checkLikeStatus, handleLikeButton } from "../../utils/postUtils"
import { Avatar } from "../Header/avatar"
// import { PostDetailedCardView } from "./PostDetailedCardView"

export function PostCardDetails (){
const {postId} = useParams()
const{status,posts} = useSelector(state=>state.posts)
const{status:userStatus,currentUser} = useSelector(state=>state.user)


let currentPost = posts?.filter(post=>post._id===postId)
currentPost = currentPost[0]
console.log(posts,currentPost)

const userId = currentUser._id
console.log(currentPost);
// const { author, content, likedUsers } = currentPost;

const [likeButtonColor, setLikeButtonColor] = useState("none");
useEffect(() => {
    console.log(currentPost?.likedUsers, userId);
    if (checkLikeStatus(currentPost?.likedUsers, userId)) {
        setLikeButtonColor("red");
    }
    if (!checkLikeStatus(currentPost?.likedUsers, userId)) {
        setLikeButtonColor("none");
    }
}, [setLikeButtonColor, currentPost?.likedUsers, userId]);

const dispatch = useDispatch()

return (
    <div >
        {userStatus==="loading" && <h2>loading</h2> }

        {userStatus==="fulfilled" && 
            <div className="flex p-2 border-2 border-gray-200 mb-1 ">
                <Avatar firstname={currentPost?.author?.firstname} lastname={currentPost?.author?.lastname} profilePic={currentPost?.author ? currentPost?.author?.profilePic : currentUser?.profilePic} username={currentPost?.author?.username} />

                <div className="w-screen ml-2">
                    <div className="flex">
                        <p className="font-bold">{`${currentPost?.author?.firstname} ${currentPost?.author?.lastname}`}</p>
                        <p className="ml-2 text-gray-600 ">@{currentPost?.author?.username} </p>
                    </div>
                    <div>
                        {currentPost?.content}
                        <div className="flex justify-around">
                            <div className="flex items-center cursor-pointer " onClick={() => handleLikeButton(userId,postId,currentPost?.likedUsers,dispatch,setLikeButtonColor)} >
                            <div className=" z-10" >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " title="like" fill={likeButtonColor} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                
                                <p>{currentPost?.likedUsers?.length} </p>
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
);
}
