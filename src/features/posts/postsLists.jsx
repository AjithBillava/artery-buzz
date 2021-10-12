import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
// import { Link } from "react-router-dom"
import { PostCard } from "./postCard"
import { fetchPostData} from "./postsSlice"

export const Posts = () =>{

    const {status,posts} = useSelector(state => state.posts)
    const {currentUser} = useSelector(state=>state.user)
    // const {content,author,likedUsers} = posts
    const dispatch = useDispatch()
   
    useEffect(()=>{
        if(status==="idle"){
            dispatch(fetchPostData())
        }
    },[dispatch,status])
   
    // console.log(currentUser)
    return (
        <div>
            {status==="loading"&&<h2>loading</h2>}
            {status==="error"&&<h2>error</h2>}
            
            {
                posts.map(post=>(
                    <div key={post._id} >
                        <PostCard post={post} userId={currentUser._id} />
                    </div>
                ))
            }

        </div>
    )
}