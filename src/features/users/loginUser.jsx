import { useEffect, useRef, useState,useReducer } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
// import { useLocation } from "react-router"
import { useNavigate } from "react-router-dom"
import { getFormValues } from "../../utils/userUtils"
import { login } from "./userSlice"

export const loginReducer  = (state,{type,payload}) =>{
    switch (type){
        case "email":
            return {
            ...state,
            emailValue: payload
            };
        case "password":
            return {
            ...state,
            passwordValue: payload
            };
        default:
            return state;
        }
}


export const LoginPage = () =>{

    // const {isAuthenticated} = useSelector(state => state.user)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        if (token) 
                navigate("/")
    },[token])
    
    const handleOnsubmit = (e) =>{
        e.preventDefault();
        const {email,password} =getFormValues(e,"login")
        dispatch(login({email,password}))
        
    }
    const inputFocused = useRef(null)
    
    useEffect(()=>{
        inputFocused.current.focus()
    },[])
    
    const [{emailValue,passwordValue},loginDispatch] = useReducer(loginReducer,{
        emailValue:"",
        passwordValue:""
    })
    // const [emailValue,setEmailValue] = useState("")
    // const [passwordValue,setPasswordValue] = useState("")
    
    return (
        <div className="flex flex-col p-4 justify-center items-center " >
            <h2 className="font-bold text-3xl">Login</h2>
            <form className="flex flex-col border border-primaryColor rounded-md p-2 mt-5 w-full" onSubmit={(e)=>handleOnsubmit(e)} >

                <div>
                <div className="flex flex-col pb-3">
                    <label className="font-semibold" htmlFor="email">email</label>
                    <input className="border-2 p-1" ref={inputFocused} 
                    onChange={(e)=>loginDispatch({type:"email",payload:e.target.value})} 
                    value={emailValue} type="text" name="email" required={true} ></input>
                </div>
                <div className="flex flex-col pb-3">
                    <label className="font-semibold" htmlFor="password">password</label>
                    <input className="border-2 p-1" 
                    onChange={(e)=>loginDispatch({type:"password",payload:e.target.value})} 
                    value={passwordValue} type="password" name="password" required={true} ></input>
                </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <button className=" p-1 px-2 min-w-min border border-primaryColor hover:bg-primaryColor rounded-md mb-4" onClick={(e)=>{
                        loginDispatch({type:"email",payload:"test@gmail.com"})
                        loginDispatch({type:"password",payload:"123456"})
                        e.preventDefault()
                        }} > test credentials</button>
                    <button className="p-1 px-2 min-w-min bg-primaryColor rounded-md " type="submit" >login</button>
                </div>
            </form>

        </div>
    )
}