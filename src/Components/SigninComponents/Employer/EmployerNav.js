import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import pic from '../../../img/nn.png'
import { employerchat, employeremail } from '../../../ReduxStore/Redux'
import { employerlogin } from '../../../ReduxStore/Redux'
import './employer.css'
import { RiMessage2Fill } from 'react-icons/ri'
import { IoMdNotifications } from 'react-icons/io'
function EmployerNav() {
    const employerloginn=useSelector((state)=>state.reducer.employerloginstatus);
    const navigate=useNavigate();
    const dispatch=useDispatch();
console.log(employerloginn.employerlogin)

function clicked(){
    if(employerloginn.employerlogin==true){
       // navigate('/')
        dispatch(employerlogin(false))
        dispatch(employeremail(null));

        }
    else{
        navigate('/signin')
    }
}
  return (
<nav color='employerName' className='employernav'>
    <div className='subnavdiv'>
<div className='subnav'>
<img src={pic} className='pic' onClick={()=>navigate('/employerhome')} style={{cursor:'pointer'}}/>

<a onClick={()=>{
     if(employerloginn.employerlogin==true){
        navigate('/EmployerHome/Postjob')
    }
        else{
            alert('Please signin as employer');
        }
    }
}
style={{cursor:'pointer'}}
>Post a job</a>

<a onClick={()=>{
     if(employerloginn.employerlogin==true){
        navigate('/EmployerHome/EmployerDashboard')
    }
        else{
            alert('Please signin as employer');
        }
    }
}  style={{cursor:'pointer'}}>Dashboard</a>
</div>
<div className='subnav2' style={{gap:'25px'}}>
<RiMessage2Fill className='navbaricons' style={{marginTop:'0px'}} onClick={
    ()=>{
        dispatch(employerchat(null))
        navigate('/employerhome/employermessages')
}}/>
<IoMdNotifications className='navbaricons' style={{marginTop:'0px'}} onClick={
    ()=>{
        navigate('/employerhome/employernotifications')
}}/>

<a className="usericon2" onClick={clicked}>{employerloginn.employerlogin==false ? 'Sign in' : 'Sign out'}</a>
<a style={{borderLeft:' 1px solid #7c6f6f',paddingLeft:'25px',cursor:'pointer'}}
onClick={()=>navigate('/')}
>Find jobs</a>
</div>
</div>
</nav>
    )
}

export default EmployerNav