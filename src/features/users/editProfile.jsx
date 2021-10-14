import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getFormValues } from "../../utils/userUtils"
import { editUserProfile } from "./userSlice"

export const EditUserProfile = () =>{

    const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.user)
    const navigate = useNavigate()

    const {firstname,lastname,bio,profilePic,website} = currentUser
    // console.log(currentUser)
    const handleOnSubmit = (e) =>{
        e.preventDefault()
        const userId=currentUser._id
        const {...rest} = getFormValues(e,"editUserProfile")
        dispatch(editUserProfile({userId,...rest})).then(user=>navigate("/profile"))
    }

    return(
        <div>

            <form onSubmit={(e)=>handleOnSubmit(e)} >
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" defaultValue={firstname} name="firstname" />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" defaultValue={lastname} name="lastname" />
                </div>
                <div>
                    <label htmlFor="profilePic">profilePic</label>
                    <input type="text" defaultValue={profilePic} name="profilePic" />
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <input type="text" defaultValue={bio} name="bio" />
                </div>
                <div>
                    <label htmlFor="website">website</label>
                    <input type="text" defaultValue={website} name="website" />
                </div>
                
                <button type="submit">submit</button>
            </form>
        </div>
    )
}