import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Avatar } from "../Header/avatar"
import { getUserNotification, readUserNotification } from "../users/userSlice"

export const NotificationPage = () =>{

    const {notifications,status,currentUser} = useSelector(state=>state.user)
    console.log(status)
    const userId = currentUser._id || {}
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUserNotification({userId}))
    },[])

    return(
        <>
            {status ==="loading" && <h2>loading</h2> }

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
                <div>
                    {`${originUser?.firstname} liked your Post`}
                </div>
            </Link>
        )
    }
    else{
        return(
            <Link className={notificationStyle} onClick={()=>handleNotificationRead({userId,notificationId})} to={`/feed/${postId}`} >
                <Avatar firstname={originUser?.firstname} lastname={originUser?.lastname} profilePic={originUser?originUser?.profilePic:currentUser?.profilePic} username={originUser?.username} />
                <div>{`${originUser?.firstname} added new Post`}</div>
            </Link>
        )
    }
}