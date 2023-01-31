import React from 'react'
import BlueButton from '../../../ElementComponents/bluebutton'
import EmployerNav from './EmployerNav'
 import picc from '../../../img/indeed-Hub-illustrations-09.png'
import Footer from '../../GeneralComponents/Footer'
import { useSelector } from 'react-redux'
import { employerlogin } from '../../../ReduxStore/Redux'
import { useNavigate } from 'react-router-dom'
function EmployerHome() {
    const navigate=useNavigate()
    function clicked(){
        if (employerlogin.employerlogin==true){
navigate('/EmployerHome/postjob')
}
else{
   // navigate('/signin')
    navigate('/EmployerHome/postjob')
        }
    }
  return (
    <>
<EmployerNav/>
<div className='largediv3'>
    <div className='sublargediv'>
<p className='largeitalic'>Let's hire your next great candidate. Fast.
</p>
<div style={{height:'fit-content',width:'300px'}}>
<BlueButton text={'Post a job'} click={clicked}/>
</div>
    </div>
    <img src={picc} className='largepic'/>
</div>
<Footer/>
    </>
    )
}

export default EmployerHome