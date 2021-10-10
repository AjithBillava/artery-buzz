import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchPostData } from "./postsSlice"

export const Posts = () =>{

    const {status,posts} = useSelector(state => state.posts)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(status==="idle"){
            dispatch(fetchPostData())
        }
    },[dispatch,status])

    return (
        <div>
            {status==="loading"&&<h2>loading</h2>}
            {status==="error"&&<h2>error</h2>}
            {
                posts.map(post=>(
                    <div>
                        <div>{post.content} </div>
                        <div>{post.author.username} <p>{post.likedUsers.length}</p> </div>
                        <Link to="/profile">profile</Link>
                    </div>
                ))
            }

        </div>
    )
}