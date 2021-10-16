import { Routes} from "react-router-dom"
import { PostFeed } from "../posts/postsLists";
import { PrivateRoute } from '../users/privateRoute';
import { Timeline } from "../Timeline/Timeline";
import { PostCardDetails } from "../posts/postCardDetails";
import { NotificationPage } from "../notificatons/notification";
import { FollowingsList } from "../users/following";
import { FollowersList } from "../users/followersPage";

export const Home = () =>{

    return (
        <div className="sm:text-lg md:text-xl">
            
            <Routes>
                <PrivateRoute path=""  element={<PostFeed/>}/>
                <PrivateRoute path=":username"  element={<Timeline/>}/>
                <PrivateRoute path=":username/followers"  element={<FollowersList/>}/>
                <PrivateRoute path=":username/following"  element={<FollowingsList/>}/>
                <PrivateRoute path="notifications"  element={<NotificationPage/>}/>
                <PrivateRoute path="feed/:postId"  element={<PostCardDetails/>}/>
            </Routes>
        </div>
    )

}