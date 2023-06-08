import React, { useState } from 'react'
import Footer from '../GeneralComponents/Footer'
import Nav from '../GeneralComponents/Nav'
import logo from '../../img/indeedsvg.png'
import Header from '../../ElementComponents/Header'
import Paragraph from '../../ElementComponents/paragraph'
import Subaparagraph from '../../ElementComponents/subaparagraph'
import './signin.css'
import BlueButton from '../../ElementComponents/bluebutton'
import { TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '../../Firebase/Firebase'
import ScaleLoader from "react-spinners/ClipLoader";
import { useDispatch } from 'react-redux'
import { employeremail, employerlogin, jobseekeremail, jobseekerlogin } from '../../ReduxStore/Redux'
function Signin() {
const [signin,setsignin]=useState({email:'',password:''})
const [err,seterr]=useState(false);
const [loading,setloading]=useState(false)
const navigate=useNavigate()
const dispatch=useDispatch()
function changed(e){
    seterr(false)
    setsignin(i=>
 {     
return{ 
 ...i,
    [e.target.name]:e.target.value
    }
}
)

}
async function signinclick(e){
    e.preventDefault();
    setloading(true)
    const  usersCollectionRef= await collection (db,'employer')
    const po=  await getDocs(usersCollectionRef)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
  const check= await userss.find(i=>i.email==signin.email)
   if (check==undefined|| check.email==signin.email && check.password!=signin.password )
   {
    const  usersCollectionRef2= await collection (db,'jobseeker')
    const po2=  await getDocs(usersCollectionRef2)
    const  userss2= await po2.docs.map((i)=>{return{...i.data(),id:i.id}})
  const check2= await userss2.find(i=>i.email==signin.email)
   if (check2==undefined|| check2.email==signin.email && check2.password!=signin.password )
{

    seterr(true)
    setloading(false)
}
else{
    dispatch(jobseekerlogin(true));
    dispatch(jobseekeremail(signin.email));
    navigate('/');
    dispatch(employerlogin(false));
    dispatch(employeremail(null));
setloading(false)
}
}
else {
    
    dispatch(employerlogin(true));
    dispatch(employeremail(check))
    navigate('/Employerhome')
    setloading(false)

}
}
return (
        <>
                <div className='largestdiv'>
            <div className='largediv'>
                <img src={logo} className='logo' />
                <form className='signindiv'onSubmit={signinclick} >
                    <div className='subdiv'>
                        <Header text={'Ready to take the next step?'}/>
<Paragraph text={'Create an account or sign in.'}/>
<Subaparagraph text={`By creating an account or logging in, you understand and agree to Indeed's Terms. You also acknowledge our Cookie and Privacy policies. You will receive marketing messages from Indeed and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.`}/>
                    </div>
                    <Link to='/signup' className='link'>
                <div className='BlueButton' style={{width: '92%'}}> Create an account</div>
                    </Link>
                <Paragraph text={'or login to your account'}/>
                
                {  err==true &&
               <p style={{color:'red',fontSize: '13px'}}>please enter the valid email/password</p>
                }
                <TextField id="outlined-basic" type='email' required='true' label="Email"  variant="outlined" name='email'  onChange={changed}/>
                <TextField id="outlined-basic" required='true' label="Password" variant="outlined" name='password' type='password' 
                onChange={changed}/>
<button className='BlueButton' >Continue </button>
{
    loading &&
    <div className="loader" style={{paddingTop:'0px'}}><ScaleLoader
 size={50}
 color={'#2557a7'}
 borderwidth= {'10px'}
/></div>

}
                </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signin
