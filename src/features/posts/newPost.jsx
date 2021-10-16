import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFormValues } from "../../utils/userUtils"
import { Avatar } from "../Header/avatar"
import { LoaderComponent } from "../loader/loader"
import { addNewPost } from "./postsSlice"

export const NewPost = ({btnStyle,btnText}) =>{

    const [showNewPostForm,setShowNewPostForm] = useState(false)
    const {status} = useSelector(state=>state.user)

    return(
        <>
            {status==="loading"&& <LoaderComponent/> }

            <button  onClick={()=>setShowNewPostForm(true)} className={`${btnStyle}`}>
                {btnText}
            </button>
            {showNewPostForm && <NewPostModal toggleModalView ={setShowNewPostForm}/>}
        </>
    )
}

const NewPostModal=({toggleModalView})=>{

    return(
        <div className=" flex flex-col w-screen fixed justify-center top-0 left-0 bg-black bg-opacity-75 backdrop-filter backdrop-blur-sm h-screen z-10 p-10" >
            <NewPostForm type="Mobile" toggleModalView={toggleModalView}/>
        </div>
    )
}
export const NewPostForm = ({toggleModalView,type})=>{
    
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.user)
    const {firstname,lastname,profilePic,username} = currentUser || {}

    const inputFocused = useRef(null)
    const [postContent,setPostContent] = useState("")
    useEffect(()=>{
        inputFocused?.current?.focus()
    },[])

    const handleOnSubmit = (e,toggleModalView) =>{
        e.preventDefault()
        const userId=currentUser._id
        const {content} = getFormValues(e,"newUserPost")
        dispatch(addNewPost({userId,content}))
        setPostContent("")
        toggleModalView && toggleModalView(false)
        
    }
    return(
        <div >
            <section className="bg-white border-2 border-gray-200 mb-1 flex flex-col p-4 w-full rounded-md relative ">
                
                <form onSubmit={(e)=>handleOnSubmit(e,toggleModalView)} >
                    <div className="flex justify-between items-center my-2">
                        <button className="p-2 bg-gray-100 rounded-md md:hidden " onClick={()=>toggleModalView(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <section className="flex flex-row" >
                        <div>
                            <Avatar firstname={firstname} lastname={lastname} profilePic={profilePic} username={username}/>
                        </div>
                        {
                            type && type==="Mobile"?
                            <textarea value={postContent} onChange={(e)=>setPostContent(e.target.value)} ref={inputFocused} placeholder="Share your story..." name="content" className="flex flex-col w-full p-4 text-xl outline-none">

                            </textarea>:
                            <textarea value={postContent} onChange={(e)=>setPostContent(e.target.value)} placeholder="Share your story..." name="content" className="flex flex-col w-full p-4 text-xl outline-none">

                            </textarea>
                        }
                        
                    </section>
                    <div className="flex flex-col items-end mt-5 ml-5 ">
                        <button className="p-1 px-2 flex bg-primaryColor rounded-md " type="submit">POST</button>
                    </div>

                </form>
            </section>
        </div>
    )
}