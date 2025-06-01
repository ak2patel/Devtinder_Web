import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard"
import axios from "axios";

// const Feed = () => {
//   const feed = useSelector((store)=>store.feed);
//   const dispatch = useDispatch();

//  const getFeed = async ()=>{
//    if(feed && feed.length > 0)return;
//   try{
    
//     const res = await axios.get(BASE_URL+"/feed",{
//       withCredentials:true,
//     });

 
//     dispatch(addFeed(res.data))

//    }catch(err){
//       console.error("Error in getting feed", err?.response?.data || err.message);
 
//    }

// }

// useEffect(()=>{
//    getFeed();
// },[]);
// //console.log(feed)
//   return (
//   (feed &&<div className="flex justify-center my-10">
//     <UserCard user={feed[0]} />
//     </div>))
// };



const Feed = ()=>{
  const feed = useSelector((store)=>store.feed);
  //console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () =>{
    if(feed && feed.length > 0)return;
    try{const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
    //console.log(res);
    dispatch(addFeed(res.data.users));
    }catch(err){
      console.error(err);
      }

  }

  useEffect(()=>{getFeed();},[])

    if (!feed || feed.length === 0 || !feed[0]) {
    return <div className="text-center mt-10 text-gray-500">Loading feed...</div>;
  }

  return(feed &&  <div className="flex justify-center my-10">
    <UserCard  user={feed[0]}/>
  </div>)
 

 

}



export default Feed;