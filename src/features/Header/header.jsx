import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Avatar } from "./avatar"

export const Header =() =>{
    const {currentUser} = useSelector(state => state.user)

    const {firstname,lastname,profilePic} = currentUser
    return(
        <div className="flex flex-column justify-between items-center p-2 bg-black" >
            <Link to="/" className="p-2 font-semibold rounded-md hover:bg-primaryColor text-white hover:text-black">Artery-BUZZ</Link>
            <Avatar firstname={firstname} lastname={lastname} profilePic={profilePic} />
        </div>
    )
}