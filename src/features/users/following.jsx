import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { UserCard } from "./followersPage"

export const FollowingsList = ()=>{
    const {username} = useParams()

    const {allUsers} = useSelector(state=>state.user)

    const userProfile = allUsers?.find(user=>user?.username===username)
    const following =userProfile?.following

    // const {following} = user || {}
    return(
        <div className="flex flex-col md:border-2 md:border-gray-200 md:m-5 rounded-md md:p-5 lg:mx-32 ">
            <div className="flex justify-center items-center font-bold text-2xl p-3 " >FOLLOWING</div>

            <div>
                {
                    following?.length>0?
                        following?.map(user=>(
                            <div key={user?._id}>
                                <UserCard following={following} user={user}/>
                            </div>
                        ))
                    :
                        <div>
                            You are not followinfg anyone
                        </div>
                }
            </div>
            
        </div>
    )
}
