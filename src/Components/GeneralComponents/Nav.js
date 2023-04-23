import React, { useEffect, useRef, useState } from "react";
import logo from '../../img/indeelogo.jpg';
import {FaUser, FaUserAlt} from 'react-icons/fa' 
import {FaAlignJustify} from  'react-icons/fa' 
import {IoIosArrowForward, IoMdNotifications} from  'react-icons/io' 
import {RiMessage2Fill} from 'react-icons/ri'
import '../../App.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jobseekerchat, jobseekeremail, jobseekerlogin } from "../../ReduxStore/Redux";
import { AiFillFile, AiFillHeart } from "react-icons/ai";

const Nav=()=>{
    const [sidebar,setsidebar]=useState(false);
    const jobseekerloginselector=useSelector(state=>state.reducer.jobseekerloginstatus.jobseekerlogin);
    const email=useSelector(state=>state.reducer.jobseekeremailstatus.jobseekeremail);

    const dispatch=useDispatch();
    const navigate=useNavigate();
   const refOne=useRef(null);

    useEffect(()=>{
        document.addEventListener('click',outsideclick,true)
    //   if(sidebar==true)
    //   {  
    //     document.body.style.backgroundColor= '#787878';
    //     // document.body.style.backgroundBlendMode = 'darken'
    //     // document.body.style.backgroundBlendMode='multiply';
    // }
    //  else{
    //     document.body.style.backgroundColor= 'white';
    //     document.body.style.backgroundBlendMode = 'none';

    //   }
    },[sidebar])

    const outsideclick=(e)=>{
        if(!refOne.current.contains(e.target))
        {
setsidebar(false)

        }
        else
        {
return null;
        }
}

return(
    <>
    <nav>
    <img src={logo} className="indeedlogo" onClick={()=>navigate('/')}></img>
    <span className='navspan1'>
    <a className='a1' onClick={()=>navigate('/')}>Find jobs</a>
    <a className='a1' onClick={()=>{
    if(jobseekerloginselector==true){
        navigate('/Applications')
    }
    else {
        alert('You must sign in as a jobseeker to view Jobs')
    }
}}>My jobs</a>
    </span>
    <div className="divrow2">
    <span className='navspan2'>
        <RiMessage2Fill className='navbaricons' onClick={()=>{
            dispatch(jobseekerchat(null))
            navigate('/jobseekermessages')}}/>
        <IoMdNotifications className="navbaricons" onClick={()=>navigate('/jobseekernotifications')}/>
{
jobseekerloginselector==true ? 

<a className='a21'>
    
    <div className="dropdown">
  <FaUser className="navbaricons" style={{color:'#2a2a2a',height:'25px',width:'18px'}}/>
  <div class="dropdown-content">
    <p style={{fontWeight:'700'}}>{email}</p>
    <div className="subdropdownmenu">

    <span className="dropdownspan" onClick={()=> navigate('/jobseekerupdate')}>
         <AiFillFile className='navbaricons3'/> <p>Profile</p>
         </span>
    <span onClick={()=>navigate('/applications')} className="dropdownspan"> 
    <AiFillHeart className="navbaricons3" /> <p>My jobs </p> </span>

    </div>
    <div className="bottomdropdownmenu">
        <p onClick={()=>{
    dispatch(jobseekerlogin(false));
    dispatch(jobseekeremail(null));
    navigate('/')
    console.log(jobseekerloginselector)
}}>Sign out</p>
    </div>
  </div>
</div>

</a>

:
<Link to='/signin' className="link">
<a className='a21'>Sign in</a>
</Link>


}
    </span>

    <Link to='/EmployerHome' className="link">
    <a className='a2'>Employers / Post job</a>
    </Link>
    </div>
        <div className="smallnav">

{
jobseekerloginselector==true ?
<a className="usericon"><FaUserAlt/> Sign out</a>
:
<a className="usericon"><FaUserAlt/> Sign in</a>
}
    <a ><FaAlignJustify className="hamburger" onClick={()=>{setsidebar(true)}}/></a>
    {
        sidebar &&
        <nav className="sidebar" ref={refOne}>
       <div className="sidebarel"> <a>Find jobs</a>         <div className="sidebararrow"><IoIosArrowForward/></div></div>
       <div className="sidebarel"> <a>Company review</a>    <div className="sidebararrow"><IoIosArrowForward/></div></div>
      <div className="sidebarel"><a>Salary guide</a>        <div className="sidebararrow"><IoIosArrowForward/></div> </div>
      <div className="sidebarel"><a>Employers</a>           <div className="sidebararrow"><IoIosArrowForward/></div> </div>
      <div className="sidebarel"><a>Create your CV</a>      <div className="sidebararrow"><IoIosArrowForward/></div> </div>
      <div className="sidebarel"><a>Change your country</a> <div className="sidebararrow"><IoIosArrowForward/></div></div>
      <div className="sidebarel"><a>Help centre</a>         <div className="sidebararrow"><IoIosArrowForward/></div></div>
        </nav>
      

    }
    </div>
   
   </nav>
    </>
)
}
export default Nav;