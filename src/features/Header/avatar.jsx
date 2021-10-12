import { Link } from "react-router-dom"

export const Avatar = ({firstname,lastname,profilePic}) =>{


    return(
        <div>
            <Link to="/profile">
                {
                    !profilePic || profilePic===""?
                    firstname && <p className="bg-primaryColor-light text-black rounded-full h-10 w-10 flex items-center justify-center">{firstname?.charAt(0)+lastname?.charAt(0)}</p>
                    
                    :<img className="rounded-full h-10 w-10 flex items-center justify-center" src={profilePic} alt={`${firstname} ${lastname}`} />
                    
                }
            </Link>
            
        </div>
    )
}