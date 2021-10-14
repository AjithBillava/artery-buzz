// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useEffect } from "react"
import { useSelector } from "react-redux"

// import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
// import { CurrentUserPost } from "./currentUserPosts"
// import { fetchPostData} from "../posts/postsSlice"
// import { getAllUsersData, getUserData} from "./userSlice"
// import { Posts } from "../posts/postsLists"
// import { getCurrentUser } from "./usersServices"

// import { getUserData } from "./userSlice"

export const Profile = ({userProfile}) =>{

    const { status,currentUser } = useSelector(state => state.user)
    
    const userId = currentUser._id
   
    return(
        <>
            <div>
                { status==="loading" && <h2>loading</h2> }
                { status==="error" && <h2>error</h2> }

                <div>
                    {userProfile?.username}
                </div>
                <Link to="/" >feed</Link>
                {
                    userId===userProfile?._id?
                    <Link to="/editProfile" > edit Profile</Link>
                    :
                    <></>
                }
            </div>
        </>
    )

}