import { collection, getDocs } from '@firebase/firestore'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import moment from 'moment'
import { check } from 'prettier'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../../ElementComponents/Header'
import InverseButton from '../../../ElementComponents/InverseButton'
import Paragraph from '../../../ElementComponents/paragraph'
import Paragraphblue from '../../../ElementComponents/paragraphblue'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import { db } from '../../../Firebase/Firebase'
import { clickedjob } from '../../../ReduxStore/Redux'
import './employer.css'
import ScaleLoader from "react-spinners/ClipLoader";
import EmployerNav from './EmployerNav' 
import Largeheader from '../../../ElementComponents/Largeheader'


function EmployerDashboard() {
  const login=useSelector(state=>state.reducer.employerloginstatus.employerlogin);
  const email=useSelector(state=>state.reducer.employeremailstatus.employeremail.email);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [jobinfo,setjobinfo]=useState()
  const [loggedout,setloggedout]=useState(false)
  const [active,setactive]=useState();
  const [isloading,setisloading]=useState(false);
  const greenstyle={
    background:`green`
  }
  const redstyle={
    background:`red`
  }
  const divstyle={
    background:'#f3f2f1',
    paddingInline: '24px',
    width: '28px',
    height: 'auto',
    alignItems: 'center'
  }
  const uptext={
    marginBottom:'-10px'
  }
  useEffect(()=>{
async function details(){
  setisloading(true)
  const  usersCollectionRef= await collection (db,'employer')
  const po=  await getDocs(usersCollectionRef)
  const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
const check= await userss.find(i=>i.email==email)
  if (check) {
    setloggedout(true);
  setjobinfo(check);
}
else {
  setloggedout(false)
}
}
async function applicantchecker(){


const  usersCollectionRef2= await collection (db,'jobseeker')
const po2=  await getDocs(usersCollectionRef2)
const  userss2= await po2.docs.map((i)=>{return{...i.data(),id:i.id}})
let g=[]
userss2.map((i)=>{
if(i.jobpostings){


  i.jobpostings.map((j)=>{
    if(g.includes(j.name)){
    }
    else{
      g.push(j)
    }

})
}

})
setactive(g)
setisloading(false)
}
details().then(()=>
applicantchecker()
)
  },[])
  return (
<>
<EmployerNav/>
{
  login==false ?
  
  <Header text={'Please Login'}/>
  :
  isloading ? 
<div className="loader" style={{justifySelf:'center'}}><ScaleLoader
 size={150}
 margin={'auto'}
 color={'#2557a7'}
 borderwidth= {'7px'}
/></div>
    :

<div className='largedivpostjob'>

  {
jobinfo ?
active &&
 ! jobinfo.jobpostings ?
 <Largeheader text={'Please post a job to view dashboard'}/>
 :
jobinfo.jobpostings.map((i,index,accepted,rejected)=>{ 
index=0;
accepted=0;
rejected=0;
active.map((p)=>{
  if(p.description==i.description){
    index++
    if(p.accepted==true)return accepted ++
    if(p.accepted==false) return rejected ++
  }
  else return null
})

const timeago=moment(i.createdAt).fromNow();
return(
  <>

  <div className='postjobsubdiv' >

<div className='columndiv'>
<Paragraphblue text={i.title}/>
<Subaparagraph text={i.location}/>
<Subaparagraph text={'Created '+timeago}/>
  </div>
  <div className='postjobsubdiv5'>
  <div className='columndiv' style={divstyle}>
    <Paragraphblue text={index} style={uptext}/>
    <Subaparagraph text={'Applicants'} style={{marginTop:'-8px'}}/>
  </div>
  <div className='columndiv' style={divstyle}>
    <Paragraphblue text={accepted} style={uptext}/>
    <Subaparagraph text={'Accepted'} style={{marginTop:'-8px'}}/>
  </div>
  <div className='columndiv' style={divstyle}>
    <Paragraphblue text={rejected} style={uptext}/>
    <Subaparagraph text={'Rejected'} style={{marginTop:'-8px'}}/>
  </div>
  </div>

  {/* <FormControl fullWidth sx={{width:'221px',height:'50px',alignItems: 'center',
    alignSelf: 'center', marginInline: '15px'}}>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
  //  name='rate' value={formm.rate}
    label="Open"
//    onChange={changed}
sx={{width:'111px',height:'50px',alignItems: 'center',
    alignSelf: 'center', marginInline: '15px'  }}
  >
    <MenuItem value={'hourly'} >
      <div className='divrow'>
      <span className="colored-circle" style={greenstyle}/>
      <p>Online </p>
      </div>
      </MenuItem>
    <MenuItem value={'monthly'} >
    <div className='divrow'>
      <span className="colored-circle" style={redstyle} />
      <p>Offline</p>
      </div> 
         </MenuItem>
  </Select>
</FormControl> */}
<div style={{width:'400px'}}>
  <InverseButton click={()=>{
    dispatch(clickedjob(i))
    navigate(`./:${i.title}`)
    
  }}
  text={'View applicants'}
  style={{marginleft:'20px'}}
  />
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