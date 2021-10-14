import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { Route,Routes} from "react-router-dom"
import { Posts } from './features/posts/postsLists';
import { LoginPage } from './features/users/loginUser';
import { PrivateRoute } from './features/users/privateRoute';
import {BrowserRouter as Router} from "react-router-dom"
import { RegisterPage } from './features/users/registerUser';
import { Profile } from './features/users/profile';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersData, getUserData } from './features/users/userSlice';
import { fetchPostData } from './features/posts/postsSlice';
import { EditUserProfile } from './features/users/editProfile';
import { Header } from './features/Header/header';
import { Home } from './features/Home/home';

function App() {

  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user)
  useEffect(()=>{

      if(token){
        dispatch(fetchPostData())
        // console.log("hiiiii")
        dispatch(getUserData())
        dispatch(getAllUsersData(currentUser._id))
      }
   
},[token,dispatch])

  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <PrivateRoute path="/*"  element={<Home/>}/>
          <Route path="/login"  element={<LoginPage/>}/>
          <Route path="/register"  element={<RegisterPage/>}/>
          {/* <PrivateRoute path="/profile"  element={<Profile/>}/>
          <PrivateRoute path="/:username"  element={<Profile/>}/>
          <PrivateRoute path="/editProfile"  element={<EditUserProfile/>}/> */}
        </Routes>
        {/* <LoginPage/> */}
        {/* <Posts/> */}
      </Router>
    </div>
  );
}

export default App;
