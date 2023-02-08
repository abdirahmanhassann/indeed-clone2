import { arrayRemove, collection, doc, getDocs, updateDoc } from '@firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BlueButton from '../../../ElementComponents/bluebutton'
import Header from '../../../ElementComponents/Header'
import InverseButton from '../../../ElementComponents/InverseButton'
import Largeheader from '../../../ElementComponents/Largeheader'
import Paragraph from '../../../ElementComponents/paragraph'
import Paragraphblue from '../../../ElementComponents/paragraphblue'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import { db } from '../../../Firebase/Firebase'
import Nav from '../../GeneralComponents/Nav';
import ScaleLoader from "react-spinners/ClipLoader";

import './Jobseeker.css'
function JobseekerApplications() {
    const jobseekerlogin=useSelector(state=>state.reducer.jobseekerloginstatus.jobseekerlogin);
    const jobseekeremaill=useSelector((state)=>state.reducer.jobseekeremailstatus.jobseekeremail);
    const [isloading,setisloading]=useState(false);
    const [info,setinfo]=useState()
    const[ischange,setischange]=useState(false);
    useEffect(()=>{
        async function details(){
          setisloading(true)
          const  usersCollectionRef= await collection (db,'jobseeker')
          const po=  await getDocs(usersCollectionRef)
          const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
        await  console.log(userss);
        const check= await userss.find(i=>i.email==jobseekeremaill)
          if (check) {
console.log(check)
setinfo(check)
setisloading(false)
        }
    }
 details()   
},[ischange])


  return (
<>
<Nav/>
{
jobseekerlogin==false ?
<Largeheader text={'please login'}/>
:
isloading ? 
<div className="loader" style={{justifySelf:'center'}}><ScaleLoader
 size={150}
 margin={'auto'}
 color={'#2557a7'}
 borderwidth= {'7px'}
 
/></div>
    :

<div className='largedivapp' style={{background:'white',width:'84%'}}>
{/* <<h1 className='headerjobapplication'>Find jobs</h1> */}
<div className='columndiv'>
<Largeheader text={'My jobs'}/>
</div>
{
    info &&
info.jobpostings.map((i)=>{
    const timeago=moment(i.createdAt).fromNow();
    return(
<>
<div className='postjobsubdiv' style={{borderBottom:'1px solid lightgray'}}>
<div className='columndiv'>
<Header text={i.title} style={{margin:'-3px'}}/>
<Paragraphblue text={i.name} style={{marginBlock:'14px'}}/>
<Subaparagraph text={i.location}/>
<Subaparagraph text={'Created '+timeago}/>
  </div>
  {
    i.accepted==true &&
<p className='accepted'>Accepted</p>
}
{
i.accepted==false &&
<p className='rejected'>Rejected</p>
  }
  {
   i.accepted==null  &&
   <p className='applied'>Applied</p>
  }
  <div style={{minWidth:'255px'}}>
<BlueButton text={'Remove job'} click={()=>{
              updateDoc(doc(db,'jobseeker',info.id),({jobpostings:arrayRemove(i)}))
              setischange(i=>!i)
}}/>
  </div>
</div>
</>
)
})
}
</div>
}
</> 
)
}

export default JobseekerApplications