import { addDoc, arrayRemove, collection, doc, getDocs, updateDoc } from '@firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { jobseekerchat } from '../../../ReduxStore/Redux'
import { useNavigate } from 'react-router-dom'
import e from 'cors'
function JobseekerApplications() {
    const jobseekerlogin=useSelector(state=>state.reducer.jobseekerloginstatus.jobseekerlogin);
    const jobseekeremaill=useSelector((state)=>state.reducer.jobseekeremailstatus.jobseekeremail);
    const [isloading,setisloading]=useState(false);
    const [info,setinfo]=useState()
    const[ischange,setischange]=useState(false);
    const [findemail,setfindemail]=useState()
    const [externalApi,setexternalApi]=useState(0);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const divstyle={
      cursor: 'pointer',
      borderBottom: '5px solid rgb(8 81 192 / 85%)',
      marginTop: '5px'
  }  
  
    useEffect(()=>{
        async function details(){
          setisloading(true)
          const  usersCollectionRef= await collection (db,'jobseeker')
          const po=  await getDocs(usersCollectionRef)
          const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
        const check= await userss.find(i=>i.email==jobseekeremaill)
          if (check) {
setinfo(check)

setisloading(false)
        }
  
    }

async function details2(){
  const  usersCollectionRef= await collection (db,'employer')
  const po=  await getDocs(usersCollectionRef)
  const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
  setfindemail(userss)
}
 details().then(()=>details2())   
},[ischange])

async function message(i){
  const  usersCollectionRef= collection (db,'messages')
  const arrayy=[]
  const po=  await getDocs(usersCollectionRef)
  const  userss=  po.docs.map((i)=>{return{...i.data(),id:i.id}})
  
  findemail.forEach(async(j)=>{
 let g=j.jobpostings.find(e=> e.title+e.description===i.title+i.description)
if(g){
  arrayy.push(g)
  const t= userss.find(d=>d.data.employer===i.email && d.data.jobseeker===jobseekeremaill)
  const data={
    city:j.city, 
    country:j.country,
    jobseekerName:i.Firstname +i.Surname,  
   jobseeker:jobseekeremaill,
   employer:j.email,
   employerName:j.name,
   jobName:i.title,
   createdAt:Date.now()
  }
  if(t){
    dispatch(jobseekerchat({data:data,initial:true}))
    navigate('/jobseekermessages')
    }
  else{

  await addDoc(usersCollectionRef,{data:data})
  dispatch(jobseekerchat({data:data,initial:true}))
  navigate('/jobseekermessages')
  }

}

})
}



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

<div className="postjobsubdiv" style={{width:'100%',borderBottom:'1px solid rgb(199 199 199)'
,borderRadius:'0px',padding:'0px',placeContent:'center',gap:'100px'
}}>
    <div onClick={()=>setexternalApi(0)} style={externalApi==0 ?  divstyle : {cursor:'pointer'}}>
        {
            externalApi==0 ?
<Paragraphblue text={'Applications'}/>
:
<p style={{fontSize:'initial',marginTop:'18px',color:'#221f1fe8',fontWeight:'400',marginTop:'16.5px'}}> Applications</p>
     }
    </div>
    <div onClick={()=>setexternalApi(1)} style={externalApi==1 ? divstyle :  {cursor:'pointer'}}>
        {
            externalApi==1?
<Paragraphblue text={'Saved posts'} />
:
<p style={{fontSize:'initial',marginTop:'18px',color:'#221f1fe8',fontWeight:'400',marginTop:'16.5px'}}> Saved posts</p>
        }
    </div>
   </div>



{
  externalApi==0 &&  info?.jobpostings?.length>0 &&
info.jobpostings?.map((i)=>{
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
  <div className='buttondivapp'>
<BlueButton text={'Remove job'} click={()=>{
              updateDoc(doc(db,'jobseeker',info.id),({jobpostings:arrayRemove(i)}))
              setischange(i=>!i)
}}/>
<InverseButton click={()=>message(i)} text={'message'}/>
  </div>

</div>
</>
)
})
}
{
  externalApi ==1&& info.savedjobs?.length>0 &&
  (
    <>
    {
      info.savedjobs.map((i)=>{
        const timeago=moment(i.createdAt).fromNow()
        return (
        <>
            <div className='postjobsubdiv' style={{borderBottom:'1px solid lightgray'}}>
<div className='columndiv'>
<Header text={i.title} style={{margin:'-3px'}}/>
<Paragraphblue text={i.name} style={{marginBlock:'14px'}}/>
<Subaparagraph text={i.location}/>
<Subaparagraph text={'Created '+timeago}/>
  </div>
  
  <div className='buttondivapp'>
<BlueButton text={'Remove job'} click={()=>{
              updateDoc(doc(db,'jobseeker',info.id),({savedjobs:arrayRemove(i)}))
              setischange(i=>!i)
}}/>
<InverseButton click={()=>message(i)} text={'message'}/>

  </div>
</div>
          </>
        )
      })
    }
    </>
  )

}
</div>
}
</> 
)
}

export default JobseekerApplications