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
    const [externalApi,setexternalApi]=useState(0);
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
  externalApi==0 &&  info.jobpostings &&
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
{
  externalApi ==1&& info.savedjobs ?
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
 
  <div style={{minWidth:'255px'}}>
<BlueButton text={'Remove job'} click={()=>{
              updateDoc(doc(db,'jobseeker',info.id),({savedjobs:arrayRemove(i)}))
              setischange(i=>!i)
}}/>
  </div>
</div>
          </>
        )
      })
    }
    </>
  )
:
<>No saved jobs</>
}
</div>
}
</> 
)
}

export default JobseekerApplications