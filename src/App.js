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
import { useDispatch } from 'react-redux';
import { getUserData } from './features/users/userSlice';
import { fetchPostData } from './features/posts/postsSlice';
import { EditUserProfile } from './features/users/editProfile';
import { Header } from './features/Header/header';

function App() {

  const token = localStorage.getItem("token")
  const dispatch = useDispatch()

  useEffect(()=>{

//     if(token!==null){
//       dispatch(fetchPostData())
//       dispatch(getUserData())
// }
  
   
    // (async()=>{
      if(token){
        dispatch(fetchPostData())
        // console.log("hiiiii")
        dispatch(getUserData())
}
    // })()
    // let isMounted=false
    // if(isMounted){
    //         dispatch(fetchPostData())
    //         dispatch(getUserData())
    // }
    // return isMounted=true
},[token,dispatch])

  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <PrivateRoute path="/"  element={<Posts/>}/>
          <Route path="/login"  element={<LoginPage/>}/>
          <Route path="/register"  element={<RegisterPage/>}/>
          <PrivateRoute path="/profile"  element={<Profile/>}/>
          <PrivateRoute path="/editProfile"  element={<EditUserProfile/>}/>
        </Routes>
        {/* <LoginPage/> */}
        {/* <Posts/> */}
      </Router>
    </div>
  );
}

export default App;
