import React, { useEffect, useState } from 'react'
import Nav from '../../GeneralComponents/Nav'
import Largeheader from '../../../ElementComponents/Largeheader'
import { useDispatch, useSelector } from 'react-redux';
import { arrayRemove, collection, doc, getDocs, updateDoc } from '@firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import ScaleLoader from "react-spinners/ClipLoader";
import Subaparagraph from '../../../ElementComponents/subaparagraph';
import moment from 'moment';
import  { ImCross } from 'react-icons/im'
import Paragraphblue from '../../../ElementComponents/paragraphblue';
import Paragraph from '../../../ElementComponents/paragraph';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiX } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { clickedjob } from '../../../ReduxStore/Redux';
function JobseekerNotifications() {
    const [notifications,setnotifications]=useState()
    const jobseekerlogin=useSelector(state=>state.reducer.jobseekerloginstatus.jobseekerlogin);
    const jobseekeremaill=useSelector((state)=>state.reducer.jobseekeremailstatus.jobseekeremail);
    const [isloading,setisloading]=useState(false);
    const dispatch=useDispatch()
    const navigate=useNavigate()
const [id,setid]=useState()
    useEffect(()=>{

async function loadnotifications(){
    setisloading(true)
    const  usersCollectionRef=  collection (db,'jobseeker')
    const po=  await getDocs(usersCollectionRef)
    const  userss=  po.docs.map((i)=>{return{...i.data(),id:i.id}})
  const check= userss.find(i=>i.email==jobseekeremaill)
    if (check.notifications) {
        setid(check.id)
setnotifications(check.notifications.sort((a,b)=>b.createdAt - a.createdAt))
setisloading(false)

}
else{
    setnotifications('0')
    setisloading(false)
}

}
loadnotifications()

    },[])
async function deletenotification (i){

    const po=notifications.filter((j)=> {return j!==i})
    setnotifications(po)
    await  updateDoc(doc(db,'jobseeker',id),({notifications:arrayRemove(i)}))
    
}
function clickedjobfunction(i){
    dispatch(clickedjob(i))
navigate('/jobseekerviewjob')

}

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
    notifications=='0' ?<Paragraph text={'No notifications'}/>
    :
    notifications?.map((i)=>{
        return (
            <>
<div className='notificationsdiv'>
      <div className='notificationsdivrowsmall' style={{ alignItems: 'flex-end'}}> 
    <Subaparagraph text={moment(i.createdAt).fromNow()} />
    <BiX className='navbaricons' onClick={()=>deletenotification(i)}/>
        </div>     
        <div className='notificationsdivrow'>
        <div className='columndiv'>
        {
            i.event==="Opened" && <Paragraph text={'Your application was recently viewed.'}/>
        }
           {       
        i.event==="Rejected" && <Paragraph text={'Your application has been rejected.'}/>
    } 
        {
            i.event==="Accepted" && <Paragraph text={'Congratulations! You have been moved on to the next stage.'}/>
        }
        <Paragraphblue text={i.title}/>
        <Subaparagraph text={i.location}/>
        </div> 
        <div className='notificationsrowdivbottom' onClick={()=>clickedjobfunction(i)}> 
        <Paragraphblue text={'View job'}/>
        <AiOutlineArrowRight className='navbaricons2'/>
        </div>
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