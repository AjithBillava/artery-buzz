import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserData, getCurrentUser, loginUser, registerUser } from "./usersServices";

const initialState = {
    currentUser:{},
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
const login= createAsyncThunk("user/login",loginUser)
const register = createAsyncThunk("user/register",registerUser)
const editUserProfile = createAsyncThunk("user/editUserProfile",editUserData)

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{},
    extraReducers:{
        [getUserData.pending]:(state)=>{
            state.status="loading"
        },
        [getUserData.fulfilled]:(state,action) =>{
            state.currentUser = action.payload.user
            state.status="fulfilled"
        },
        [getUserData.rejected]:(state) =>{
            state.status="error"
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
        }
    }
})


export {login,register,getUserData,editUserProfile}
export default userSlice.reducer