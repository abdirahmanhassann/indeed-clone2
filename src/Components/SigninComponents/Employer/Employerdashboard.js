import { collection, getDocs } from '@firebase/firestore'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
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
  <div className='postjobsubdiv5'>
  <div className='columndiv' style={divstyle}>
    <Paragraphblue text={'0'} style={uptext}/>
    <Subaparagraph text={'Active'} style={{marginTop:'-8px'}}/>
  </div>
  <div className='columndiv' style={divstyle}>
    <Paragraphblue text={'0'} style={uptext}/>
    <Subaparagraph text={'Candidates'} style={{marginTop:'-8px'}}/>
  </div>
  <div className='columndiv' style={divstyle}>
    <Paragraphblue text={'0'} style={uptext}/>
    <Subaparagraph text={'Interviews'} style={{marginTop:'-8px'}}/>
  </div>
  </div>
  <FormControl fullWidth sx={{width:'221px',height:'50px',alignItems: 'center',
    alignSelf: 'center'}}>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
  //  name='rate' value={formm.rate}
    label="Open"
//    onChange={changed}
sx={{width:'111px',height:'50px',alignItems: 'center',
    alignSelf: 'center'}}
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
</FormControl>
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