import Nav from '../../GeneralComponents/Nav'
import React, { useEffect, useState } from 'react'
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
import { db, storagee } from '../../../Firebase/Firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

function JobseekerUpdate() {
    const email=useSelector(state=>state.reducer.jobseekeremailstatus.jobseekeremail);
    const [form,setform]=useState()
    const navigate=useNavigate();
const [edited,setedited]=useState(false)
const [cvupload,setcvupload]=useState(null)
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

        email:form.email,
        city:form.city? form.city : form.city,
        country:form.country? form.country : form.country,
        startdate:form.startdate? form.startdate:form.startdate,
        enddate:form.enddate? form.enddate: form.enddate,
        role:form.role? form.role: form.role 
    }

    await setDoc(doc(db,'jobseeker',form.id),{
        Firstname:form.Firstname,Surname:form.Surname,country:form.country,city:form.city,email:form.email
    ,RecentExperience:form.RecentExperience,startdate:form.startdate,enddate:form.enddate,role:form.role
    },{merge:true})

    if (cvupload){
        const imagge= ( ref(storagee,`/jobseeker/${email}`))
        await uploadBytes(imagge, cvupload)
    }

setedited(true)
}
useEffect(()=>{
   async function fetchdata(){

        const  usersCollectionRef= collection (db,'jobseeker')
        const po=  await getDocs(usersCollectionRef)
    const  userss= po.docs.map((i)=>{return{...i.data(),id:i.id}})
    const g= userss.find(d=>d.email===email)
    if (g){
        setform(g)
    }
    }
    fetchdata()
},[])
  return (
    <div>
        <>
        <Nav/>
      {  form &&
        <div className='largedivpostjob' style={{marginTop:'-58px'}}>
            <div className='postjobsubdivAlt'>
            
<Largeheader text={`${form.Firstname}  ${form.Surname}`} style={{fontSize:'25px'}}/>
<img src={picc} className='postjobpic'/>
            </div>
            <div className='postjobsubdiv2'style={{gap:'30px'}}>

<TextField id="outlined-basic" label="City" variant="outlined" sx={{width:'90%'}}
name='city' defaultValue={form.city}
onChange={changed}
/>
<TextField id="outlined-basic" label="Country" variant="outlined" sx={{width:'90%'}}
name='country' defaultValue={form.country}
onChange={changed}
/>
<TextField id="outlined-basic" label="Recent experience" variant="outlined" sx={{width:'90%'}}
name='RecentExperience' defaultValue={form.RecentExperience}
onChange={changed}
/>
<div className='postjobsubdivAlt'>
<TextField id="outlined-basic" label="Start date" type='number' variant="outlined" sx={{width:'100%'}} 
name='startdate' defaultValue={form.startdate} 
onChange={changed}
/>
<Paragraph text={'to'}/>
<TextField id="outlined-basic" label="end date" type='number' variant="outlined" sx={{width:'100%'}}
name='enddate'  defaultValue={form.enddate}
onChange={changed}
/>
</div>
<TextField id="outlined-basic" label="Role" variant="outlined" sx={{width:'90%'}}
name='role' defaultValue={form.role}
onChange={changed}
/>
<Header text={'View or change CV'} />
<div className='postjobsubdivAlt'>
<InverseButton text={'View CV'} click={()=> { 
        getDownloadURL(ref(storagee, `jobseeker/${email}`)).then((url)=>
        {
           window.open(url)
        })

}}/>
<input style={{height:'inherit'}} className='BlueButton' type="file"  accept=".pdf" onChange={(e)=>{
setcvupload(e.target.files[0])

  }}/>
</div>
            </div>
            <div className='postjobsubdivAlt'>
<InverseButton text={'Back'} click={()=>navigate(`../`)}/>
<BlueButton text = {'Save changes'}  click={()=>clicked()}/>
            </div>
            {
                edited &&
                <p>Profile has been edited</p>
            }
        </div>
      }
        </>
    </div>  )

    
}

export default JobseekerUpdate