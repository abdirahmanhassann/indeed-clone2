import React, { useEffect, useState } from 'react'
import Nav from '../../GeneralComponents/Nav'
import Largeheader from '../../../ElementComponents/Largeheader'
import { useSelector } from 'react-redux';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import ScaleLoader from "react-spinners/ClipLoader";
import Subaparagraph from '../../../ElementComponents/subaparagraph';
import moment from 'moment';
import  { ImCross } from 'react-icons/im'
import Paragraphblue from '../../../ElementComponents/paragraphblue';
import Paragraph from '../../../ElementComponents/paragraph';
function JobseekerNotifications() {
    const [notifications,setnotifications]=useState()
    const jobseekerlogin=useSelector(state=>state.reducer.jobseekerloginstatus.jobseekerlogin);
    const jobseekeremaill=useSelector((state)=>state.reducer.jobseekeremailstatus.jobseekeremail);
    const [isloading,setisloading]=useState(false);

    useEffect(()=>{
async function loadnotifications(){
    setisloading(true)
    const  usersCollectionRef=  collection (db,'jobseeker')
    const po=  await getDocs(usersCollectionRef)
    const  userss=  po.docs.map((i)=>{return{...i.data(),id:i.id}})
  const check= userss.find(i=>i.email==jobseekeremaill)
    if (check) {
        
setnotifications(check.notifications.sort((a,b)=>b.createdAt - a.createdAt))
setisloading(false)
console.log(notifications)
  }
}
loadnotifications()

    },[])
  return (
<>
<Nav/>
<div className='notificationslargediv'>
    {
        isloading ?
        <ScaleLoader/>
        :
    
<div className='notificationssublargediv'>
<Largeheader text={'Notifications'}/>
{
    notifications &&
    notifications.map((i)=>{
        return (
            <>
<div className='notificationsdiv'>
      <div className='notificationsdivrow'>
    <Subaparagraph text={moment(i.createdAt).fromNow()} />
    <ImCross className='navbaricons'/>
        </div>     
        <div className='columndiv'>
        {
            i.event==="Opened" && <Paragraph text={'Your application was recently viewed.'}/>
        }
           {       
        i.event==="Rejected" && <Paragraph text={'Your application has been rejected.'}/>
    } 
        {
            i.event==="Accepted" && <Paragraph text={'Congratulations! You have moved on to the next stage.'}/>
            
        }
        <Paragraphblue text={i.title}/>
        <Subaparagraph text={i.location}/>
        </div> 
</div>
            </>
        )
    })
    }

</div>
}
</div>
</>

    )
}

export default JobseekerNotifications