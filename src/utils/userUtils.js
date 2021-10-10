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
        default:{
            return new Error("Invalid selection")
        }
    }
}