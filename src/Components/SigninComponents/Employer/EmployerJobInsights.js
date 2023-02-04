import { collection, getDocs } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import Header from '../../../ElementComponents/Header'
import './employer.css'
import InverseButton from '../../../ElementComponents/InverseButton'
import Paragraph from '../../../ElementComponents/paragraph'
import Paragraphblue from '../../../ElementComponents/paragraphblue'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import { db, storagee } from '../../../Firebase/Firebase'
import EmployerNav from './EmployerNav'
import { getDownloadURL, ref } from '@firebase/storage'

function EmployerJobInsights() {
    const jobselector=useSelector(state=>state.reducer.clickedjobslicestatus.clickedjob);
    const [applicants,setapplicants]=useState()
    console.log(jobselector)

    const divstyle={
        background:'#f3f2f1',
        paddingBlock: '10px',
        paddingInline:'9px',
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        borderRadius:'2px',
        cursor:'pointer'
    }
    

    useEffect(()=>{
async function Candidatescheck(){

    const  usersCollectionRef= await collection (db,'jobseeker')
    const po=  await getDocs(usersCollectionRef)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
    await  console.log(userss);
   // const check= await userss.find(i=>i.email==email)
   let g=[]
   userss.map((i)=>{
    i.jobpostings.map((j)=>{
        if(j.title==jobselector.title){
 return g.push(i)
        }
        else return null
    })
    console.log(g)
    setapplicants(g);
   }) 

}
Candidatescheck();
    },[])
        
    // function cvfunction()
    // {
    //     getDownloadURL(ref(storage, `jobseeker/${}`))
    // }
  return (
    <>
    <EmployerNav/>
    {
  jobselector==false ?
  
  <Header text={'loading'}/>
  :
<div className='largedivpostjob'>
{
    applicants &&
    applicants.map((i)=>{
        return(

            <div className='postjobsubdiv' >
<div className='columndiv'>
<Paragraphblue text={i.Firstname+' '+i.Surname}/>
<Subaparagraph text={i.city}/>
<Subaparagraph text={i.country}/>
  </div>
  <div className='columndiv'>
    <Paragraphblue text={'Skills'}/>
    {
        i.skills.length > 0 &&
i.skills.map((j, index=0)=>{
index++
if(index<=2) return <Subaparagraph text={j} style={{border:'1px solid light-gray', borderRadius:'5px',padding:'5px'}}/>
else return null;
})
    }
    </div>
  <div className='columndiv'>
  <Paragraphblue text={i.role}/>
<Subaparagraph text={i.RecentExperience}/>
<Subaparagraph text={i.startdate+'-'+i.enddate}/>
    </div>
    <InverseButton text={'view CV'} click={()=>{
          const po=  getDownloadURL(ref(storagee, `jobseeker/${i.email}`)).then((url)=>
                {
                    console.log(url);
                   window.open(url)
                })
    }}/>

    <div className='postjobsubdiv5' style={{paddingBlock:'10px'}}>
  <div className='columndiv' style={divstyle}>
<AiOutlineCheck style={{height:'20px',width:'20px',color:'rgb(22, 64, 129)'}}/>
  </div>
  <div className='columndiv' style={divstyle}>
<AiOutlineClose style={{height:'20px',width:'20px',color:'rgb(22, 64, 129)'}}/>
  </div>
  </div>
   
    </div>
            )
    })
}
    </div>
    }
    </>
  )
}

export default EmployerJobInsights