import React from 'react'
import { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName,setFirstName]= useState(user.firstName);
    const [lastName,setLastName]= useState(user.lastName);
    const [photoUrl,setPhotoUrl]= useState(user.photoUrl);
    const [age,setAge]= useState(user.age);
    const [gender,setGender]= useState(user.gender);
    const [about,setAbout]= useState(user.about);
    const [error,setError] = useState("")
    
    const dispatch = useDispatch();
    const [showToast,setshowToast]=useState(false)
    const saveProfile = async ()=>{
        setError("");
        try {
            const res = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,photoUrl,about},{withCredentials:true});
            dispatch(addUser(res?.data?.data));
            setshowToast(true);
            const i = setInterval(() => {setshowToast(false)},3000);
            
        }catch (err){
            setError(err.response.data);            
        }
    }
    
  return (<>
    <div className="flex justify-center my-10">
    
    <div className="flex justify-center mx-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" 
              id="firstName"
              name="firstName"
                value = {firstName}
              className="input" 
            onChange={(e)=>setFirstName(e.target.value)}
              placeholder="Enter first name" />
            </fieldset>

             <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text"
               id="lastName"
               name="lastName"
              value={lastName}
              className="input"
              onChange={(e)=>setLastName(e.target.value)}
              placeholder="Enter Password" 
              />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Photo URL</legend>
              <input type="text"
               id="photoUrl"
               name="photoUrl"
              value={photoUrl}
              className="input"
              onChange={(e)=>setPhotoUrl(e.target.value)}
              placeholder="Enter Photo URL" 
              />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Age</legend>
              <input type="text"
               id="age"
               name="age"
              value={age}
              className="input"
              onChange={(e)=>setAge(e.target.value)}
              placeholder="Enter Age" 
              />

            </fieldset><fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Gender</legend>
              <input type="text"
               id="gender"
               name="gender"
              value={gender}
              className="input"
              onChange={(e)=>setGender(e.target.value)}
              placeholder="Enter Gender" 
              />

            </fieldset><fieldset className="fieldset my-2">
              <legend className="fieldset-legend">About</legend>
              <input type="text"
               id="about"
               name="about"
              value={about}
              className="input"
              onChange={(e)=>setAbout(e.target.value)}
              placeholder="Enter About" 
              />
            </fieldset>

          </div>
          <p className="text-red-500">{error}</p>
          <div
            className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
    </div>

    <UserCard user={{firstName,lastName,age,gender,photoUrl,about}}/>

    </div>
    <div className="toast toast-top toast-center">
  {showToast&&<div className="alert alert-success">
    <span>Profile edited successfully.</span>
  </div>}
</div>
    </>
  
  )
}

export default EditProfile