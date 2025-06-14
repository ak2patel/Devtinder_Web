import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector((store)=>store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status,_id)=>{
        try {
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
            dispatch(removeRequest(_id));
        } catch (err) {
            console.error(err);
            
        }

    }
   
    const fetchRequest = async ()=>{
        try { 
            const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
            dispatch(addRequest(res?.data?.data))
            
        } catch (err) {
            console.error(err);
            
        }
    }

    useEffect(()=>{
        fetchRequest();      
    },[])


//connection requests

 if(!requests)return;
    if(requests.length===0)return <h1 className="flex justify-center my-10">No Requests found !!!</h1>

  return (
    <div className="text-center  my-10">
        <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request)=> {
        
        const {_id,firstName,lastName,age,gender,photoUrl,about} = request.fromUserId;
        
        return ( 
         <div key={_id} className="flex justify-between item-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
            <div><img alt="photo" className="w-20 h-20 rounded-full"  src={photoUrl}/></div>
            <div className="text-left mx-4"> <h2 className="font-bold text-xl">{firstName + " "+lastName}</h2>
            {age&&gender&&<p>{age + " , "+ gender}</p>}
            <p>{about}</p></div>
             <div>
                <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",_id)}>Reject</button>
                <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",_id)}>Accept</button>
            </div>
            
            
           
         </div>
         )
        }
     )} 


    </div>
  )



//   return (
//     <div>Requests</div>
//   )
}

export default Requests