import { Routes} from "react-router-dom"
import { Posts } from "../posts/postsLists";
import { EditUserProfile } from "../users/editProfile";
// import { LoginPage } from "../users/loginUser";
// import { Profile } from "../users/profile";
// import { RegisterPage } from "../users/registerUser";
import { PrivateRoute } from '../users/privateRoute';
import { Timeline } from "../Timeline/Timeline";
import { PostCardDetails } from "../posts/postCardDetails";

export const Home = () =>{

    return (
        <div>
            <Routes>
          <PrivateRoute path=""  element={<Posts/>}/>
          
          {/* <PrivateRoute path="profile"  element={<Timeline/>}/> */}
          <PrivateRoute path=":username"  element={<Timeline/>}/>
          <PrivateRoute path="feed/:postId"  element={<PostCardDetails/>}/>
{/*           
          <PrivateRoute path="profile"  element={<Profile/>}/>
          <PrivateRoute path=":username"  element={<Profile/>}/> */}
          <PrivateRoute path="editProfile"  element={<EditUserProfile/>}/>
          
          {/* <PrivateRoute path="/editProfile"  element={<EditUserProfile/>}/> */}
        </Routes>
        </div>
    )

}