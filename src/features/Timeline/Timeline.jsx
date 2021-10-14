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
    //    posts?.filter(post=>post._id===userpost._id)
       posts?.filter(post=>post._id===userpost._id)
   ))
   console.log(posts)
//    console.log(userProfile,userPosts)
    return(
        <div>
            <Profile userProfile={userProfile} />
            {/* {userPosts?.map(posts=>(
                    posts.map(post=>(
                    <div key={post._id} >
                                    <Posts user={userProfile} type="Timeline" />

                    </div>
                ))
                    ))} */}
            <Posts user={userProfile} userPosts={userPosts} type="Timeline" />
        </div>
    )
}