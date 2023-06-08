import React, { useState } from 'react'
import EmployerNav from './EmployerNav'
import { useSelector } from 'react-redux';
import Largeheader from '../../../ElementComponents/Largeheader';
import Header from '../../../ElementComponents/Header';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, TextareaAutosize } from '@mui/material';
import Subaparagraph from '../../../ElementComponents/subaparagraph';
import Paragraph from '../../../ElementComponents/paragraph';
import InverseButton from '../../../ElementComponents/InverseButton';
import BlueButton from '../../../ElementComponents/bluebutton';
import picc from '../../../img/Employer-Frequently-Asked-Questions.png'
import pic2 from '../../../img/indeed-Hub-illustrations-How-to-Consistently-Attract-and-Filter-Quality-Applicants.png'
import { useNavigate } from 'react-router-dom';
import { arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from '@firebase/firestore';
import { db } from '../../../Firebase/Firebase';

function EmployerEdit() {
    const selector=useSelector(state=>state.reducer.clickedjobslicestatus.clickedjob);
    const email=useSelector(state=>state.reducer.employeremailstatus.employeremail.email);
    const [form,setform]=useState({title:'',location:'',rate:'',min:null,max:null,description:'',time:'',status:true})
const navigate=useNavigate();

function changed(e){
    setform(i=>{
        return {
            ...i,
            [e.target.name]:e.target.value
        }
    })
}
async function clicked(){
    const newobj={
        title:selector.title,
        location:form.location? form.location : selector.location,
        rate:form.rate? form.rate:selector.rate,
        min:form.min? form.min: selector.min,
        max:form.max? form.max: selector.max,
        description:selector.description,
        time:form.time? form.time : selector.time,
        status:selector.status,
        createdAt:selector.createdAt
    }
    const  usersCollectionRef= await collection (db,'employer')
    const po=  await getDocs(usersCollectionRef)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
    const g= userss.find(d=>d.email===email)
    await    updateDoc(doc(db,'employer',g.id),({jobpostings:arrayRemove(selector)}))
    await setDoc(doc(db,'employer',g.id),{jobpostings:arrayUnion(newobj) },{merge:true})
    navigate(`../employerhome/employerdashboard/${selector.title}`)
}
  return (
    <div>
        <>
        <EmployerNav/>
      {  selector &&
        <div className='largedivpostjob'>
            <div className='postjobsubdivAlt'>
<Largeheader text={'Edit the job posting'} style={{fontSize:'25px'}}/>
<img src={picc} className='postjobpic'/>
            </div>
            <div className='postjobsubdiv2'>
<Header text={'Job title'}/>
<TextField id="outlined-basic" label="immutable*" variant="outlined" sx={{width:'90%'}}
name='title' value={selector.title}
onChange={changed}
/>
            </div>
            <div className='postjobsubdiv2'>
<Header text={'Where will the employee report to work?'}/>
<TextField id="outlined-basic" label="Location" variant="outlined" sx={{width:'90%'}}
name='location' defaultValue={selector.location} 
onChange={changed}
/>
            </div>
            <div className='postjobsubdiv2'>

<Header text={'What is the salary you are willing to provide?'}/>
<Subaparagraph text={'Consider GBP the currency'}/>
<div className='postjobsubdivAlt'>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Rate</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    name='rate' defaultValue={selector.rate}
    label="Rate"
    onChange={changed}
  >
    <MenuItem value={'hourly'} >Hourly</MenuItem>
    <MenuItem value={'monthly'} >Monthly</MenuItem>
    <MenuItem value={'annual'}>Annually</MenuItem>
  </Select>
</FormControl>
<TextField id="outlined-basic" label="Minimum" type='number' variant="outlined" sx={{width:'100%'}} 
name='min' value={form.min} defaultValue={selector.min} 
onChange={changed}
/>
<Paragraph text={'to'}/>
<TextField id="outlined-basic" label="Maximum" type='number' variant="outlined" sx={{width:'100%'}}
name='max' defaultValue={selector.max} value={form.max}
onChange={changed}
/>
</div>
            </div>
            <div className='postjobsubdivAlt'>
<Largeheader text={'Describe the job'} style={{fontSize:'25px'}}/>
<img src={pic2} className='postjobpic'/>
            </div>
            <div className='postjobsubdiv2'>
<Header text={'Job description'}/>
<Paragraph text={'Immutable '}/>
<TextareaAutosize

  color="neutral"
  disabled={false}
  minRows={4}
  placeholder="Please provide a brief description on the nature of the position"
  variant="outlined"
  style={{minHeight:'50px',maxWidth:'100%',minWidth:'100%',border:'1px solid rgb(22, 64, 129)'
  ,outline:'none',fontSize:'18px',fontFamily:'roboto',borderRadius:'10px'}}
  name='description' value={selector.description}
  onChange={changed}
/>
            </div>

          
 <div className='postjobsubdiv2'>
<Header text={'Shift times'}/>
  <FormControl>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"  
    name="time"
    defaultValue={selector.time}
onChange={changed}
    sx={{display:'flex',flexDirection:'row'}}

  >
    <FormControlLabel value='fulltime' control={<Radio />} label="Full-time" />
    <FormControlLabel value='Part-time' control={<Radio />} label="Part-time" />
    <FormControlLabel value='Temporary' control={<Radio />} label="Temporary" />
  </RadioGroup>
</FormControl>
            </div>

            <div className='postjobsubdivAlt'>
<InverseButton text={'Back'} click={()=>navigate(`../employerhome/employerdashboard/${selector.title}`)}/>
<BlueButton text = {'Continue'}  click={()=>clicked()}/>
            </div>
            
        </div>
      }
        </>
    </div>  )
}

export default EmployerEdit