import { useSelector } from "react-redux"

export const CurrentUserPost = () =>{

    const {currentUser,status} = useSelector(state=>state.user)
    const {posts} = currentUser
    return(
        <div>
            {status==="loading"&&<h2>loading</h2>}
            {status==="error"&&<h2>error</h2>}
            {
                posts.map(post=>(
                    <div>
                        <div>{post.content} </div>
                        <div>{currentUser.username} <p>{post.likedUsers.length}</p> </div>
                        
                    </div>
                ))
            }
        </div>
    )

}