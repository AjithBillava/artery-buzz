 import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Posts } from "../posts/postsLists"
import { Profile } from "../users/profile"


 export const Timeline =()=>{
    const {posts} = useSelector(state => state.posts)
   
    const { allUsers } = useSelector(state => state.user)
    
    const {username} = useParams()
    const userProfile = allUsers.find(user=>user.username===username)
    const userPosts= userProfile?.posts?.map(userpost=>(
       posts?.filter(post=>post._id===userpost._id)
   ))
   console.log(posts)
   
    return(
        <div className="md:border-2 md:border-gray-200 md:m-5 rounded-md md:p-5 lg:mx-32 ">
            <Profile userProfile={userProfile} />
            <Posts user={userProfile} userPosts={userPosts} type="Timeline" />
        </div>
    )
}