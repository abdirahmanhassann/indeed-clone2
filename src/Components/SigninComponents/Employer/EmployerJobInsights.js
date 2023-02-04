import { collection, getDocs } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../../ElementComponents/Header'
import Paragraphblue from '../../../ElementComponents/paragraphblue'
import Subaparagraph from '../../../ElementComponents/subaparagraph'
import { db } from '../../../Firebase/Firebase'
import EmployerNav from './EmployerNav'

function EmployerJobInsights() {
    const jobselector=useSelector(state=>state.reducer.clickedjobslicestatus.clickedjob);
    const [applicants,setapplicants]=useState()
    console.log(jobselector)

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