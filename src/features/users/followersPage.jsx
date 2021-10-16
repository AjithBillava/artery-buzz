import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { checkIfFollowing, handleOnFollow, handleOnUnfollow } from "../../utils/userUtils"
import { Avatar } from "../Header/avatar"
import { LoaderComponent } from "../loader/loader"
import { followUser, getAllUsersData, getUserData, unFollowUser } from "./userSlice"


export const FollowersList = ()=>{
    const {username} = useParams()

    const {allUsers} = useSelector(state=>state.user)

    const userProfile = allUsers?.find(user=>user?.username===username)
    const followers = userProfile?.followers
    const following =userProfile?.following

    return(
        <div className="flex flex-col md:border-2 md:border-gray-200 md:m-5 rounded-md md:p-5 lg:mx-32 ">
            <div className="flex justify-center items-center font-bold text-2xl p-3" >FOLLOWERS</div>
            
                <div>
                    {
                        followers?.length >0?
                         followers?.map(user=>(
                            <div key={user?._id}>
                                <UserCard following={following} user={user}/>
                            </div>
                        ))
                        :
                        <div>
                            You have no followers
                        </div>
                    }
                </div>

        </div>
    )
}
export const UserCard =({following,user,type})=>{

    const {currentUser,status} = useSelector(state => state.user)
    const userId = currentUser?._id
    useEffect(()=>{
        if(status==="idle"){
        dispatch(getAllUsersData(userId))
        dispatch(getUserData())

        }
    },[status])
    const dispatch = useDispatch()
    return (
        <>
            {status==="loading" &&<LoaderComponent />}
            <div className="flex flex-row justify-between items-center border border-gray-300 mb-3 ">
                
                <div className="flex flex-row p-2 items-center">
                    <Avatar firstname={user?.firstname} lastname={user?.lastname} username={user?.username} profilePic={user?.profilePic} />
                    <p className="ml-3 font-semibold " >{`${user?.firstname} ${user?.lastname}`}</p>
                    
                </div>
                <div className="mr-3" >
                    {
                        checkIfFollowing(following,user?._id)?
                        <button onClick={(e)=>handleOnUnfollow(e,userId,user?._id,dispatch,unFollowUser)} className="p-2 flex bg-primaryColor rounded-md ">
                            unfollow
                        </button>
                        :
                        <button onClick={(e)=>handleOnFollow(e,userId,user?._id,dispatch,followUser)} className="p-2 flex bg-primaryColor rounded-md ">
                        follow
                        </button>
                    }
                </div>
            </div>
        </>
    )
}