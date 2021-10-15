import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { SideNavigation } from "../sideNavigation/sideNavigation"
import { Avatar } from "./avatar"

export const Header =() =>{
    const {currentUser} = useSelector(state => state.user)

    const {firstname,lastname,profilePic,username} = currentUser
    return(
        <div className="flex flex-column justify-between items-center p-2 md:px-8 bg-black" >
            <SideNavigation/>
            <Link to="/" className="p-2 font-semibold rounded-md hover:bg-primaryColor md:text-2xl text-white hover:text-black">Artery-BUZZ</Link>
            <Avatar firstname={firstname} lastname={lastname} profilePic={profilePic} username={username} />
        </div>
    )
}