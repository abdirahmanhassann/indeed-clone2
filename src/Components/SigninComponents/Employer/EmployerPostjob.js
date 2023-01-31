import React from 'react'
import Paragraph from '../../../ElementComponents/paragraph'
import EmployerNav from './EmployerNav'
import picc from '../../../img/Employer-Frequently-Asked-Questions.png'
import Header from '../../../ElementComponents/Header'
import Largeheader from '../../../ElementComponents/Largeheader'
import { TextField } from '@mui/material'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import BlueButton from '../../../ElementComponents/bluebutton'
import InverseButton from '../../../ElementComponents/InverseButton'
function Postjob() {
  return (
    <div>
        <>
        <EmployerNav/>
        <div className='largedivpostjob'>
            <div className='postjobsubdiv'>
<Largeheader text={'Provide basic information'} style={{fontSize:'25px'}}/>
<img src={picc} className='postjobpic'/>
            </div>
            <div className='postjobsubdiv2'>
<Header text={'Job title'}/>
<TextField id="outlined-basic" label="Job title" variant="outlined" sx={{width:'90%'}}/>
            </div>
            <div className='postjobsubdiv2'>
<Header text={'Where will the employee report to work?'}/>
<TextField id="outlined-basic" label="Location" variant="outlined" sx={{width:'90%'}}/>
            </div>
            <div className='postjobsubdiv2'>
<Header text={'What is the salary you are willing to provide?'}/>
<Subaparagraph text={'GBP is the default currency'}/>
<TextField id="outlined-basic" label="salary" type='number' variant="outlined" sx={{width:'90%'}}/>
            </div>
            <div className='postjobsubdiv'>
<InverseButton text={'Back'}/>
<BlueButton text = {'Continue'}/>
            </div>
            
        </div>
        </>
    </div>
  )
}

export default Postjob