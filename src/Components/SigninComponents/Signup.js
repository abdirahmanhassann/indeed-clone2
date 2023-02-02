import React from 'react'
import './signin.css'
import svg from '../../img/indeedsignupsvg.avif'
import BlueButton from '../../ElementComponents/bluebutton'
import Paragraph from '../../ElementComponents/paragraph'
import { TextField } from '@mui/material'
import Footer from '../GeneralComponents/Footer'
import InverseButton from '../../ElementComponents/InverseButton'
import Subaparagraph from '../../ElementComponents/subaparagraph'
import { Link } from 'react-router-dom'
function Signup() {
  return (
    <>
                   <div className='largestdiv'>
            <div className='largediv'>
                <div className='signindiv2'>
                    <div className='subdiv2'>
                    <img src={svg} className='svg2'/>
                    <Paragraph text={'Welcome'}/>
                    </div>
                    <div className='subdiv3'>
                <Paragraph text={'Ready for the next step?'}/>
                <Subaparagraph text={'Create an account for tools to help you'}/>
                <Link to='./Employer' className='link'>
                
<InverseButton text={'Employer'} click={()=>console.log('clicked')}/>
                </Link>

                <Link to ='./jobseeker' className='link'>

<InverseButton text={'Job seeker'} click={()=>console.log('clicked')}/>
                </Link>
                    </div>

</div>
                </div>
            </div>
            <Footer />
    </>
  )
}

export default Signup