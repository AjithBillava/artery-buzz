import { useSelector } from "react-redux"
import { PostCard } from "../posts/postCard"

export const CurrentUserPost = () =>{

    const {currentUser,status} = useSelector(state=>state.user)
    const {posts:currentUserPosts} = currentUser
    const {posts} = useSelector(state => state.posts)
    const updatedPosts = currentUserPosts?.map(userpost=>(
         posts.filter(post=>post._id===userpost._id)
    ))

    // const postReducer = (posts,userpost)=>  posts.filter(post=>post._id===userpost._id)

    // const updatedPosts = posts?.filter(post=>post._id!==currentUserPosts._id)
    // console.log(updatedPosts,currentUserPosts)
    return(
        <div>
            {status==="loading"&&<h2>loading</h2>}
            {status==="error"&&<h2>error</h2>}
            {
                updatedPosts?.map(posts=>(
                    posts?.map(post=>
                        <div key={post._id} >
                        <PostCard post={post} userId={currentUser._id}  />
                    </div>
                    )
                ))
            }
        </div>
    )

}