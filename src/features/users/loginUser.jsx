import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getFormValues } from "../../utils/userUtils"
import { login } from "./userSlice"


export const LoginPage = () =>{

    // const {isAuthenticated} = useSelector(state => state.user)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     if (token) 
    //             navigate("/")
    // },[token])
    
    const handleOnsubmit = (e) =>{
        e.preventDefault();
        const {email,password} =getFormValues(e,"login")
        dispatch(login({email,password})).then(()=>navigate("/"))
        
    }
    const inputFocused = useRef(null)
    
    useEffect(()=>{
        inputFocused.current.focus()
    },[])
    
   
    
    return (
        <div className="flex flex-col p-4 justify-center items-center md:border-2 md:border-gray-200 md:m-5 rounded-md md:p-5 lg:mx-40 md:px-10 lg:px-20 " >
            <h2 className="font-bold text-3xl">Login</h2>
            <form className="flex flex-col border border-primaryColor rounded-md p-2 mt-5 w-full" onSubmit={(e)=>handleOnsubmit(e)} >

                <div>
                <div className="flex flex-col pb-3">
                    <label className="font-semibold" htmlFor="email">Email</label>
                    <input className="border-2 p-1 outline-none" ref={inputFocused} 
                    type="text" name="email" required={true} ></input>
                </div>
                <div className="flex flex-col pb-3">
                    <label className="font-semibold" htmlFor="password">Password</label>
                    <input className="border-2 p-1  outline-none" 
                    type="password" name="password" required={true} ></input>
                </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <button className=" p-1 px-2 min-w-min border border-primaryColor hover:bg-primaryColor rounded-md mb-4" onClick={(e)=>{
                        e.target.form[0].value = "test@gmail.com";
                        e.target.form[1].value = "123456"
                        }} > test credentials</button>
                    <button className="p-1 px-2 min-w-min bg-primaryColor rounded-md " type="submit" >login</button>
                </div>
                <div className="flex justify-center mt-5 text-lg" >
                    <p className="text-gray-600">Not registered yet?</p>
                    <Link to="/register" className="text-blue-900 underline" >Register here </Link>
                </div>
            </form>

        </div>
    )
}