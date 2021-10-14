import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserData, getAllUsers, getCurrentUser, loginUser, registerUser } from "./usersServices";

const initialState = {
    currentUser:{},
    allUsers:[],
    status:"idle",
    isAuthenticated:false
}

export const TokenConfig = () => {
	const token = localStorage.getItem("token");

	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}

	return config;
};
const getUserData = createAsyncThunk("user/loadUser",getCurrentUser)
const getAllUsersData = createAsyncThunk("user/loadAllUsers",getAllUsers)
const login= createAsyncThunk("user/login",loginUser)
const register = createAsyncThunk("user/register",registerUser)
const editUserProfile = createAsyncThunk("user/editUserProfile",editUserData)

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        changeStatusToSucess:(state)=>{
            state.status="fulifilled"
        }
    },
    extraReducers:{
        [getUserData.pending]:(state)=>{
            state.status="loading"
        },
        [getUserData.fulfilled]:(state,action) =>{
            // console.log(action.payload.user)
            state.currentUser = action.payload.user
            // localStorage.setItem("token",action.payload.token)
            state.status="fulfilled"
        },
        [getUserData.rejected]:(state) =>{
            localStorage.removeItem("token")
            state.status="error"
        },
        [getAllUsersData.fulfilled]:(state,action)=>{
            state.allUsers=action.payload.users
        },
        [login.fulfilled]:(state,action) =>{
            localStorage.setItem("token",action.payload.token)
            state.currentUser = action.payload.user
            state.isAuthenticated=true
        },
        [register.fulfilled]:(state,action) =>{
            localStorage.setItem("token",action.payload.token)
            state.currentUser = action.payload.user
            state.isAuthenticated=true
        },
        [editUserProfile.fulfilled]:(state,action) =>{
            state.currentUser = action.payload.user
            state.status="idle"
        }
    }
})


export const {changeStatusToSucess} = userSlice.actions
export {login,register,getUserData,getAllUsersData,editUserProfile}
export default userSlice.reducer