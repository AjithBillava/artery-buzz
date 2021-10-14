// import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
// import { Link } from "react-router-dom"
import { PostCard } from "./postCard"
// import { fetchPostData} from "./postsSlice"
// import { changeStatusToSucess,getAllUsersData} from "../users/userSlice"

export const Posts = ({user,type,userPosts}) =>{

    const {status,posts} = useSelector(state => state.posts)
    const {status:userStatus,currentUser} = useSelector(state=>state.user)
    // const {content,author,likedUsers} = posts
    // const dispatch = useDispatch()
    // const userPosts= posts?.map(post=>(
    //              user?.posts?.filter(userpost=>post._id===userpost._id)
    //         ))
    console.log(userPosts,userStatus)
    // useEffect(()=>{
    //     if(status==="idle"||userStatus==="idle"){
    //         dispatch(fetchPostData())
    //         dispatch(changeStatusToSucess())
    //         dispatch(getAllUsersData())

    //     }
    // },[status,currentUser])
   
    // console.log(currentUser)
    return (
        <div>
            {status==="loading"&&<h2>loading</h2>}
            {status==="error"&&<h2>error</h2>}
            
            {type!=="Timeline"?
                posts.map(post=>(
                    <Link  to={`/feed/${post._id}`}  key={post._id} >
                        <PostCard post={post} user={user??currentUser} userId={currentUser._id} />
                    </Link>
                ))
                :
                userPosts?.map(posts=>(
                    posts.map(post=>(
                    <Link  to={`/feed/${post._id}`}  key={post._id} >
                        <PostCard post={post} user={user??currentUser} userId={currentUser._id} />
                    </Link>
                ))
                    ))
    
                
            }

        </div>
    )
}