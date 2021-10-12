// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
import {  useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { CurrentUserPost } from "./currentUserPosts"
// import { getUserData } from "./userSlice"

export const Profile = () =>{

    const { currentUser,status } = useSelector(state => state.user)
    
    return(
        <div>
            { status==="loading" && <h2>loading</h2> }
            { status==="error" && <h2>error</h2> }

            <div>
                {currentUser?.username}
            </div>
            <Link to="/" >feed</Link>
            <Link to="/editProfile" > edit Profile</Link>
            <CurrentUserPost/>
        </div>
    )

}