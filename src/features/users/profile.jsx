import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { checkIfFollowing, handleOnFollow, handleOnUnfollow } from "../../utils/userUtils"
import { LoaderComponent } from "../loader/loader"
import { fetchPostData } from "../posts/postsSlice"


import { EditUserProfile } from "./editProfile"
import { followUser, getAllUsersData, getUserData, unFollowUser } from "./userSlice"


export const Profile = ({userProfile}) =>{

    const { status,currentUser } = useSelector(state => state.user)
    
    const userId = currentUser?._id
    
    const myFollowings = currentUser?.following

    const noOfFollowers=userProfile?.followers?.length
    const noOfFollowings=userProfile?.following?.length

   
    const dispatch = useDispatch()
    useEffect(()=>{
        if(status==="idle"){
        dispatch(getAllUsersData(userId))
        dispatch(getUserData())
        dispatch(fetchPostData())
        }
    },[status])

    
    
    return(
        <>
            <div className="relative p-2 md:px-40 ">
                { status==="loading" && <LoaderComponent/> }
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
                                checkIfFollowing(myFollowings,userProfile?._id)?
                                <button onClick={(e)=>handleOnUnfollow(e,userId,userProfile?._id,dispatch,unFollowUser)} className="p-2 flex bg-primaryColor rounded-md ">
                                    unfollow
                                </button>
                                :
                                <button onClick={(e)=>handleOnFollow(e,userId,userProfile?._id,dispatch,followUser)} className="p-2 flex bg-primaryColor rounded-md ">
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
                    <Link to={`/${userProfile?.username}/followers`}><span className="font-semibold text-black" >{noOfFollowers}</span> followers</Link>
                    <Link to={`/${userProfile?.username}/following`}><span className="font-semibold text-black" >{noOfFollowings}</span> following</Link>
                </div>
                    </div>
                }
               
            </div>
        </>
    )

}