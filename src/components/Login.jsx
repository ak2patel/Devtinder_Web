import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
  
  const [emailId,setEmailId]= useState("ankit@gmail.com");
  const [password,setPassword]= useState("Password@123");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async ()=>{
   try{const res = await axios.post(BASE_URL+"/login",{
      emailId,
      password
    },{withCredentials:true})
    // console.log("login succesful")
    // console.log(res.data);
    dispatch(addUser(res.data));
    navigate("/");
  }catch(err){
    console.error(err);
    console.error("Login failed:", err.response?.data || err.message);
    alert("Login failed. Please check your credentials.");
  }

  } 

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" 
              id="email"
              name="email"
                value = {emailId}
              className="input" 
              onChange={(e)=>setEmailId(e.target.value)}
              placeholder="Enter e-mail" />
            </fieldset>
             <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input type="password"
               id="password"
               name="password"
              value={password}
              className="input"
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter Password" 
              />
            </fieldset>


          </div>
          <div
            className="card-actions justify-center
     "
          >
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
