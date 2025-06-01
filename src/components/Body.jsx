import React, { useEffect } from 'react'
import Navbar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store)=> store.user);

  const fetchUser = async()=>{
  if(userData) return;
    try{   
    const res = await axios.get(BASE_URL+"/profile/view",{
      withCredentials:true,
    });
    dispatch(addUser(res.data));
  
}catch(err){
  if(err.response?.status==401){
  navigate("/login")}
  //  if (!userData || Object.keys(userData).length === 0) {
  //     fetchUser()
  //   }
  //navigate("/login")
  console.error(err);
}
};
 
  useEffect(()=>{
    //  if(!userData){
    //   fetchUser();
    //    } 
   fetchUser();

  },[])

  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-grow"><Outlet /></main>
        <Footer/>
    </div>
  )
}

export default Body