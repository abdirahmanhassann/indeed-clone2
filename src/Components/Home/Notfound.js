import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../GeneralComponents/Footer";
import Nav from "../GeneralComponents/Nav";
 const Notfound=()=>{
    let navigate =useNavigate()
return(
    <>
    <Nav/>
    <div className="notfound">

    <span className="span2">error 404 -</span>
   <span className="span1"> Not found</span>
 {//  <Link className="inputbutton" to='/'> Return home</Link>
 }
 <button className="inputbutton" onClick={()=>{navigate('/')}}> Return Home</button>
    </div >
    <Footer/>
    </>

)
}
export default Notfound;