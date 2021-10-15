import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  editUserDataService,  followUserService,  getAllUsersService,  getCurrentUserService,  getUserNotificationService,  loginUserService,  readUserNotificationService,  registerUserService, unFollowUserService } from "./usersServices";

const initialState = {
    currentUser:{},
    notifications:[],
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
const getUserData = createAsyncThunk("user/loadUser",getCurrentUserService)
const getAllUsersData = createAsyncThunk("user/loadAllUsers",getAllUsersService)
const getUserNotification = createAsyncThunk("user/notifications",getUserNotificationService)
const readUserNotification = createAsyncThunk("user/readNotification",readUserNotificationService)
const login= createAsyncThunk("user/login",loginUserService)
const register = createAsyncThunk("user/register",registerUserService)
const editUserProfile = createAsyncThunk("user/editUserProfile",editUserDataService)
const followUser = createAsyncThunk("user/follow",followUserService)
const unFollowUser = createAsyncThunk("user/unFollow",unFollowUserService)


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
        [getUserNotification.pending]:(state)=>{
            state.status="loading"
        },
        [getUserNotification.fulfilled]:(state,action)=>{
            state.notifications = action.payload.notifications
            state.status="fulfilled"
        },
        [readUserNotification.pending]:(state)=>{
            state.status="loading"
        },
        [readUserNotification.fulfilled]:(state,action)=>{
            state.notifications = action.payload.notifications
            state.status="fulfilled"
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
        },
        [followUser.fulfilled]:(state,action)=>{
            state.currentUser = action.payload.user
            state.status = "idle"
        },
        [unFollowUser.fulfilled]:(state,action)=>{
            state.currentUser = action.payload.user
            state.status = "idle"
        }
    }
})


export const {changeStatusToSucess} = userSlice.actions
export {login,register,getUserData,getAllUsersData,editUserProfile,followUser,unFollowUser,getUserNotification
    ,readUserNotification}
export default userSlice.reducer