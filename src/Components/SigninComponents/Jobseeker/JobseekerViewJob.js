import React from 'react'
import Nav from '../../GeneralComponents/Nav'
import { useSelector } from 'react-redux'
import Largeheader from '../../../ElementComponents/Largeheader'
import Paragraph from '../../../ElementComponents/paragraph'
import Paragraphblue from '../../../ElementComponents/paragraphblue'

function JobseekerViewJob() {
    const job=useSelector(state=>state.reducer.clickedjobslicestatus.clickedjob)
  return (
<>
<Nav/>
<div className='notificationslargediv'>
<div className='notificationssublargediv'>
<Largeheader text={job.title}/> 
<Paragraph text={job.location}/>
<div className='notificationsdivrowsmall' style={{justifyContent:'flex-start',gap:'10px',alignItems:'center'}}>
<Paragraphblue text={'Salary'}/>
<Paragraph text={ `£${job.min}- £${job.max}`}/>
</div>
<Paragraphblue text={'Description'}/>
<Paragraph text={job.description}/>

</div>
</div>
</>
    )
}

export default JobseekerViewJob