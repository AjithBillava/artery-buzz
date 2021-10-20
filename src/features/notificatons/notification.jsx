import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Avatar } from "../Header/avatar"
import { LoaderComponent } from "../loader/loader"
import { getUserData, getUserNotification, readUserNotification } from "../users/userSlice"

export const NotificationPage = () =>{

    const {notifications,notificationStatus,status,currentUser} = useSelector(state=>state.user)
    
    const userId = currentUser._id || {}
    const dispatch = useDispatch()
    useEffect(()=>{
        // if(status==="idle"){
        //     dispatch(getUserData())
        // }
        if(notificationStatus!=="fulfilled"){
            dispatch(getUserData()).then(()=>dispatch(getUserNotification({userId})))

        
        }
    },[notificationStatus])
    console.log(status,notificationStatus)
    return(
        <>
            <h2 className="flex p-3 text-2xl font-bold md:text-3xl items-center justify-center" >Notifications</h2>

            <div className="md:border-2 md:border-gray-200 md:m-5 rounded-md md:p-5 lg:mx-32 flex-col-reverse flex ">
                {notificationStatus ==="loading" && <LoaderComponent/> }

                {
                    notifications.length>0?
                    notifications?.map(notification =>(
                            <div key={notification._id} >
                                <NotificationCard notification={notification} />
                            </div>
                        )
                    )
                    :
                    status==="fulfilled" && <div className="flex flex-col h-5/6 text-2xl font-semibold items-center justify-center " >
                        you have no notification
                    </div>
                }

            </div>
        </>
    )
}

const NotificationCard = ({notification}) =>{
    const {destinationUser:destinationUserId,originUser:originUserId,action,isRead,_id:notificationId,postId} = notification || {}
    const {currentUser,allUsers} = useSelector(state=>state.user)
    // const {posts} = useSelector(state=>state.posts)
    const userId = currentUser?._id
    const destinationUser = allUsers?.find(user=>user._id===destinationUserId)
    const originUser = allUsers?.find(user=>user?._id===originUserId)
    
    const dispatch = useDispatch()

    const handleNotificationRead =({userId,notificationId}) =>{
        dispatch(readUserNotification({userId,notificationId}))
    }
    const notificationStyle =`flex items-center p-2 border-2 border-gray-200 mb-1 ${isRead?"bg-white":"bg-gray-300"} `

    if (action ==="Followed" ) {
        return(
            <Link className={notificationStyle} onClick={()=>handleNotificationRead({userId,notificationId})} to={`/${originUser?.username}`}>
                <Avatar firstname={originUser?.firstname} lastname={originUser?.lastname} profilePic={originUser?originUser?.profilePic:currentUser?.profilePic} username={originUser?.username} />
                <div className="ml-3">{`${originUser?.firstname} followed you`}</div>
            </Link>
        )
    }
    else if(action === "Liked"){
        return(
            <Link className={notificationStyle} onClick={()=>handleNotificationRead({userId,notificationId})} to={`/feed/${postId}`} >
                <Avatar firstname={originUser?.firstname} lastname={originUser?.lastname} profilePic={originUser?originUser?.profilePic:currentUser?.profilePic} username={originUser?.username} />
                <div className="ml-3">
                    {`${originUser?.firstname} liked your Post`}
                </div>
            </Link>
        )
    }
    else{
        return(
            <Link className={notificationStyle} onClick={()=>handleNotificationRead({userId,notificationId})} to={`/feed/${postId}`} >
                <Avatar firstname={originUser?.firstname} lastname={originUser?.lastname} profilePic={originUser?originUser?.profilePic:currentUser?.profilePic} username={originUser?.username} />
                <div className="ml-3">{`${originUser?.firstname} added new Post`}</div>
            </Link>
        )
    }
}