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
import EmployerNav from './EmployerNav';
function EmployerNotifications() {
    const [notifications,setnotifications]=useState()
    const jobseekerlogin=useSelector(state=>state.reducer.employerloginstatus.employerlogin);
    const jobseekeremaill=useSelector((state)=>state.reducer.employeremailstatus.employeremail.email);
    const [isloading,setisloading]=useState(false);
    const dispatch=useDispatch()
    const navigate=useNavigate()
const [id,setid]=useState()

    useEffect(()=>{
        async function loadnotifications(){
    setisloading(true)
    const  usersCollectionRef=  collection (db,'employer')
    const po=  await getDocs(usersCollectionRef)
    const  userss=  po.docs.map((i)=>{return{...i.data(),id:i.id}})
  const check= userss.find(i=>i.email==jobseekeremaill)
    if (check) {
        setid(check.id)
setnotifications(check?.notifications?.sort((a,b)=>b.createdAt - a.createdAt))
setisloading(false)
}
}

loadnotifications()
    },[])
async function deletenotification (i){
    const po=notifications.filter((j)=> {return j!==i})
    setnotifications(po)
    await  updateDoc(doc(db,'employer',id),({notifications:arrayRemove(i)}))
}
function clickedjobfunction(i){
    dispatch(clickedjob(i))
navigate( `/employerhome/employerdashboard/${i.title}`)

}

  return (
<>
<EmployerNav/>
<div className='notificationslargediv' style={{marginTop:'0px'}}>
    {
        isloading ?
        <ScaleLoader/>
        :
    
<div className='notificationssublargediv'>
<Largeheader text={'Notifications'}/>
{
    notifications &&
    notifications?.length==0 || notifications==null ?<Paragraph text={'No notifications'}/>
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
            i.event==="Application" && <Paragraph text={'New applicant.'}/>
        }
           {       
        i.event==="Rejected" && <Paragraph text={'Your application has been rejected.'}/>
    } 
        {
            i.event==="Accepted" && <Paragraph text={'Congratulations! You have been moved on to the next stage.'}/>
        }
        <Paragraphblue text={i.title}/>
        <Subaparagraph text={i.email}/>
        </div> 
        <div className='notificationsrowdivbottom' onClick={()=>clickedjobfunction(i.jobft)}> 
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

export default EmployerNotifications