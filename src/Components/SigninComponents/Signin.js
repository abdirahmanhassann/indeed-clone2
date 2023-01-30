import React from 'react'
import Footer from '../GeneralComponents/Footer'
import Nav from '../GeneralComponents/Nav'
import logo from '../../img/indeedsvg.png'
import Header from '../../ElementComponents/Header'
import Paragraph from '../../ElementComponents/paragraph'
import Subaparagraph from '../../ElementComponents/subaparagraph'
import './signin.css'
import BlueButton from '../../ElementComponents/bluebutton'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
function Signin() {
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
                <TextField id="outlined-basic" label="Email" variant="outlined" />
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' 
                onChange={(e)=> console.log(e.target.value)}/>
<BlueButton text={'Continue'} click={()=>console.log('clicked')}/>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signin