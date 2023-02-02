import { addDoc, arrayUnion, collection, getDocs } from '@firebase/firestore'
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
import { employeremail, employerlogin, jobseekeremail, jobseekerlogin } from '../../../ReduxStore/Redux'
import InverseButton from '../../../ElementComponents/InverseButton'


function EmployerSignupform() {
    const [progress,setprogress]=useState(25);
    const [err,seterr]=useState(false)
    const [imageupload,setimageupload]=useState(null)
    const [added,setadded]=useState(true)
    const [clicked,setclicked]=useState(false)
    const [imageUrls2,setImageUrls2]=useState(null)
    const [inputs, setInputs] = useState([1]);
    const [employerdetails,setemployerdetails]=useState({Firstname:'',Surname:'',country:'',city:'',email:'',password:'',repassword:''})
const dispatch =useDispatch()
const navigate=useNavigate()

const inputchange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;
    setInputs(newInputs);
    console.log(employerdetails)
  };

const handleAddInput = () => {
  setInputs([...inputs, inputs.length + 1]);
};

 const deleteinput = () => {
    setInputs(inputs.slice(0,inputs.length-1));
   
  };



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

  try{      
      const imagge= ( ref(storagee,`/jobseeker/${employerdetails.email}`))
      console.log(imagge)
      console.log(storagee)
  
         uploadBytes(imagge, imageupload)
  }
  catch(err){
      console.log(err)
  }
}
}

   async function enteredDetails(){

            const  usersCollectionRef= await collection (db,'jobseeker')
           const po=  await getDocs(usersCollectionRef)
           const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
         await  console.log(userss);
         const check= await userss.find(i=>i.email==employerdetails.email)
         const check2=await  userss.find(i=>i.name==employerdetails.name)
           if (check==undefined || check2==undefined) {
           console.log(employerdetails,inputs)
               addDoc(usersCollectionRef,{
                   Firstname: employerdetails.Firstname,
                   Surname: employerdetails.Surname,
                   country: employerdetails.country,
                   city: employerdetails.city,
                   email: employerdetails.email,
                   password: employerdetails.password,
                   repassword: employerdetails.repassword,
                skills: inputs
               })
               console.log('success')
               setclicked(false)
               dispatch(jobseekerlogin(true))
               dispatch(jobseekeremail(employerdetails.email))
               navigate('/')
               // setprogress(25)
               
            }
            else { 
              console.log('already exists')
              console.log(check, employerdetails.email)
              setadded(false)
              setclicked(false)
          }
          await console.log(employerdetails.email)
    
      
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
<Paragraphblue text={'Save & exit'}/>
    </div>
    <LinearProgress variant="determinate" value={progress} style={{
        backgroundColor:'lightgray', color:'rgb(22, 64, 129)'
        ,borderRadius:'10px'
        }} />
{
progress==25 &&
    <>
    <Header text={'What is the name?'} style={{fontSize:'25px'}}/>
    <TextField onChange={changed} id="outlined-basic" label="FirstName" variant="outlined" name='Firstname' value={employerdetails.Firstname} />
    <TextField onChange={changed} id="outlined-basic" label="SurName" variant="outlined" name='Surname' value={employerdetails.Surname} />
    {
err==true &&
<p style={{color:'red',fontSize: '13px'}}>please enter a valid name</p>
    }
    <BlueButton text={'Continue'} click={()=>{
        if(employerdetails.Firstname.length < 2 && employerdetails.Surname.length<2 )
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
            <Header text={'Where do you live?'} style={{fontSize:'25px'}}/>
        <Paragraph text={'This process helps us match you with Employers nearby'}/>
<TextField onChange={changed} id="outlined-basic" label="Country" variant="outlined" name='country' value={employerdetails.country} />
<TextField onChange={changed} id="outlined-basic" label="City" variant="outlined" name='city' value={employerdetails.city}/>
    <Header text={'What is your Email?'} style={{fontSize:'25px'}}/>
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
    <Paragraph text={'Enter Your CV/resume'}/>
    <input 
  type="file"    accept=".pdf" name="resume" onChange={(e)=>{
setimageupload(e.target.files[0])
  }}
  style={{width:'100%',border:'none'}}
  />
 <Paragraph text={'Please list your skills/qualifications'}/>
<Subaparagraph text={'Will be seen on Your profile'}/>
{inputs.map((input,index) => (
    <>
        <TextField key={index} onChange={(e)=>inputchange(e,index)} id="outlined-basic" label="skills" variant="outlined"
         type='text' name='Skills/qualifications' />
    </>
      ))}
      <InverseButton click={handleAddInput} text={'Add skill'}/>
    <InverseButton click={deleteinput} text={'remove skill'}/>
      
{
    err &&
<p style={{color:'red',fontSize: '13px'}}>please Add your CV/resume</p>
}
<BlueButton text='Continue' click={()=>{
    if(imageupload)
    {
         

             setprogress(i=>i+25);
console.log(progress)
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