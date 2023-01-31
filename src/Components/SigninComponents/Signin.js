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
import { useDispatch } from 'react-redux'
import { employerlogin } from '../../ReduxStore/Redux'
function Signin() {
const [signin,setsignin]=useState({email:'',password:''})
const [err,seterr]=useState(false);
const navigate=useNavigate()
const dispatch=useDispatch()
function changed(e){
     
    console.log(signin)
    setsignin(i=>
 {     
return{ 
 ...i,
    [e.target.name]:e.target.value
    }
}
)

}
async function signinclick(){
    const  usersCollectionRef= await collection (db,'employer')
    const po=  await getDocs(usersCollectionRef)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
  await  console.log(userss);
  const check= await userss.find(i=>i.email==signin.email)
   console.log(check)
   if (check==undefined|| check.email==signin.email && check.password!=signin.password )
{

    seterr(true)
}
else {
    dispatch(employerlogin(true));
    navigate('/Employerhome')

}
}
return (
        <>
                <div className='largestdiv'>
            <div className='largediv'>
                <img src={logo} className='logo' />
                <div className='signindiv'>
                    <div className='subdiv'>
                        <Header text={'Ready to take the next step?'}/>
<Paragraph text={'Create an account or sign in.'}/>
<Subaparagraph text={`By creating an account or logging in, you understand and agree to Indeed's Terms. You also acknowledge our Cookie and Privacy policies. You will receive marketing messages from Indeed and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.`}/>
                    </div>
                    <Link to='/signup' className='link'>
                <BlueButton text={'Create an account'}/>
                    </Link>
                <Paragraph text={'or login to your account'}/>
                
                {  err==true &&
               <p style={{color:'red',fontSize: '13px'}}>please enter the valid email/password</p>
                }
                <TextField id="outlined-basic" label="Email" variant="outlined" name='email'  onChange={changed}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" name='password' type='password' 
                onChange={changed}/>
<BlueButton text={'Continue'} click={signinclick}/>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signin