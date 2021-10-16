export const getFormValues = (event,type) =>{
    switch(type){
        case "login":{
            const {
                email:{value:email},
                password:{value:password}
            } = event.target

            return {email,password}
        }
        case "register":{
            const {
                firstname:{value:firstname},
                lastname:{value:lastname},
                username:{value:username},
                email:{value:email},
                password:{value:password},
                confirmPassword:{value:confirmPassword}
            } = event.target

            return {firstname,lastname,email,username,password,confirmPassword}
        }
        case "editUserProfile":{
            const {
                firstname:{value:firstname},
                lastname:{value:lastname},
                profilePic:{value:profilePic},
                bio:{value:bio},
                website:{value:website},
            } = event.target

            return {firstname,lastname,profilePic,bio,website}
        }
        case "newUserPost":{
            const{
                content:{value:content} 
            }= event.target
            return{content}
        }
        default:{
            return new Error("Invalid selection")
        }
    }
}
export  const checkIfFollowing=(myFollowings, userProfileId)=>{
    return myFollowings?.find(user=>user?._id===userProfileId)
}

export const handleOnFollow =(e,userId,followedUserId,dispatch,followUser)=>{
    e.preventDefault()
    dispatch(followUser({userId,followedUserId}))
}
export const handleOnUnfollow =(e,userId,unfollowedUserId,dispatch,unFollowUser)=>{
    e.preventDefault()
    dispatch(unFollowUser({userId,unfollowedUserId}))
}