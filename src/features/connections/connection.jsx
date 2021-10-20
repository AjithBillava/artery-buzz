import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {useSelector} from "react-redux"
import { checkIfFollowing, handleOnFollow, handleOnUnfollow } from "../../utils/userUtils"
import { Avatar } from "../Header/avatar"
import { LoaderComponent } from "../loader/loader"
import { followUser, getAllUsersData, unFollowUser } from "../users/userSlice"
export const ConnectionPage = () =>{

    const {allUsers,currentUser,status} = useSelector(state=>state.user)

    const userFollowings = currentUser?.following
    console.log(userFollowings,allUsers)
    let notFollowedUsers = userFollowings?.map((followedUser)=>{
        console.log(followedUser?._id)
        return allUsers?.filter(user=>user?._id!==followedUser?._id && user?._id!==currentUser?._id ) 
    })
    
    console.log(notFollowedUsers)
    let [notFollowedUser]=notFollowedUsers || []
    return(
        <>
            <h2 className="flex p-3 font-bold text-2xl md:text-3xl items-center justify-center" >Connect with people</h2>
            <div className=" flex flex-wrap justify-center md:border-2 md:border-gray-200 md:m-3 rounded-md md:p-5 lg:mx-32 ">
                
                {
                    status==="loading" && <LoaderComponent/>
                }
                {   
            
                    // notFollowedUsers?.map((notFollowedUser)=>
                        notFollowedUser?.map((user)=>(
                            <PeopleCard user={user} status={status} following={userFollowings} loggedUserId ={currentUser?._id}
                            // following={userFollowings}
                            />
                        ))
                    // )
                    
                }
            </div>
        </>
    )
}


const PeopleCard =({user,status,loggedUserId,following})=>{

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllUsersData(loggedUserId))
    },[status])
    return (
        <div className="flex flex-col m-2 shadow-md justify-between items-center p-2 border border-gray-200 rounded-md w-60">
            <div className="my-1 flex flex-col items-center" >
                <Avatar firstname={user?.firstname} lastname={user?.lastname} profilePic={user?.profilePic} username={user?.username}/>
                <div className="my-1 flex flex-col items-center">
                    <p className="font-semibold text-lg line-clamp-1 leading-10 overflow-ellipsis break-all">{`${user?.firstname} ${user?.lastname}`} </p>
                    <p className="text-gray-500 line-clamp-2 overflow-ellipsis break-all" > {user?.bio} </p>
                </div>
            </div>
            <div className="flex flex-col  justify-center items-center" >
                
                <div className="mt-3 flex flex-col flex-end" >
                    {
                        checkIfFollowing(following,user?._id)?
                        <button onClick={(e)=>handleOnUnfollow(e,loggedUserId,user?._id,dispatch,unFollowUser)} className="p-2 flex bg-primaryColor rounded-md ">
                            unfollow
                        </button>
                        :
                        <button onClick={(e)=>handleOnFollow(e,loggedUserId,user?._id,dispatch,followUser)} className="p-2 flex bg-primaryColor rounded-md ">
                        follow
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}