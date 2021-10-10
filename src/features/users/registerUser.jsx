import { useEffect } from "react"
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { register } from "./userSlice"
import { getFormValues } from "../../utils/userUtils"

export const  RegisterPage = () =>{
    
    const {status,isAuthenticated} = useSelector(state =>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handelOnSubmit =(e) =>{
        e.preventDefault()
        const {email,password,confirmPassword,firstname,lastname,username,} = getFormValues(e,"register")
        // console
        if (confirmPassword && confirmPassword === password){
            dispatch(register({email,password,firstname,lastname,username,}))
        }
    }
    useEffect(()=>{
        if (isAuthenticated) 
                navigate("/")
    },[isAuthenticated])
return(
        <div>
            {status==="loading" && <h2>loading</h2> }
            {status==="error" && <h2>error</h2>}

            <form onSubmit={(e)=>handelOnSubmit(e)} >

                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="firstname" />
                </div>
                <div>
                    <label htmlFor="lastname">Last name</label>
                    <input type="text" name="lastname" />
                </div> 
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="Password" name="confirmPassword" />
                </div>

                <button type="submit" >Submit </button>
                

            </form>
        </div>
    )
}