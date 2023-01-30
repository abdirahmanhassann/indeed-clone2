import { addDoc, collection, getDocs } from '@firebase/firestore'
import { LinearProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { BiArrowBack, BiNoEntry } from 'react-icons/bi'
import BlueButton from '../../../ElementComponents/bluebutton'
import Header from '../../../ElementComponents/Header'
import Paragraph from '../../../ElementComponents/paragraph'
import Paragraphblue from '../../../ElementComponents/paragraphblue'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import Nav from '../../GeneralComponents/Nav'
import { db, storagee } from '../../../Firebase/Firebase'
import '../signin.css'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
  } from "firebase/storage";
import { async } from '@firebase/util'
 


function EmployerSignupform() {
    const [progress,setprogress]=useState(25);
    const [err,seterr]=useState(false)
    const [employerdetails,setemployerdetails]=useState({name:'',country:'',city:'',email:'',password:'',repassword:'',image:null,bio:''})
const [imageupload,setimageupload]=useState(null)
const [imageUrls,setImageUrls]=useState(null)
const [imageUrls2,setImageUrls2]=useState(null)
    function changed(e){
     
                  
        console.log(employerdetails)
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

        
         console.log(storagee,employerdetails.email,v4())
         setImageUrls ( ref(storagee, employerdetails.name))
         uploadBytes(imageUrls, imageupload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              setemployerdetails((i)=>{
                return{
                ...i,
                 image:JSON.stringify(url)
                }}
                );
              console.log(employerdetails)
            });
          });
    
    }}

   async function enteredDetails(){

            const  usersCollectionRef= await collection (db,'employer')
           const po=  await getDocs(usersCollectionRef)
           const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
         await  console.log(userss);
         const check= await userss.find(i=>i.email==employerdetails.email)
         const check2=await  userss.find(i=>i.name==employerdetails.name)
           if (check || check2) {
           
             console.log('already exists')
             console.log(check, employerdetails.email)
             
            
          }
          else { 
            addDoc(usersCollectionRef,{
                name: employerdetails.name,
                country: employerdetails.country,
                city: employerdetails.city,
                email: employerdetails.email,
                password: employerdetails.password,
                repassword: employerdetails.repassword,
            image:imageUrls2,
                bio: employerdetails.bio
            })
            console.log('success')
          }
          await console.log(employerdetails.email)
        
      
    }
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
}}/>
:
<Link to='./..' className='link'>
<BiArrowBack style={{color:'black',height:'26px',width:'26px',cursor:'pointer'}} onClick={()=>{
    setprogress((i)=>i-25)
    seterr(false)
}}/>
</Link>

}
<Paragraphblue text={'Save & exit'}/>
    </div>
    <LinearProgress variant="determinate" value={progress} style={{
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
            <Header text={'Enter a secure password'} style={{fontSize:'25px'}}/>
<TextField onChange={changed} id="outlined-basic" label="Password" variant="outlined" type='password' name='password' value={employerdetails.password}/>
        <Paragraph text={'Re-enter password'}/>
<TextField onChange={changed} id="outlined-basic" label="Re-password" variant="outlined" type='password' name='repassword' value={employerdetails.repassword} />
{
err==true &&
<p style={{color:'red',fontSize: '13px'}}>please enter valid password details</p>
    }

<BlueButton text={'Continue'} style={{marginTop:'10px'}} click={()=>{
    if(employerdetails.password.length < 8 || employerdetails.repassword!=employerdetails.password )
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
    progress==100&&
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
<BlueButton text='submit' click={()=>{
    if(employerdetails.bio.length > 5)
    {async function i(){


       await uploadpic();
        await enteredDetails()
       await seterr(false)
    }
    i();
    }
    else{
seterr(true)
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