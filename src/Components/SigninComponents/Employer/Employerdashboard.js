import { collection, getDocs } from '@firebase/firestore'
import { check } from 'prettier'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../../ElementComponents/Header'
import Paragraph from '../../../ElementComponents/paragraph'
import Paragraphblue from '../../../ElementComponents/paragraphblue'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import { db } from '../../../Firebase/Firebase'
import './employer.css'
import EmployerNav from './EmployerNav'

function EmployerDashboard() {
  const login=useSelector(state=>state.reducer.employerloginstatus.employerlogin);
  const email=useSelector(state=>state.reducer.employeremailstatus.employeremail.email);
  const [jobinfo,setjobinfo]=useState()
  const [loggedout,setloggedout]=useState(false)
  useEffect(()=>{
async function details(){
  const  usersCollectionRef= await collection (db,'employer')
  const po=  await getDocs(usersCollectionRef)
  const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
await  console.log(userss);
const check= await userss.find(i=>i.email==email)
  if (check) {
    setloggedout(true);
    setjobinfo(check);
    console.log(jobinfo);
}
else {
  setloggedout(false)
}
}
details()
  },[])
  return (
<>
<EmployerNav/>
{
  loggedout==false ?
  
  <Header text={'loading'}/>
  :
<div className='largedivpostjob'>
  {
jobinfo ?
jobinfo.jobpostings.map((i)=>{
return(
  <>
  <div className='postjobsubdiv'>
<div className='columndiv'>
<Paragraphblue text={i.title}/>
<Subaparagraph text={i.location}/>
<Subaparagraph text={'Created:'+i.createdAt}/>
  </div>
</div>
  </>
  ) 
})
: <></>
  }
</div>

}
</>
    )
}

export default EmployerDashboard;