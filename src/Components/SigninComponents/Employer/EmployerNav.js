import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import pic from '../../../img/nn.png'
import './employer.css'
function EmployerNav() {
    const employerlogin=useSelector((state)=>state.reducer.employerloginstatus)
console.log(employerlogin)
  return (

<nav color='employerName' className='employernav'>
<div className='subnav'>
<img src={pic} className='pic'/>
<a>Post a job</a>
<a>Find resumes</a>
</div>
<div className='subnav2'>
<a className="usericon2">{employerlogin==false ? 'Sign in' : 'Sign out'}</a>
<a style={{borderLeft:' 1px solid #7c6f6f',paddingLeft:'12px'}}>Find jobs</a>
</div>
</nav>
    )
}

export default EmployerNav