import React, { useEffect, useRef, useState } from "react";
import logo from '../../img/indeelogo.jpg';
import {FaUserAlt} from 'react-icons/fa' 
import {FaAlignJustify} from  'react-icons/fa' 
import {IoIosArrowForward} from  'react-icons/io' 
import '../../App.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jobseekeremail, jobseekerlogin } from "../../ReduxStore/Redux";
 const Nav=()=>{
    const [sidebar,setsidebar]=useState(false);
    const jobseekerloginselector=useSelector(state=>state.reducer.jobseekerloginstatus.jobseekerlogin);
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
    <img src={logo} className="indeedlogo"></img>
    <span className='navspan1'>
    <a className='a1'>Find jobs</a>
    <a className='a1'>Company reviews</a>
    <a className='a1'>Salary guide</a>
    </span>
    <span className='navspan2'>
<a className='a2'>Applications</a>
{
jobseekerloginselector==true ? 

<a className='a21' onClick={()=>{
    dispatch(jobseekerlogin(false));
    dispatch(jobseekeremail(null));
    navigate('/')
    console.log(jobseekerloginselector)
}}>Sign out</a>

:
<Link to='/signin' className="link">
<a className='a21'>Sign in</a>
</Link>


}
    </span>

    <Link to='/EmployerHome' className="link">
    <a className='a2'>Employers / Post job</a>
    </Link>
    
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