import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getFormValues } from "../../utils/userUtils"
import { editUserProfile } from "./userSlice"

export const EditUserProfile = () =>{

    const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.user)

    const {firstname,lastname,bio,profilePic,website} = currentUser
    // console.log(currentUser)
    const handleOnSubmit = (e) =>{
        e.preventDefault()

        const {...rest} = getFormValues(e,"editUserProfile")
        dispatch(editUserProfile({...rest}))
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
                    <label htmlFor="profilePic">website</label>
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
                
                <button type="submit"></button>
            </form>
        </div>
    )
}