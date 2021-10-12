import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
// import { useLocation } from "react-router"
import { useNavigate } from "react-router-dom"
import { getFormValues } from "../../utils/userUtils"
import { login } from "./userSlice"

export const LoginPage = () =>{

    const {status,isAuthenticated} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        if (isAuthenticated) 
                navigate("/")
    },[isAuthenticated])
    
    const handelOnsubmit = (e) =>{
        e.preventDefault();
        const {email,password} =getFormValues(e,"login")
        dispatch(login({email,password}))
        
    }
    // console.log(isAuthenticated)
    
    return (
        <div>
            {status==="loading" && <h2>loading</h2> }
            {status==="error" && <h2>error</h2> }
            <form onSubmit={(e)=>handelOnsubmit(e)} >

                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" required={true} ></input>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" required={true} ></input>
                </div>
                <button type="submit" >login</button>
            </form>

        </div>
    )
}