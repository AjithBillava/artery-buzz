import { useEffect, useRef } from "react"
import { useDispatch} from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { register } from "./userSlice"
import { getFormValues } from "../../utils/userUtils"
import { toast } from "react-toastify";

const validatePassword =({password,confirmPassword})=>{
    
    if (confirmPassword && confirmPassword !== password) {
        toast.error(" Password does not match", {
            style: { backgroundColor: "##15b996", letterSpacing: "0.8px" },
            autoClose: 2000,
            hideProgressBar: true,
        });
        return false
    }
    return true
}
export const  RegisterPage = () =>{
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handelOnSubmit =(e) =>{
        e.preventDefault()
        const {email,password,confirmPassword,firstname,lastname,username,} = getFormValues(e,"register")
        console.log(email,password,confirmPassword,firstname,lastname,username)
        if (validatePassword({password,confirmPassword})){
            dispatch(register({email,password,firstname,lastname,username,})).then((data)=>data?.user && navigate("/login"))
        }
    }
     const inputFocused = useRef(null)
    
    useEffect(()=>{
        inputFocused.current.focus()
    },[])
return(
        <div className="flex flex-col p-4 justify-center items-center md:border-2 md:border-gray-200 md:m-5 rounded-md md:p-5 lg:mx-40 md:px-10 lg:px-20 " >
            <h2 className="font-bold text-3xl">Register</h2>

            <form className="flex flex-col border border-primaryColor rounded-md p-2 mt-5 w-full" onSubmit={(e)=>handelOnSubmit(e)} >

                <div className="flex flex-col pb-3">
                    <label className="font-semibold " htmlFor="firstname">First Name</label>
                    <input  ref={inputFocused} className="border-2 p-1  outline-none"  type="text" name="firstname" />
                </div>
                <div className="flex flex-col pb-3">
                    <label className="font-semibold " htmlFor="lastname">Last name</label>
                    <input  className="border-2 p-1 outline-none" type="text" name="lastname" />
                </div> 
                <div className="flex flex-col pb-3">
                    <label className="font-semibold " htmlFor="username">Username</label>
                    <input  className="border-2 p-1 outline-none" type="text" name="username" />
                </div>
                <div className="flex flex-col pb-3">
                    <label className="font-semibold " htmlFor="email">Email</label>
                    <input  className="border-2 p-1 outline-none" type="text" name="email" />
                </div>
                <div className="flex flex-col pb-3">
                    <label className="font-semibold " htmlFor="password">Password</label>
                    <input required className="border-2 p-1 outline-none" type="password" name="password" />
                </div>
                <div className="flex flex-col pb-3">
                    <label className="font-semibold " htmlFor="confirmpassword">Confirm Password</label>
                    <input required className="border-2 p-1 outline-none" type="password" name="confirmPassword" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <button  className="p-1 px-2 min-w-min bg-primaryColor rounded-md " type="submit" >Submit </button>
                </div>
                <div className="flex justify-center mt-5 text-lg" >
                    <p className="text-gray-600">Already registered ?</p>
                    <Link to="/login" className="text-blue-900 underline" >Login here </Link>
                </div>

            </form>
        </div>
    )
}