import { addDoc, collection, getDocs } from '@firebase/firestore'
import { LinearProgress, TextField } from '@mui/material'
import React, { createFactory, useState } from 'react'
import { BiArrowBack, BiNoEntry } from 'react-icons/bi'
import BlueButton from '../../../ElementComponents/bluebutton'
import Header from '../../../ElementComponents/Header'
import ScaleLoader from "react-spinners/ClipLoader";
import Paragraph from '../../../ElementComponents/paragraph'
import Paragraphblue from '../../../ElementComponents/paragraphblue'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import Nav from '../../GeneralComponents/Nav'
import { db, storagee } from '../../../Firebase/Firebase'
import '../signin.css'
import { Link, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
  } from "firebase/storage"; 
import { FaSpinner } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { employeremail, employerlogin } from '../../../ReduxStore/Redux'
import InverseButton from '../../../ElementComponents/InverseButton'


function EmployerSignupform() {
    const [progress,setprogress]=useState(25);
    const [err,seterr]=useState(false)
    const [employerdetails,setemployerdetails]=useState({name:'',country:'',city:'',email:'',password:'',repassword:'',bio:''})
const [imageupload,setimageupload]=useState(null)
const [added,setadded]=useState(true)
const [clicked,setclicked]=useState(false)
const [imageUrls2,setImageUrls2]=useState(null)
const dispatch =useDispatch()
const navigate=useNavigate()
    function changed(e){
     
                  
        setemployerdetails(i=>
     {     
   return{ 
     ...i,
        [e.target.name]:e.target.value
        }
    }
    )

    }
    function uploadpic(){
        if ( imageupload === null) return;
        else{

  try{      
      const imagge= ( ref(storagee,employerdetails.email+v4()))
         uploadBytes(imagge, imageupload)
  }
  catch(err){
  }
}
}

   async function enteredDetails(){

            const  usersCollectionRef= await collection (db,'employer')
           const po=  await getDocs(usersCollectionRef)
           const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
         const check= await userss.find(i=>i.email==employerdetails.email)
         const check2=await  userss.find(i=>i.name==employerdetails.name)
           if (check || check2) {
           
             setadded(false)
             setclicked(false)
            // setprogress(25)
            
          }
          else { 
            addDoc(usersCollectionRef,{
                name: employerdetails.name,
                country: employerdetails.country,
                city: employerdetails.city,
                email: employerdetails.email,
                password: employerdetails.password,
                repassword: employerdetails.repassword,
                bio: employerdetails.bio
            })
            setclicked(false)
            dispatch(employerlogin(true))
            dispatch(employeremail(employerdetails))
            navigate('/EmployerHome')
          }
    
      
    }
    // const override= css`
    // display:block;
    // border-width: 5px;
    // ` ;

  return (
<>
<Nav/>
<div className='employersignupdivlarge'>
<div className='employersignupdiv'>
    <div className='employeroptions'>
        {

            progress >49 ?
<BiArrowBack style={{color:'black',height:'26px',width:'26px',cursor:'pointer'}} onClick={()=>{
        setprogress((i)=>i-25)
        seterr(false)
        setadded(true)
}}/>
:
<Link to='./..' className='link'>
<BiArrowBack style={{color:'black',height:'26px',width:'26px',cursor:'pointer'}} onClick={()=>{
    setprogress((i)=>i-25)
    seterr(false)
}}/>
</Link>

}
<div style={{width:'100px'}}>
<InverseButton text={'Exit'} click={()=>navigate('../../')}/>
</div>
    </div>
    <LinearProgress variant="determinate" data-testid='bar' value={progress} style={{
        backgroundColor:'lightgray', color:'rgb(22, 64, 129)'
        ,borderRadius:'10px'
        }} />
{
progress==25 &&
    <>
    <Header text={'What is the name of your company?'} style={{fontSize:'25px'}}/>
    <TextField onChange={changed} id="outlined-basic" label="Name" variant="outlined" name='name' value={employerdetails.name} />
    {
err==true &&
<p style={{color:'red',fontSize: '13px'}}>please enter a valid name</p>
    }
    <BlueButton text={'Continue'} click={()=>{
        if(employerdetails.name.length < 2 )
        {
            seterr(true)
        }
        else{
            setprogress(i=>i+25)
            seterr(false)
        }
        
        }}/>
    </>
}

{
    progress==50 &&
    <>
            <Header text={'Where is your company based?'} style={{fontSize:'25px'}}/>
        <Paragraph text={'This process helps us match you with jobseekers nearby'}/>
<TextField onChange={changed} id="outlined-basic" label="Country" variant="outlined" name='country' value={employerdetails.country} />
<TextField onChange={changed} id="outlined-basic" label="City" variant="outlined" name='city' value={employerdetails.city}/>
    <Header text={'What is your company Email?'} style={{fontSize:'25px'}}/>
    <TextField onChange={changed} id="outlined-basic" label="Email" variant="outlined"  name='email' value={employerdetails.email}/>
    {
err==true &&
<p style={{color:'red',fontSize: '13px'}}>please enter valid details</p>
    }
<BlueButton text={'Continue'} style={{marginTop:'10px'}} click={()=>
{
    if(employerdetails.country.length < 2 ||employerdetails.city.length < 2 || !employerdetails.email.includes('.com') )
    {
        seterr(true)
    }
    else{
        setprogress(i=>i+25)
        seterr(false)
    }
    
}}/>

    </>
}
{
    progress ==75 &&
    <>
    <Paragraph text={'Enter company picture'}/>
    <input 
  type="file"  accept="image/*"  name="image" onChange={(e)=>{
setimageupload(e.target.files[0])
  }}
  style={{width:'100%',border:'none'}}
  />
 <Paragraph text={'Enter company bio'}/>
<Subaparagraph text={'Will be seen on company profile'}/>
<TextField onChange={changed} id="outlined-basic" label="Bio" variant="outlined" type='text' name='bio' value={employerdetails.bio} />
{
    err &&
<p style={{color:'red',fontSize: '13px'}}>please enter valid details</p>
}
<BlueButton text='Continue' click={()=>{
    if(employerdetails.bio.length > 5)
    {
         

             setprogress(i=>i+25);
        uploadpic();
        seterr(false)

    }
    else{
seterr(true)
    }
    }}/>
    </>
}

{
    progress==100&&
    <>
           <Header text={'Enter a secure password'} style={{fontSize:'25px'}}/>
<TextField onChange={changed} id="outlined-basic" label="Password" variant="outlined" type='password' name='password' value={employerdetails.password}/>
        <Paragraph text={'Re-enter password'}/>
<TextField onChange={changed} id="outlined-basic" label="Re-password" variant="outlined" type='password' name='repassword' value={employerdetails.repassword} />
{
err==true &&
<p style={{color:'red',fontSize: '13px'}}>please enter valid password details</p>
    }

{

added==false &&
<p style={{color:'red',fontSize: '13px'}}>Email and/or Company name already being used</p>
}
{
    clicked &&
    <ScaleLoader
 size={120}
 color={'rgb(22, 64, 129)'}
 borderwidth= {'7px'}
//  css={override} 
/>
}
<BlueButton text={'Submit'} style={{marginTop:'10px'}} click={()=>{
    if(employerdetails.password.length < 8 || employerdetails.repassword!=employerdetails.password )
    {
        seterr(true)
    }
    else{
        
        seterr(false)
setclicked(true);
         enteredDetails()
    }

}}/>

  </>
}
</div>
</div>
</>
    )
}

export default EmployerSignupform