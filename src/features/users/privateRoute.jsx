import { Navigate, Route } from "react-router-dom"


export const PrivateRoute = ({path,...props}) =>{

    const token = localStorage.getItem("token")
    
    return(

        token?
        <Route path={path} {...props} />
        :
        <Navigate state={{from:path}} replace to="/login"/>
    )
}