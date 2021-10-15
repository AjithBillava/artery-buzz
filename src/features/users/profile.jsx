// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useEffect } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// import { useParams } from "react-router-dom"

import { EditUserProfile } from "./editProfile"
import { followUser, getAllUsersData, getUserData, unFollowUser } from "./userSlice"
// import { CurrentUserPost } from "./currentUserPosts"
// import { fetchPostData} from "../posts/postsSlice"
// import { getAllUsersData, getUserData} from "./userSlice"
// import { Posts } from "../posts/postsLists"
// import { getCurrentUser } from "./usersServices"

// import { getUserData } from "./userSlice"

export const Profile = ({userProfile}) =>{

    const { status,currentUser } = useSelector(state => state.user)
    
    const userId = currentUser?._id
    
    const myFollowings = currentUser?.following

    const noOfFollowers=userProfile?.followers?.length
    const noOfFollowings=userProfile?.following?.length

    const checkIfFollowing=(userProfileId)=>{
        return myFollowings?.find(user=>user?._id===userProfileId)
    }
    const dispatch = useDispatch()
    console.log(status)
    useEffect(()=>{
        if(status==="idle"){
        dispatch(getAllUsersData(userId))
        dispatch(getUserData())

        }
    },[status])

    const handleOnFollow =(e,userId,followedUserId)=>{
        e.preventDefault()
        dispatch(followUser({userId,followedUserId}))
    }
    const handleOnUnfollow =(e,userId,unfollowedUserId)=>{
        e.preventDefault()
        console.log(userId,unfollowedUserId)
        dispatch(unFollowUser({userId,unfollowedUserId}))
    }
    
    return(
        <>
            <div className="relative p-2 md:px-40 ">
                { status==="loading" && <h2>loading</h2> }
                { status==="error" && <h2>error</h2> }

                {
                    status==="fulfilled" && 
                    <div>
                        <div className="flex justify-between items-center md:mt-10">
                    {
                        !userProfile?.profilePic || userProfile?.profilePic===""?
                        userProfile?.firstname && <p className="bg-primaryColor-light text-black rounded-full h-20 w-20 flex items-center justify-center">{userProfile?.firstname?.charAt(0)+userProfile?.lastname?.charAt(0)}</p>
                        
                        :<img className="rounded-full h-20 w-20 flex items-center justify-center" src={userProfile?.profilePic} alt={`${userProfile?.firstname} ${userProfile?.lastname}`} />
                    }
                   
                </div>

                <div>
                    <div className="flex justify-between items-center " >
                        <p className="font-semibold text-lg ">{`${userProfile?.firstname} ${userProfile?.lastname}`}</p>
                        {
                            userId!==userProfile?._id?
                            <>
                            {
                                checkIfFollowing(userProfile?._id)?
                                <button onClick={(e)=>handleOnUnfollow(e,userId,userProfile?._id)} className="p-2 flex bg-primaryColor rounded-md ">
                                    unfollow
                                </button>
                                :
                                <button onClick={(e)=>handleOnFollow(e,userId,userProfile?._id)} className="p-2 flex bg-primaryColor rounded-md ">
                                    follow
                                </button>
                            }
                            </>
                            :
                            <></>
                        }
                         {
                            userId===userProfile?._id?
                            <EditUserProfile/>
                            :
                            <></>
                        }
                    </div>
                    <p className="text-gray-600 " >@{userProfile?.username}</p>
                    <p>{userProfile?.bio}</p>
                    <a href={`${userProfile?.website}`} rel="noreferrer" target="_blank" >{userProfile?.website}</a>
                </div>
                <div className="flex flex-row justify-around text-gray-500">
                    <p><span className="font-semibold text-black" >{noOfFollowers}</span> followers</p>
                    <p><span className="font-semibold text-black" >{noOfFollowings}</span> following</p>
                </div>
                    </div>
                }
               
            </div>
        </>
    )

}