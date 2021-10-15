import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addNewUserPostService, getAllPostsService, likePostService, unLikePostService } from "./postServices"

const initialState = {
    status:"idle",
    posts:[],
    likesCount:0,
    error:null
}

const fetchPostData = createAsyncThunk("posts/loadPosts",getAllPostsService)

const addNewPost = createAsyncThunk("posts/newUserPost",addNewUserPostService)

const likePost = createAsyncThunk("posts/likePost",likePostService)

const unLikePost = createAsyncThunk("posts/unlikePost",unLikePostService)

export const postSlice = createSlice(
    {
        name:"posts",
        initialState:initialState,
        reducers:{

        },
        extraReducers:{
            [fetchPostData.pending]:(state) =>{
                state.status="loading"
            },
            [fetchPostData.fulfilled]:(state,action) =>{
                state.status="fulfilled"
                state.posts = action.payload.posts
                
            },
            [fetchPostData.rejected]:(state,action) =>{
                state.status="error"
                state.posts = action.payload.error
            },
            [addNewPost.fulfilled]:(state,action)=>{
                state.status = "fulfilled"
                state.posts = action.payload.posts
            },
            [likePost.fulfilled]:(state,action)=>{
               
                state.posts = action.payload.posts
            },
            [likePost.rejected]:(state,action)=>{
                state.status = "error"
                localStorage.removeItem("token")
                state.posts = action.payload.posts
            },
            [unLikePost.fulfilled]:(state,action)=>{
                
                state.posts = action.payload.posts
            },
            [unLikePost.rejected]:(state,action)=>{
                
                state.status = "error"
                localStorage.removeItem("token")
                state.posts = action.payload.posts
            },
            
            
        }
    }
)

export {fetchPostData,addNewPost,likePost,unLikePost}
export default postSlice.reducer