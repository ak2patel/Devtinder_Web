import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
  
  const [emailId,setEmailId]= useState("");
  const [password,setPassword]= useState("");
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [isLoginForm,setIsLoginForm]=useState(true);

  const [error,setError] = useState("")
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL+"/signup",{
      emailId,
      password,
      firstName,
      lastName,
    },{withCredentials:true})
      
    dispatch(addUser(res?.data?.data));
    navigate("/profile");
  }catch(err){
    console.error(err);
    setError(err?.response?.data || "something went wrong");
  }
  }

  const handleLogin = async ()=>{
   try{const res = await axios.post(BASE_URL+"/login",{
      emailId,
      password
    },{withCredentials:true})
    dispatch(addUser(res.data));
    navigate("/");
  }catch(err){
    console.error(err);
    setError(err?.response?.data || "something went wrong");
  }

  } 

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm?"Login":"Sign Up"}</h2>
          <div>

            {!isLoginForm&& <><fieldset className="fieldset my-2">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" 
              id="firstName"
              name="firstName"
                value = {firstName}
              className="input" 
              onChange={(e)=>setFirstName(e.target.value)}
              placeholder="Enter First Name" />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" 
              id="lastName"
              name="lastName"
                value = {lastName}
              className="input" 
              onChange={(e)=>setLastName(e.target.value)}
              placeholder="Enter Last Name" />
            </fieldset> </> }
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
          <p className="text-red-500">{error}</p>
          <div
            className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm? handleLogin:handleSignUp}>{isLoginForm?"Login":"Sign Up"}</button>
          </div>
          <p className="m-auto cursor-pointer py-2" onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm?"New User? SignUp here":"Existing User ? Login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
