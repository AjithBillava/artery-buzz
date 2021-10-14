import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFormValues } from "../../utils/userUtils"
import { Avatar } from "../Header/avatar"
import { addNewPost } from "./postsSlice"

export const NewPost = ({btnStyle,btnText}) =>{

    const [showNewPostForm,setShowNewPostForm] = useState(false)
    const {status} = useSelector(state=>state.user)

    return(
        <>
            {status==="loading"&& <h2>loading</h2> }

            {/* <button className="p-2 flex bg-gray-100 rounded-md "> */}
            <button  onClick={()=>setShowNewPostForm(true)} className={`${btnStyle}`}>
                {btnText}
            </button>
            {showNewPostForm && <NewPostForm toggleModalView ={setShowNewPostForm}/>}
        </>
    )
}

const NewPostForm =({toggleModalView})=>{

    const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.user)
    const {firstname,lastname,profilePic,username} = currentUser || {}

    const inputFocused = useRef(null)
    
    useEffect(()=>{
        inputFocused.current.focus()
    },[])

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        const userId=currentUser._id
        const {content} = getFormValues(e,"newUserPost")
        dispatch(addNewPost({userId,content}))
        // dispatch(editUserProfile({userId,...rest}))
        // .then(user=>navigate("/profile"))
    }
    return(
        <div className=" flex flex-col items-center w-screen fixed justify-center top-0 left-0 bg-black bg-opacity-75 backdrop-filter backdrop-blur-sm h-screen z-10 p-2" >
            <section className="bg-white flex flex-col p-4 w-full rounded-md relative ">
                
                <form onSubmit={(e)=>handleOnSubmit(e)} >
                    <div className="flex justify-between items-center my-2">
                        <button className="p-2 bg-gray-100 rounded-md " onClick={()=>toggleModalView(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <section className="flex flex-row" >
                        <div>
                            <Avatar firstname={firstname} lastname={lastname} profilePic={profilePic} username={username}/>
                        </div>
                        <input ref={inputFocused} placeholder="Share your story..." name="content" className="flex flex-col w-full p-4 text-xl outline-none">

                        </input>

                    </section>
                    <button className="p-1 px-2 flex bg-primaryColor rounded-md " type="submit">submit</button>

                </form>
            </section>
        </div>
    )
}