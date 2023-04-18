import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import EmployerNav from './EmployerNav';
import chat from './../../../img/chat.svg'
import Paragraph from '../../../ElementComponents/paragraph';
import Header from '../../../ElementComponents/Header';
import { addDoc, arrayUnion, collection, doc, limit, onSnapshot, orderBy, query, setDoc } from '@firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import { useSelector } from 'react-redux';
import ScaleLoader from "react-spinners/ClipLoader";
import Subaparagraph from '../../../ElementComponents/subaparagraph';
import BlueButton from '../../../ElementComponents/bluebutton';
import { RiCurrencyFill } from 'react-icons/ri';
import moment from 'moment';
import userchat from '../../../img/userchaticon.png'
import companychat from '../../../img/companychaticon.png'

function EmployerMessages() {
    const [messages, setMessages] = useState([]);
    const change=useRef('')
    const employerchat=useSelector(state=>state.reducer.employerchatstatus.employerchat);
    const email=useSelector(state=>state.reducer.employeremailstatus.employeremail.email);
    const [current,setcurrent]=useState(employerchat)
    const [loading,setloading]=useState(false)
    const dummy = useRef();

    useEffect(() => {
        setloading(true)
        const q = query(
            collection(db, "messages"),
            orderBy("data.createdAt"),
            limit(50)
            
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let messages = [];
        QuerySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
        console.log(messages)
        if(employerchat)
        {
                const g=messages.find(i=>i.data.employer===email && current?.data.jobseeker==i.data.jobseeker)
                setcurrent({data:g.data,messages:g.messages,id:g.id})
            }
            else{
               const ge= messages.find(i=>i.data.employer===email)
               if(ge) return setcurrent(ge)
            }
            console.log(current)
            setloading(false)
           // dummy.current.scrollIntoView({ behavior: 'smooth' });
        
    });
    
    return () => unsubscribe;
}, []);

async function submitted(e)
    {
  e.preventDefault()
  const m=change.current.value
        console.log(current.id)
        if (change.current.value.trim().length === 0) return null
        change.current.value=''
 await setDoc(doc(db,'messages',current.id),{messages:arrayUnion({message:m,sender:email,createdAt:Date.now()})},{merge:true})
    }

    function currentfunc(i){
        setcurrent({data:i.data,messages:i.messages,id:i.id})
    }
    return (
<>
<EmployerNav/>
<div className='notificationslargediv3'>
    <div className='chatlist'>
        <div className='chatlistheader'>
        <Header text={'Messages'}/>
        </div>
        {
        loading && 
        messages.map((i)=>{
            const length=i.messages?.length-1
            console.log(length)
            return(   
            <div className={current.data?.jobseekerName===i.data?.jobseekerName ?'chatlistdiv2':'chatlistdiv' }
             onClick={()=>currentfunc(i)}>
<div className='notificationsdivrow' style={{color:'#6a6a6a'}}>
                 <p className='boldchatparagraph'>{i.data.jobseekerName}</p>
                 <p className='smallchatdiv'>{moment(length > 0 && i.messages[length].createdAt).fromNow()} </p>
             </div>
             <p className='chatlistparagraph'> {length > 0 && i.messages[length].message}</p>
                </div>
        )})
        }
        </div>
        <div className='chatroom'>
  { !loading ? (
    <div className="loader">
      <ScaleLoader size={50} color={'#2557a7'} borderWidth={'10px'} />
    </div>
  ) : 
    
  (
    current ?
    (
        <>
                <div className='chatlistheader' style={{borderBottom:'1px solid lightgray'}}>
        <Header text= {current.data.jobseekerName}/>
        <Subaparagraph text={`${current.data.city} ${current.data.country}`}/>
        </div> 
        <div className='chatroomscroll'>
           {
            current.messages&&
                current.messages.map((i)=>{
                    return (
                        <div className='chatdivrow'>
                        <img src={i.sender===email? companychat:userchat } className='chatimage'/>
                        <div className='smallchatdivrow'>
                        <div className='chatdivrow'>
                        <p className='boldchatparagraph'> {i.sender===email? 'You': i.sender}</p>
                        <p className='smallparagraph'> {i.createdAt&& moment(i.createdAt).fromNow()}</p>
                        </div>
                        <p className='chattext'>{i.message}</p>
                        <span ref={dummy}></span>
                        </div>
                        </div>
                        )
                    })
           }
        </div>
        <form className='inputdivchat' onSubmit={submitted} >
           <input placeholder='write your message' className='inputchat'
           ref={change}/>
           <BlueButton text={'Send'}/>
            </form>
              </>) : (
      <>
        <img src={chat} className='chatlogo'/>
        <Paragraph text={'Select a conversation to read'}/>
      </>
    )
  )}
</div>
   
            
</div>

</>

    )
}

export default EmployerMessages