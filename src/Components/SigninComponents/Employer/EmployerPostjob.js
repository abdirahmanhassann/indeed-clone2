import React, { useState } from 'react'
import Paragraph from '../../../ElementComponents/paragraph'
import EmployerNav from './EmployerNav'
import picc from '../../../img/Employer-Frequently-Asked-Questions.png'
import Header from '../../../ElementComponents/Header'
import Largeheader from '../../../ElementComponents/Largeheader'
import { Checkbox, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextareaAutosize, TextField } from '@mui/material'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import BlueButton from '../../../ElementComponents/bluebutton'
import InverseButton from '../../../ElementComponents/InverseButton'
import pic2 from '../../../img/indeed-Hub-illustrations-How-to-Consistently-Attract-and-Filter-Quality-Applicants.png'
import { useSelector } from 'react-redux'
import { arrayUnion, collection, doc, getDocs, setDoc } from '@firebase/firestore'
import { db } from '../../../Firebase/Firebase'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
// import { Textarea } from '@mui/joy'
function Postjob() {
  const [formm,setform]=useState({title:'',location:'',rate:'',min:null,max:null,description:'',time:'',status:true,createdAt:Date.now()});
const selector=useSelector((state)=>state.reducer.employeremailstatus.employeremail.email)
const navigate=useNavigate();
  function changed(e){
    setform(i=>{
      return{
        ...i,
        [e.target.name]:e.target.value,
            }
    })
  }

  async function clicked(){

    if(formm.title.length >4 ||formm.location.length >=2 ||formm.rate ||formm.min >0 ||formm.max > 0 ||formm.description.length >4 || formm.time)
    {
      const  usersCollectionRef= await collection (db,'employer')
      const po=  await getDocs(usersCollectionRef)
      const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
    const check= await userss.find(i=>i.email==selector);
    const timme= Date.now();
      if (check) {
        await  setform(i=>{
        return{
            ...i,
createdAt:timme
          }
        }
        )
     const p = await setDoc(doc(db,'employer',check.id),{jobpostings:arrayUnion(formm) },{merge:true});
navigate('/employerhome/employerdashboard')
      }
      else { 
        console.log('doesnt exist')
        
    }
  }}
  return (
    <div>
        <>
        <EmployerNav/>
      {  selector &&
        <div className='largedivpostjob'>
            <div className='postjobsubdivAlt'>
<Largeheader text={'Provide basic information'} style={{fontSize:'25px'}}/>
<img src={picc} className='postjobpic'/>
            </div>
            <div className='postjobsubdiv2'>
<Header text={'Job title'}/>
<TextField id="outlined-basic" label="Job title" variant="outlined" sx={{width:'90%'}}
name='title' value={formm.title}
onChange={changed}
/>
            </div>
            <div className='postjobsubdiv2'>
<Header text={'Where will the employee report to work?'}/>
<TextField id="outlined-basic" label="Location" variant="outlined" sx={{width:'90%'}}
name='location' value={formm.location} 
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
    name='rate' value={formm.rate}
    label="Rate"
    onChange={changed}
  >
    <MenuItem value={'hourly'} >Hourly</MenuItem>
    <MenuItem value={'monthly'} >Monthly</MenuItem>
    <MenuItem value={'annual'}>Annually</MenuItem>
  </Select>
</FormControl>
<TextField id="outlined-basic" label="Minimum" type='number' variant="outlined" sx={{width:'100%'}} 
name='min' value={formm.min}
onChange={changed}
/>
<Paragraph text={'to'}/>
<TextField id="outlined-basic" label="Maximum" type='number' variant="outlined" sx={{width:'100%'}}
name='max' value={formm.max}
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
<TextareaAutosize

  color="neutral"
  disabled={false}
  minRows={4}
  placeholder="Please provide a brief description on the nature of the position"
  variant="outlined"
  style={{minHeight:'50px',maxWidth:'100%',minWidth:'100%',border:'1px solid rgb(22, 64, 129)'
  ,outline:'none',fontSize:'18px',fontFamily:'roboto',borderRadius:'10px'}}
  name='description' value={formm.description}
  onChange={changed}
/>
            </div>

          
 <div className='postjobsubdiv2'>
<Header text={'Shift times'}/>
  <FormControl>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"  
    name="time"
    value={formm.time}
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
<InverseButton text={'Back'} click={()=>navigate('../employerhome')}/>
<BlueButton text = {'Continue'} click={clicked}/>
            </div>
            
        </div>
      }
        </>
    </div>
  )
}

export default Postjob