import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../ElementComponents/Header'
import './employer.css'
import InverseButton from '../../../ElementComponents/InverseButton'
import Paragraph from '../../../ElementComponents/paragraph'
import Paragraphblue from '../../../ElementComponents/paragraphblue'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import { db, storagee } from '../../../Firebase/Firebase'
import EmployerNav from './EmployerNav'
import { getDownloadURL, ref } from '@firebase/storage'
import ScaleLoader from "react-spinners/ClipLoader";
import Largeheader from '../../../ElementComponents/Largeheader'
import { FormControl, FormLabel, InputLabel, MenuItem, Select } from '@mui/material'
import BlueButton from '../../../ElementComponents/bluebutton'
import { clickedjob, employerchat } from '../../../ReduxStore/Redux'
import { Link, useNavigate } from 'react-router-dom'
function EmployerJobInsights() {
    const jobselector=useSelector(state=>state.reducer.clickedjobslicestatus.clickedjob);
    const email=useSelector(state=>state.reducer.employeremailstatus.employeremail.email);
    const [applicants,setapplicants]=useState()
    const [checked,setchecked]=useState(false);
    const navigate=useNavigate()
const [ifcheck,setifcheck]=useState();
const [jobp,setjobp]=useState();
const dispatch=useDispatch()
const [isloading,setisloading]=useState(false)
    const greenstyle={
      background:`green`
    }
    const redstyle={
      background:`red`
    }
  
    const divstyle={
        background:'#f3f2f1',
        paddingBlock: '10px',
        paddingInline:'9px',
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        borderRadius:'2px',
        cursor:'pointer'
    }
    

    useEffect(()=>{
async function Candidatescheck(){
setisloading(true)
    const  usersCollectionRef= await collection (db,'jobseeker')
    const po=  await getDocs(usersCollectionRef)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})

   let g=[]
   userss.map((i)=>{
    if(i.jobpostings){
    i.jobpostings.map((j)=>{
        if(j.title==jobselector.title){
 return g.push(i)
        }
        else return null
    })
    setapplicants(g);
}
   }) 
setisloading(false)
}
async function checkstatus(){
  const  usersCollectionRef= await collection (db,'employer')
  const po=  await getDocs(usersCollectionRef)
  const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
const g=userss.find((i)=>i.email===email)
const job=g.find(j=>j.title + j.description===jobselector.title + jobselector.description)

dispatch(clickedjob(job))
}
checkstatus()
Candidatescheck();
    },[checked])
        
  
async function functionstatus(o) {
  const  usersCollectionRef= await collection (db,'employer')
  const po=  await getDocs(usersCollectionRef)
  const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
  const g= userss.find(d=>d.email===email)
  let k={...jobselector,status:o==='online'? true : false}
  
  await updateDoc(doc(db,'employer',g.id),({jobpostings:arrayRemove(jobselector)}))
  .then(async()=>{

    dispatch(clickedjob({...jobselector,status:o==='online'?true:false}))
     setDoc(doc(db,'employer',g.id),{jobpostings:arrayUnion(k) },{merge:true})
  })
 }

 function cvfunc(i){
        getDownloadURL(ref(storagee, `jobseeker/${i.email}`)).then((url)=>    
        {
              window.open(url)
              })
              i.jobpostings.map(async(k)=>{
             if(k.title+ k.description==jobselector.title+jobselector.description)   
            {  
                      let  j={...k,createdAt:Date.now(),event:'Opened'}
                    await  setDoc(doc(db,'jobseeker',i.id),{notifications:arrayUnion(j) },{merge:true})
                  }
          })
}

async function message(i){
  const  usersCollectionRef= collection (db,'messages')
  const po=  await getDocs(usersCollectionRef)
  const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
  const g= userss.find(d=>d.data.employer===email && d.data.jobseeker===i.email 
    || d.data.jobseeker===i.email && d.data.employer===email )
  const data={
    city:i.city, 
    country:i.country,
    jobseekerName:i.Firstname +i.Surname,  
  //jobseekerName:`${i.Firstname} ${i.Surname}`,
   jobseeker:i.email,
   employer:email,
   jobName:jobselector.title,
   createdAt:Date.now()
  }
  if(g){
    dispatch(employerchat({data:data,initial:true}))
    navigate('/employerhome/employermessages')
    }
  else{
    await addDoc(usersCollectionRef,{data:data})
  }
  dispatch(employerchat({data:data,initial:true}))
  navigate('/employerhome/employermessages')
}

  return (
    <>
    <EmployerNav/>
 {   isloading ? 
<div className="loader" style={{justifySelf:'center'}}><ScaleLoader
 size={150}
 margin={'auto'}
 color={'#2557a7'}
 borderwidth= {'7px'}
/></div>
    :
 
    
  jobselector==false ?
  
  <Header text={'loading'}/>
  :
<div className='largedivpostjob'>
  <div className='postjobsubdiv' style={{padding:'10px 39px',width:'110%'}}> 
  <Paragraph text={jobselector.title}/>
  <FormControl fullWidth sx={{width:'123px',height:'50px',alignItems: 'center',
    alignSelf: 'center', marginInline: '15px'}}>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>

  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
  //  name='rate' value={formm.rate}
    label="Open"
    value={jobselector?.status===true ? 'hourly':'monthly'}
sx={{width:'111px',height:'50px',alignItems: 'center',
    alignSelf: 'center', marginInline: '15px'  }}
  >
    <MenuItem value={'hourly'}  onClick={ ()=>functionstatus('online')}>
      <div className='divrow'>
      <span className="colored-circle" style={greenstyle}/>
      <p>Online </p>
      </div>

      </MenuItem>
    <MenuItem value={'monthly'} onClick={()=>functionstatus('offline')}>
    <div className='divrow'>
      <span className="colored-circle" style={redstyle} />
      <p>Offline</p>
      </div> 
         </MenuItem>
  </Select>
</FormControl>

<div style={{width:'300px'}}>

<BlueButton text={'Edit job posting'} click={()=>navigate('../EmployerHome/EmployerDashboard/editjob')}/>
</div>
  </div>
{
    applicants &&
    applicants.map((i)=>{
       /// checkedfunc(i);
        return( 
        
        <div className='postjobsubdiv' style={{width:'110%'}} >
<div className='columndiv'>
<Paragraphblue text={i.Firstname+' '+i.Surname}/>
<Subaparagraph text={i.city}/>
<Subaparagraph text={i.country}/>
  </div>
  <div className='columndiv'>
    <Paragraphblue text={'Skills'}/>
    {
        i.skills &&
        i.skills.length > 0 &&
i.skills.map((j, index=0)=>{
index++
if(index<=2) return <Subaparagraph text={j} style={{border:'1px solid light-gray', borderRadius:'5px',padding:'5px'}}/>
else return null;
})
    }
    </div>
  <div className='columndiv'>
  <Paragraphblue text={i.role}/>
<Subaparagraph text={i.RecentExperience}/>
<Subaparagraph text={i.startdate+'-'+i.enddate}/>
    </div>
    <div className='rowdiv'>

    <InverseButton text={'View CV'} click={()=>cvfunc(i)}/>
    <BlueButton text={'Message'} click={()=>message(i)} />
    </div>
    <div className='postjobsubdiv5' style={{paddingBlock:'10px'}}>
  <div className='columndiv' style={divstyle} 
 onClick={()=>
{      
    async function checkedfunc(i)
    {
       const c=await i.jobpostings.map((k)=>{
       if( k.description==jobselector.description)   
      {      
          updateDoc(doc(db,'jobseeker',i.id),({jobpostings:arrayRemove(k)}))
          .then(()=>{ k={...k,accepted:true}
        let  j={...k,createdAt:Date.now(),event:'Accepted'}
          setDoc(doc(db,'jobseeker',i.id),{jobpostings:arrayUnion(k) },{merge:true})
          setDoc(doc(db,'jobseeker',i.id),{notifications:arrayUnion(j) },{merge:true})
          .then(()=>setchecked(i=>!i))
    
      })
    }
       else return null;

    })
    }
    checkedfunc(i)
}}
  >
{       
   
   i.jobpostings.map((k)=>{
return(
    <>
    {
        k.description==jobselector.description ?
<AiOutlineCheck style={{height:'20px',width:'20px',color:k.accepted==true ?'#35d335':'rgb(22, 64, 129)' }} />
:null
}

   </>

)
   })
}

  </div>
  <div className='columndiv' style={divstyle} onClick={()=>{
         
         async function checkedfunc(i)
         {
            const c=await i.jobpostings.map((k)=>{
            if( k.description==jobselector.description)   
           {      
               updateDoc(doc(db,'jobseeker',i.id),({jobpostings:arrayRemove(k)}))
               .then(()=>{ k={...k,accepted:false}
               let  j={...k,createdAt:Date.now(),event:'Rejected'}
               setDoc(doc(db,'jobseeker',i.id),{jobpostings:arrayUnion(k) },{merge:true})
               setDoc(doc(db,'jobseeker',i.id),{notifications:arrayUnion(j) },{merge:true})
               .then(()=>setchecked(i=>!i))
             
           })
         }
            else return null;
     
         })
         }
         checkedfunc(i)
  }}>
    {       
   
   i.jobpostings.map((k)=>{

return(
    <>
    {
        k.description==jobselector.description &&
<AiOutlineClose style={{height:'20px',width:'20px',color:k.accepted==false ?'red':'rgb(22, 64, 129)'}}/>
}
</>
)
})
}
  </div>
  </div>
  </div>
 )})}
 </div>
}

</>
)
}

export default EmployerJobInsights