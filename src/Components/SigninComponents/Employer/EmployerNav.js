import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import pic from '../../../img/nn.png'
import './employer.css'
function EmployerNav() {
  return (
<nav color='employerName' className='employernav'>
<div className='subnav'>
<img src={pic} className='pic'/>
<a>Post a job</a>
<a>Find resumes</a>
</div>
<div className='subnav2'>
<a className="usericon2">Signin</a>
<a style={{borderLeft:' 1px solid #7c6f6f',paddingLeft:'12px'}}>Find jobs</a>
</div>
</nav>
    )
}

export default EmployerNav