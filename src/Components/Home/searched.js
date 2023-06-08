import React, { useEffect, useRef,useLayoutEffect } from "react";
import Nav from "../GeneralComponents/Nav";
import { useState } from "react";
import ScaleLoader from "react-spinners/ClipLoader";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {FaBriefcase, FaMoneyBillWave} from 'react-icons/fa'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { Link, useFetcher, useLocation } from "react-router-dom";
import {css} from "@emotion/react"
import Footer from "../GeneralComponents/Footer";
import BookData from "../../Data.json";
import Jobs from "../../Jobs.json"
import Paragraphblue from "../../ElementComponents/paragraphblue";
import Paragraph from "../../ElementComponents/paragraph";
import Subaparagraph from "../../ElementComponents/subaparagraph";
import { arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "../../Firebase/Firebase";
import moment from "moment/moment";
import Header from "../../ElementComponents/Header";
import { useSelector } from "react-redux";
import { jobseekeremail } from "../../ReduxStore/Redux";
import { async } from "@firebase/util";
import BlueButton from "../../ElementComponents/bluebutton";
import notfound from '../../img/notfound.png'
import Largeheader from "../../ElementComponents/Largeheader";
const Searched=(props)=>{
const location=useLocation();
  const [searched, setsearched] = useState({ whatd: location.state.whatd, whered: location.state.whered })
  const [exists,setexists]=useState(true)
    const [apidata, setapidata] = useState([]);
    const [jobapidata, setjobapidata] = useState([]);
    const [wordEntered, setWordEntered] = useState(location.state.whered);
    const [whatsearched, setwhatsearched] = useState(location.state.whatd);
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
    const [clickedjob,setclickedjob]=useState(false);
    const jobseekerlogin=useSelector(state=>state.reducer.jobseekerloginstatus.jobseekerlogin);
    const jobseekeremaill=useSelector((state)=>state.reducer.jobseekeremailstatus.jobseekeremail);
    const [applyclickstate,setapplyclickstate]=useState(false);
    const [applied,setapplied]=useState(false)
    const [research,setresearch]=useState(false);
    const [saved,setsaved]=useState(false)
    const [employerinfo,setemployerinfo]=useState()
 // const [apitime,setapitime]=useState('')

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
    setclickedjob(false)
    setisloading(true)
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
async function internalapi1(){
    setclickedjob(false)
    const  usersCollectionRef= collection (db,'employer')
    const po=  await getDocs(usersCollectionRef)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
    setemployerinfo(userss)
let g=[]

userss.map((i)=>{
    if(i.jobpostings.length >0){
i.jobpostings.map((j)=>{
 j={
        ...j,
        name:i.name,
        id:i.id
 }
    g.push(j)
})
    }
})

const internaljobfilter = await g.filter((i) => {
    return i.title.toLowerCase().includes(whatsearched.toLowerCase()) &&
    i.location.toLowerCase().includes(wordEntered.toLowerCase())
})
await setfbjobs(internaljobfilter)
await setisloading(false)
//setisloading(false)
}

    if(externalApi==1){
clicked();
    }

    else{
        internalapi1()
    }
},[externalApi]);

const submit =(e)=>{
        e.preventDefault();
        setclickedjob(false)
   //   const res=await apiasync();
}  
useEffect(()=>{

    
    async function reenter() 
    {
        setisloading(true)
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
    })
    .catch(err => {
        
        setstatus(false)
        setapikey('ac7e8fcd59msha3e59fbda262531p147ad9jsn732b1de1990f')
    });
} 
async function internalapi(){
    setisloading(true)
    const  usersCollectionRef= await collection (db,'employer')
    const po=  await getDocs(usersCollectionRef)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
let g=[]

userss.map((i)=>{
    if(i.jobpostings ){
        setfbjobs(i)
i.jobpostings.map((j)=>{
 j={
        ...j,
        name:i.name,
        id:i.id
 }
 if(j.status&& j.status===true) {
     g.push(j)
 }
})
    }
})

    const internaljobfilter =  g.filter((i) => {
           return i.title.toLowerCase().includes(whatsearched.toLowerCase()) &&
           i.location.toLowerCase().includes(wordEntered.toLowerCase())
       })
 setfbjobs(internaljobfilter)
  setisloading(false)
} 

if(externalApi==1){

reenter();
}
else { 
    internalapi()
}
},[research])

    function clickeditem(item){
        setWordEntered(item);
    }
    const override= css`
    display:block;
    margin-left:500px;
    margin-top:100px
    border-width: 7px;

    ` ;
    
    useEffect(()=>{

        async function applyclick(){
      
            if(clickedjob==true){
                const  usersCollectionRef2= collection (db,'jobseeker')
                const po2=  await getDocs(usersCollectionRef2)
                const  userss2=  po2.docs.map((i)=>{return{...i.data(),id:i.id}})
                setclickedjob(true)
              const check2=  userss2.find(i=>i.email==jobseekeremaill)
    setapplied(true);
    await setDoc(doc(db,'jobseeker',check2.id),{jobpostings:arrayUnion(jobft) },{merge:true})
    employerinfo.forEach((i)=>{
        i.jobpostings.forEach(async (j)=>{
            if(j.title + j.description==jobft.title + jobft.description)
            {
            await setDoc(doc(db,'employer',i.id),
            {notifications:arrayUnion(
                {createdAt:Date.now(),
                    title:jobft.title,
                event:'Application',
                email:jobseekeremaill,
                jobft:jobft
                }
                ) },{merge:true})
        }
    })
 })  
}
if(isloading==false){

    if(jobseekerlogin==false){
        
        alert('Please sign in as a jobseeker')
    }
}
}
applyclick()
    },[applyclickstate])


    useEffect(()=>{
async function checker(){
        const  usersCollectionRef2= await collection (db,'jobseeker')
        const po2=  await getDocs(usersCollectionRef2)
            const  userss2= await po2.docs.map((i)=>{return{...i.data(),id:i.id}})
          const check2= await userss2.find(i=>i.email==jobseekeremaill)          
          setsaved(false) 
          if(check2.savedjobs){
            const postingchecker=check2.savedjobs.find(i=>i.title+i.description===jobft.title+jobft.description)
            if(postingchecker) { 
                setsaved(true)
            }
          }

          if(check2.jobpostings){
        const postingchecker=check2.jobpostings.find(i=>i.description+i.title==jobft.description+jobft.title)
        //const savedjobs
if(postingchecker)
{
    setapplied(true)
    setclickedjob(true)
}
else{
    return null
}}
}
checker();
    },[jobft])

   async function functionSaved(i){
setsaved(i=>!i)
const  usersCollectionRef2= collection (db,'jobseeker')
const po2= await getDocs(usersCollectionRef2)
    const  userss2=  po2.docs.map((i)=>{return{...i.data(),id:i.id}})
  const check2= userss2.find(i=>i.email==jobseekeremaill)
if(saved===false){
    setsaved(true)
      await setDoc(doc(db,'jobseeker',check2.id),{savedjobs:arrayUnion(i) },{merge:true})

}
else{
    setsaved(false)
    await updateDoc(doc(db,'jobseeker',check2.id),({savedjobs:arrayRemove(i)}))

}

    }
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
 {
 apidata.length !=0 && whereexists &&(
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
    <div className="linksmall">
<BlueButton text={'Find jobs'}  click={()=>setresearch(i=>!i)}/>
    </div>
   </form>
   </div>
   <div className="postjobsubdiv" style={{width:'100%',margin:'auto',borderBottom:'1px solid rgb(199 199 199)'
,borderRadius:'0px',padding:'0px',placeContent:'center',gap:'100px'
}}>
    <div onClick={()=>setexternalApi(0)} style={externalApi==0 ?  divstyle : {cursor:'pointer'}}>
        {
            externalApi==0 ?
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
let desc=value.job_description.slice(0,230)
    let qual=value.job_highlights.Qualifications
    let timeposted=moment(value.job_posted_at_datetime_utc).fromNow()
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
       {/* <p key={kkey} >{qual}</p>  */}
        <span className="detspan">  {
            value.job_min_salary && value.job_max_salary&&
     <p className="salarypara"><FaMoneyBillWave/> £{value.job_min_salary}-£{value.job_max_salary}</p>  } 
     <p className="salarypara">{value.job_employment_type}</p>
     </span>
     <p className="descpara">{desc}...</p>
     <Subaparagraph text={`Posted ${timeposted}`}/>
            </div>
    )
})}
</div>
<div>

{
apiclick && <div className={window.innerWidth > 803 ? 'applicationdiv' :'applicationdivsmall'}>
    <button className="Xbutton" onClick={()=>setapiclick(false)} > X </button>
    <h2 className="apih">{jobft.job_title}</h2>
   { jobft.employer_website &&<a className="bluepara" href={jobft.employer_website.slice(12)}>{jobft.employer_name}.com</a>}
   <p className="bluepara">{jobft.employer_name}</p>
   <button className="uploadbutton" onClick={()=> window.open(jobft.job_apply_link)} >Apply on company site</button>
  <button className="buttonn"><AiOutlineHeart className="svg"/></button>
   { jobft.job_is_remote==true ? <p className="apipara">Remote</p>
    : <p>{jobft.job_city} • {jobft.job_employment_type}</p>    
}
    <p className="apipara">{jobft.job_description}</p>
  
</div>}
</div>
</div>
:
isloading ? 
<div className="loader"><ScaleLoader
 size={150}
 margin={'auto'}
 color={'#2557a7'}
 borderwidth= {'7px'}
 css={override} 
/></div>
    :

fbjobs &&
<>
<div className="apidivsearch">
<div className="subapidiv">
{fbjobs.length==0 ?
<>
        <div style={{paddingInline:'7%'}}>

    <Largeheader text={'Not too many searches found unfortunately'}/>
    <Paragraphblue text={'Try a different search'}/>
    <Paragraphblue text={'Or try looking through External jobs for better results'}/>
    <img src={notfound} style={{height:'200px',width:'auto'}}/>
</div>
</>

    :

    fbjobs.map((i)=>{
    const timeago=moment(i.createdAt).fromNow();
    i={
        ...i,
timeago:timeago
    }
    return(
        <div className="apidiv">

        <div className="apiinfo" onClick={()=>{
            setapplied(false)
            setclickedjob(true) 
        setjobft(i)
        setactive((id)=>{
            return{
            ...false,
            id:true
          } })}}>
        <div className="headerdiv">
     <p className="apih44"  >{i.title}</p>
</div>
     <p className="apih">{i.name}</p>
     <p className="apih">{i.location}</p>
     <span className="detspan">  {
            
     <p className="salarypara"><FaMoneyBillWave/> £{i.min}-£{i.max} {i.rate}</p>  } 
     <p className="salarypara"><FaBriefcase/>{i.time}</p>
     </span>
     {
i.description.length > 251 ? 
     <p className="apipara11">{i.description.slice(0,250)}...</p>
     :
     <p className="apipara11">{i.description}</p>
     }
     <div style={{position:'absolute',bottom:'5px'}}>
        <Subaparagraph text={`posted ${timeago}`}/>
     </div>
    </div>    
</div>
)})}
</div>
{
    clickedjob==true &&
    <div className="applicationdiv">
    <button className="Xbutton" onClick={()=>setclickedjob(false)} >X </button>
    <h2 className="apih">{jobft.title}</h2>
    <p className="bluepara">{jobft.name} </p>
    <p className="apih" style={{fontSize:'16px'}}>{jobft.time}</p>
    {
        jobseekerlogin==true ?
        <button className="uploadbutton"  onClick={()=>{  
       applied==false && setapplyclickstate(i=>!i) 
    }

            
        }>{applied==true ? 'Application sent' :'Apply now'}</button>
        :
        <button className="uploadbutton"  onClick={()=>alert('Please login to apply')}>Apply now</button>
    }
  <button className="buttonn" onClick={()=>jobseekerlogin ? functionSaved(jobft): alert('Please login to save job')}>
    {
        saved?
<AiFillHeart className='svg'/>    
        :
        <AiOutlineHeart className="svg"/>
}
    
    </button>
<Header text={'Job details'}/>

    <p className="apih" style={{fontWeight:'bold',marginTop:'10px'}} >Salary</p>
    <p className="apih" style={{fontSize:'15.5px'}}> £{jobft.min}-£{jobft.max} {jobft.rate}</p>
    <p className="apih" style={{fontWeight:'bold',marginTop:'10px'}} >Job type</p>
    <p className="apih" style={{fontSize:'15.5px'}}>{jobft.time}</p>
    <p className="apih" style={{fontWeight:'bold',marginTop:'10px'}} >Description</p>
    <p className="apih" style={{fontSize:'15.5px'}}>{jobft.description}</p>
    <p className="apih" style={{fontWeight:'bold',marginTop:'10px'}} >Hiring Insights</p>
    <p className="apih" style={{fontSize:'15.5px'}}>Posted {jobft.timeago}</p>
    </div>
    }
</div>
</>
}
   <Footer/>
        </>
    ) 
    }
export default Searched;