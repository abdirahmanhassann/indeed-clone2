import React from "react";
import '../../App.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer =()=>{
const navigate=useNavigate()
const jobseekeremaill=useSelector((state)=>state.reducer.jobseekeremailstatus.jobseekeremail);

function upload(){
if(jobseekeremaill==null) return navigate('/signin')
navigate('/jobseekerupdate')
}
    return(
<footer>
  <ul className='ul1'>
  <a className='footerlink'>Hiring lab</a>
  <a className='footerlink'>Career advice</a>
  <a className='footerlink'>Browse jobs</a>
  <a className='footerlink'>Browse companies</a>
  <a className='footerlink'>Browse salaries</a>
  <a className='footerlink'>Hiring lab</a>
  <a className='footerlink'>Career advice</a>
  <a className='footerlink'>Browse jobs</a>
  <a className='footerlink'>Browse companies</a>
  <a className='footerlink'>Browse salaries</a>
  </ul>
  <ul className='ul2'>
<a className='footerlink'>2022 indeed</a>
<a className='footerlink'> anti-slavery statement</a>
<a className='footerlink'>Accessebility at Indeed</a>
<a className='footerlink'>Privacy centre</a>
<a className='footerlink'>Cookies</a>
<a className='footerlink'>Privacy</a>
<a className='footerlink'>terms</a>
  </ul>
  <div className='div6'>
<h2>Let employers find you</h2>
<button className='uploadbutton' onClick={upload}>Upload your CV</button>
  </div>
</footer>

    )
}
export default Footer;