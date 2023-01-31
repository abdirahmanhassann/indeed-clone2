import React from 'react'
import BlueButton from '../../../ElementComponents/bluebutton'
import EmployerNav from './EmployerNav'
 import picc from '../../../img/indeed-Hub-illustrations-09.png'
import Footer from '../../GeneralComponents/Footer'
import { useSelector } from 'react-redux'
function EmployerHome() {
  return (
    <>
<EmployerNav/>
<div className='largediv3'>
    <div className='sublargediv'>
<p className='largeitalic'>Let's hire your next great candidate. Fast.
</p>
<div style={{height:'fit-content',width:'300px'}}>
<BlueButton text={'Post a job'}/>
</div>
    </div>
    <img src={picc} className='largepic'/>
</div>
<Footer/>
    </>
    )
}

export default EmployerHome