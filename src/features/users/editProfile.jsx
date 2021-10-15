import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getFormValues } from "../../utils/userUtils"
import { editUserProfile } from "./userSlice"

export const EditUserProfile = () =>{
    const [showEditProfileModal , setShowEditProfileModal] = useState(false)
    const {status} = useSelector(state=>state.user)
    return(
       <>
        {status==="loading"&& <h2>loading</h2> }
        <button onClick={()=>setShowEditProfileModal(true)} className="p-2 flex bg-gray-300 rounded-md ">
            Edit Profile
        </button>
        {
            showEditProfileModal&&<EditProfileModal toggleModalView={setShowEditProfileModal} />
        }
       </>
    )
}
const EditProfileModal =( {toggleModalView} )=>{
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.user)
    // const navigate = useNavigate()

    const {firstname,lastname,bio,profilePic,website} = currentUser
    // console.log(currentUser)
    const handleOnSubmit = (e) =>{
        e.preventDefault()
        const userId=currentUser._id
        const {...rest} = getFormValues(e,"editUserProfile")
        dispatch(editUserProfile({userId,...rest}))
       
        // .then(user=>navigate("/profile"))
    }

    const inputFocused = useRef(null)
    
    useEffect(()=>{
        inputFocused.current.focus()
    },[])
    
    return(
        <div className=" flex md:text-xl flex-col items-center w-screen fixed justify-center top-0 left-0 bg-black bg-opacity-75 backdrop-filter backdrop-blur-sm  md:px-16 lg:px-32 h-screen z-10 p-2" >
            <section className="bg-white flex flex-col p-4 w-full h-4/5 rounded-md relative ">
                
                <form className="sticky overflow-y-auto" onSubmit={(e)=>{handleOnSubmit(e) 
                                                                        toggleModalView(false)}} >
                    <div className="flex justify-between items-center my-2">
                        <button className="p-2 bg-gray-100 rounded-md " onClick={()=>toggleModalView(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <button className="p-1 px-2 flex bg-primaryColor rounded-md " type="submit">submit</button>

                    </div>
                    <div className="mt-4">
                        <div className="flex flex-col pb-2">
                            <label className="font-semibold" htmlFor="firstname">First Name</label>
                            <input ref={inputFocused} className="border rounded-md p-1" type="text" defaultValue={firstname} name="firstname" />
                        </div>
                        <div className="flex flex-col pb-2">
                            <label className="font-semibold" htmlFor="lastname">Last Name</label>
                            <input className="border rounded-md p-1" type="text" defaultValue={lastname} name="lastname" />
                        </div>
                        <div className="flex flex-col pb-2">
                            <label className="font-semibold" htmlFor="profilePic">profilePic</label>
                            <input className="border rounded-md p-1" type="text" defaultValue={profilePic} name="profilePic" />
                        </div>
                        <div className="flex flex-col pb-2">
                            <label className="font-semibold" htmlFor="bio">Bio</label>
                            <input className="border rounded-md p-1" type="text" defaultValue={bio} name="bio" />
                        </div>
                        <div className="flex flex-col pb-2">
                            <label className="font-semibold" htmlFor="website">website</label>
                            <input className="border rounded-md p-1" type="text" defaultValue={website} name="website" />
                        </div>
                    </div>
                    
                </form>
            </section>
        </div>
    )
}