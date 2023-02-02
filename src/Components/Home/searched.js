import React, { useEffect, useRef,useLayoutEffect } from "react";
import Nav from "../GeneralComponents/Nav";
import { useState } from "react";
import ScaleLoader from "react-spinners/ClipLoader";
import {AiOutlineHeart} from 'react-icons/ai';
import {FaMoneyBillWave} from 'react-icons/fa'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { Link, useFetcher, useLocation } from "react-router-dom";
import {css} from "@emotion/react"
import Footer from "../GeneralComponents/Footer";
import BookData from "../../Data.json";
import Jobs from "../../Jobs.json"
import Paragraphblue from "../../ElementComponents/paragraphblue";
import Paragraph from "../../ElementComponents/paragraph";
import Subaparagraph from "../../ElementComponents/subaparagraph";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../Firebase/Firebase";

const Searched=(props)=>{
const location=useLocation();
  const [searched, setsearched] = useState({ whatd: location.state.whatd, whered: location.state.whered })
  const [exists,setexists]=useState(true)
    const [apidata, setapidata] = useState([]);
    const [jobapidata, setjobapidata] = useState([]);
    const [wordEntered, setWordEntered] = useState('');
    const [whatsearched, setwhatsearched] = useState('');
    const [isloading,setisloading]=useState(true)
    const [status,setstatus]=useState(true);
    //const [api,setapi]=useState(apifile);
    const api=useRef(null)
    const [apiclick,setapiclick]=useState(false)
    const [jobft,setjobft]=useState(null)
    const [whereexists,setwhereexists]=useState(true)
    const [apikey,setapikey]=useState('c20809c96dmsh0b41db4c1c11af4p1f6953jsn3cf0793e646b')
    const [borderstate,setborder]=useState({border:'1px solid lightgray'})
    const [isactive,setactive]=useState(false)
    const [externalApi,setexternalApi]=useState(0);
    const [fbjobs,setfbjobs]=useState();
 //  const [apitime,setapitime]=useState('')
const divstyle={
    cursor: 'pointer',
    borderBottom: '5px solid rgb(8 81 192 / 85%)',
    marginTop: '5px'
}  
  function changewhat(e) {
        let changed = e.target.value;
        setWordEntered(changed)
setwhereexists(true)
        const newFilter = BookData.filter((value) => {
return value.name.toLowerCase().includes(wordEntered.toLowerCase()) ;        
          });

    if (changed === "") {
      setapidata([]);
    } else {
      setapidata(newFilter);
    }
  
    
}
function jobchange(e){
    let changedd=e.target.value;
    setexists(true)
    setwhatsearched(changedd)
    const newjobFilter = Jobs.filter((value) => {
        return value.name.toLowerCase().includes(whatsearched.toLowerCase()) ;     
          });
    if (changedd === "") {
      setjobapidata([]);
    } else {
      setjobapidata(newjobFilter);
    
    }    
}



useEffect(()=>{
    const options = {
        method: 'GET',
        headers: {
          //  'X-RapidAPI-Key': 'ac7e8fcd59msha3e59fbda262531p147ad9jsn732b1de1990f',
            'X-RapidAPI-Key': '3080ae25famsh2a48333bf8619d4p118e5djsnbca874ca3480',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    }

    async function clicked(){
try{
const res=await  fetch('https://jsearch.p.rapidapi.com/search?query='+searched.whatd+'%20in%20'+searched.whered+'&num_pages=1', options)
    const jsonresult= await res.json()
         await setisloading(false)
          api.current=await jsonresult.data; 
}
catch(err){
    console.error(err)
         setstatus(false)
     setapikey('ac7e8fcd59msha3e59fbda262531p147ad9jsn732b1de1990f')
}
}
async function internalapi(){
    const  usersCollectionRef= await collection (db,'employer')
    const po=  await getDocs(usersCollectionRef)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
 console.log(userss);
let g=[]
userss.map((i)=>{
i.jobpostings.map((j)=>{
    g.push(j)
    
})
})
setfbjobs(g);
  //const check= await userss.find(i=>i.email==signin.email)
   //console.log(check)

}

    if(externalApi==1){
clicked();
    }
    else{{
        internalapi()
    }}
},[externalApi]);


const submit =(e)=>{
        e.preventDefault();
   //   const res=await apiasync();
   
   const options = {
    method: 'GET',
    headers: {
        //'3080ae25famsh2a48333bf8619d4p118e5djsnbca874ca3480'
        'X-RapidAPI-Key': 'c20809c96dmsh0b41db4c1c11af4p1f6953jsn3cf0793e646b',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
}
   fetch('https://jsearch.p.rapidapi.com/search?query='+whatsearched+'%20in%20'+wordEntered+'&num_pages=1', options)
   .then(response => response.json())
   .then(response => {
       setisloading(false)
       api.current=response.data;
   console.log(api.current)
   })
   .catch(err => {console.error(err)
   setstatus(false)
   setapikey('ac7e8fcd59msha3e59fbda262531p147ad9jsn732b1de1990f')
   });

    }        
    function clickeditem(item){
        setWordEntered(item);

    }
    const override= css`
    display:block;
    margin-left:500px;
    margin-top:100px
    border-width: 7px;

    ` ;
    return(
        <>
        <Nav/>
         <div className='div33'>
         <form className='inputdiv2' onSubmit={submit}  >
   
<input placeholder='job title,keywords,company' name='whatd'  onChange={jobchange} value={whatsearched} autocomplete="off"></input>
{jobapidata.length !=0 && exists &&(
<div className="dataResult2">
 
        {jobapidata.slice(0, 15).map((value, key) => {
    return(
    <div className="dataItem2" onClick={()=>{
        setwhatsearched(value.name) 
         setexists(false)}}  >
        <p>{value.name}</p>
        </div>
)})}
    </div>
    )}

 <input placeholder='city or postcode'  name='whered' onChange={changewhat} value={wordEntered} autocomplete="off"></input>
 {apidata.length !=0 && whereexists &&(
<div className="dataResult">
 
        { apidata.slice(0, 15).map((value,key) => {
    return(

    <div className="dataItem" key ={key} onClick={()=>{
        setWordEntered(value.name)
        setwhereexists(false)
        }}>
          <p>{value.name}</p>
        </div>
)})}
    </div>
    )}
<button className="searchbutton" >search</button>
   </form>
   </div>
   <div className="postjobsubdiv" style={{width:'100%',margin:'auto',borderBottom:'1px solid rgb(199 199 199)'
,borderRadius:'0px',padding:'0px',placeContent:'center',gap:'100px'
}}>
    <div onClick={()=>setexternalApi(0)} style={externalApi==0 ?  divstyle : {cursor:'pointer'}}>
        {
            externalApi==0?
<Paragraphblue text={'Internal job posts'}/>
:

<p style={{fontSize:'initial',marginTop:'18px',color:'#221f1fe8',fontWeight:'400',marginTop:'16.5px'}}> Internal job posts</p>
     }
    </div>
    <div onClick={()=>setexternalApi(1)} style={externalApi==1 ? divstyle :  {cursor:'pointer'}}>
        {
            externalApi==1?
<Paragraphblue text={'External job posts'} />
:
<p style={{fontSize:'initial',marginTop:'18px',color:'#221f1fe8',fontWeight:'400',marginTop:'16.5px'}}> External job posts</p>
        }
    </div>
   </div>
{   
 externalApi ==1 
 ?
isloading ? 
<div className="loader"><ScaleLoader
 size={150}
 margin-left={'500px'}
 color={'#2557a7'}
 borderwidth= {'7px'}
 css={override} 
/></div>
    :
// status ?
// <div> Api 429 Error</div>:
   api.current != null && api.current.length != 0 && 
<div className="apidiv">
   <div className="subapidiv">
{  api.current.map((value)=>{
    let header=value.job_title.slice(0,35);
let desc=value.job_description.slice(0,180)
    let qual=value.job_highlights.Qualifications
 //  setapitime(value.job_posted_at_datetime_utc)
let kkey=Math.random();
    return(
        <div className="apiinfo" key={kkey}  style={ borderstate} onClick={()=>{
            setapiclick(true) 
        setjobft(value)
        setactive((id)=>{
            return{
            ...false,
            id:true
          } })
    setborder( { border: isactive ? '1px solid #7373ff':'1px solid lightgray'})
    }
      
        }>
        <div className="headerdiv">
           <h2 className="apih" key={kkey} > {header} {header.length>34 &&<span>...</span>}</h2>
           <BiDotsVerticalRounded  className="svgdot"/>
           </div>
           <p className="apipara" key={kkey} > {value.employer_name}</p>
        { value.job_is_remote==true ? <p className="apipara" key={kkey} >Remote</p>
    : <p key={kkey} >{value.job_city}</p>    
    }
        <p key={kkey} >{qual}</p> 
        <span className="detspan">  {
            value.job_min_salary && value.job_max_salary&&
     <p className="salarypara"><FaMoneyBillWave/> £{value.job_min_salary}-£{value.job_max_salary}</p>  } 
     <p className="salarypara">{value.job_employment_type}</p>
     </span>
     <p className="descpara">{desc}...</p>
            </div>
    )
})}
</div>
<div>

{apiclick && <div className="applicationdiv">
    <button className="Xbutton" onClick={()=>setapiclick(false)} > X </button>
    <h2 className="apih">{jobft.job_title}</h2>
   { jobft.employer_website &&<a className="bluepara" href={jobft.employer_website.slice(12)}>{jobft.employer_name}.com</a>}
   <p className="bluepara">{jobft.employer_name}</p>
   <a href={jobft.job_apply_link}>
   <button className="uploadbutton" >Apply on company site</button>
  <button className="buttonn"><AiOutlineHeart className="svg"/></button>
   </a>
   { jobft.job_is_remote==true ? <p className="apipara">Remote</p>
    : <p>{jobft.job_city} • {jobft.job_employment_type}</p>    
}
    <p className="apipara">{jobft.job_description}</p>
  
</div>}
</div>
</div>
:
fbjobs &&
fbjobs.map((i)=>{

return(

    <div className="apiinfo">
     <Paragraphblue   text={i.title}/>
    </div>
)
})

}

   <Footer/>
        </>
    ) 
    }
export default Searched;