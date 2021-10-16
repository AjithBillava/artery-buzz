// import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { LoaderComponent } from "../loader/loader"
import { NewPost, NewPostForm } from "./newPost"
import { PostCard } from "./postCard"

export const PostFeed = () =>{

    return(
        <div className="md:border-2 md:border-gray-200 md:m-5 rounded-md md:p-5 lg:mx-32 ">
            <div className="hidden md:block">
                <NewPostForm type="Desktop" />
            </div>
            <Posts/>
        </div>
    )
}

export const Posts = ({user,type,userPosts}) =>{

    const {status,posts} = useSelector(state => state.posts)
    const {status:userStatus,currentUser} = useSelector(state=>state.user)


    return (
        <div className="flex flex-col-reverse">
            {status==="loading"&&<LoaderComponent/>}
            {status==="error"&&<h2>error</h2>}
            
            {type!=="Timeline"?
                
                posts.map(post=>(
                    <Link to={`/feed/${post._id}`}  key={post._id} >
                            <PostCard post={post} user={user??currentUser} userId={currentUser._id} />
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