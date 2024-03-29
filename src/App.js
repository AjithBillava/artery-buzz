import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { Route,Routes} from "react-router-dom"
import { LoginPage } from './features/users/loginUser';
import { PrivateRoute } from './features/users/privateRoute';
import {BrowserRouter as Router} from "react-router-dom"
import { RegisterPage } from './features/users/registerUser';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersData, getUserData, getUserNotification } from './features/users/userSlice';
import { fetchPostData } from './features/posts/postsSlice';
import { Header } from './features/Header/header';
import { Home } from './features/Home/home';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user)
  useEffect(()=>{

      if(token){
        dispatch(fetchPostData())
        // (currentUser._id)
        dispatch(getUserData())
        // dispatch(getUserNotification(currentUser._id))
        dispatch(getAllUsersData(currentUser._id))
      }
   
},[token,dispatch])

toast.configure()

  return (
    <div className="sm:text-lg md:text-xl">
      <Router>
        <Header/>
        <ToastContainer/>
        <Routes>
          <PrivateRoute path="/*"  element={<Home/>}/>
          <Route path="/login"  element={<LoginPage/>}/>
          <Route path="/register"  element={<RegisterPage/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
