import { useSelector } from "react-redux"
import { PostCard } from "../posts/postCard"
// import _ from "lodash"
export const CurrentUserPost = ({user}) =>{

    const {status} = useSelector(state=>state.user)
    const {posts:currentUserPosts} = user
    const {posts} = useSelector(state => state.posts)
    // currentUserPosts.author=_.extend(currentUserPosts.author,user)
    console.log(user,currentUserPosts,posts)
    
    const updatedPosts = posts?.map(post=>(
         currentUserPosts.filter(userpost=>post._id===userpost._id)
    ))
    console.log(updatedPosts)
    // const updatedPosts = currentUserPosts?.map(userpost=>(
    //      posts.filter(post=>post._id===userpost._id)
    // ))


    // const {currentUser,status} = useSelector(state=>state.user)
    // const {posts:currentUserPosts} = currentUser
    // const {posts} = useSelector(state => state.posts)
    // const updatedPosts = currentUserPosts?.map(userpost=>(
    //      posts.filter(post=>post._id===userpost._id)
    // ))

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
                        <PostCard post={post} userId={user._id}  />
                    </div>
                    )
                ))
            }
        </div>
    )

}