// import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { NewPost, NewPostForm } from "./newPost"
// import { Link } from "react-router-dom"
import { PostCard } from "./postCard"
// import { fetchPostData} from "./postsSlice"
// import { changeStatusToSucess,getAllUsersData} from "../users/userSlice"

export const PostFeed = () =>{
    // const {status,posts} = useSelector(state => state.posts)
    // const {status:userStatus,currentUser} = useSelector(state=>state.user)
    return(
        <div className="md:border-2 md:border-gray-200 md:m-5 rounded-md md:p-5 lg:mx-32 ">
            <div className="hidden md:block">
                <NewPostForm/>
            </div>
            <Posts/>
        </div>
    )
}

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
        <div className="flex flex-col-reverse">
            {status==="loading"&&<h2>loading</h2>}
            {status==="error"&&<h2>error</h2>}
            
            {type!=="Timeline"?
                
                posts.map(post=>(
                    <Link to={`/feed/${post._id}`}  key={post._id} >
                        {/* <div className=" md:border-gray-200 md:m-5 rounded-md md:p-5 lg:mx-32 "> */}
                            <PostCard post={post} user={user??currentUser} userId={currentUser._id} />
                        {/* </div> */}
                    </Link>
                ))
                :
                userPosts?.map(posts=>(
                    posts.map(post=>(
                    <Link to={`/feed/${post._id}`}  key={post._id} >
                        <PostCard post={post} user={user??currentUser} userId={currentUser._id} />
                    </Link>
                ))
                    ))
    
                
            }
            <NewPost btnStyle="p-4 text-3xl shadow-md flex justify-center items-center bg-primaryColor rounded-full h-12 w-12 fixed bottom-0 right-0 m-5 md:hidden " btnText="+" />

        </div>
    )
}