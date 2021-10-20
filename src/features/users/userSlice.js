import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  editUserDataService,  followUserService,  getAllUsersService,  getCurrentUserService,  getUserNotificationService,  loginUserService,  readUserNotificationService,  registerUserService, unFollowUserService } from "./usersServices";
import { toast } from "react-toastify";

const initialState = {
    currentUser:{},
    notifications:[],
    allUsers:[],
    status:"idle",
    notificationStatus:"idle",
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
            state.currentUser = action.payload.user
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
            state.notificationStatus="loading"
        },
        [getUserNotification.fulfilled]:(state,action)=>{
            state.notifications = action.payload.notifications
            state.notificationStatus="fulfilled"
        },
        [readUserNotification.pending]:(state)=>{
            state.notificationStatus="loading"
        },
        [readUserNotification.fulfilled]:(state,action)=>{
            state.notifications = action.payload.notifications
            state.notificationStatus="fulfilled"
        },
        
        [login.fulfilled]:(state,action) =>{
            localStorage.setItem("token",action.payload.token)
            state.currentUser = action.payload.user
            state.isAuthenticated=true
            toast.success("Logged in sucessfully", {
                style: { backgroundColor: "##15b996" },
                autoClose: 2000,
                hideProgressBar: true,
                    });
        },
        [login.rejected]:(state,action)=>{
            state.status="error"
            toast.error(" incorrect email or Password", {
				style: { backgroundColor: "##15b996", letterSpacing: "0.8px" },
				autoClose: 2000,
				hideProgressBar: true,
			});
        },
        // [register.fulfilled]:(state,action) =>{
        //     localStorage.setItem("token",action.payload.token)
        //     state.currentUser = action.payload.user
        //     state.isAuthenticated=true
        // },
        // [register.rejected]:(state,action) =>{
        //     state.status="error"
        //     toast.error("Incorrect email or password", {
		// 		style: { backgroundColor: "var(--error-color)", letterSpacing: "0.8px" },
		// 		autoClose: 2000,
		// 		hideProgressBar: true,
		// 	});
        // },
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