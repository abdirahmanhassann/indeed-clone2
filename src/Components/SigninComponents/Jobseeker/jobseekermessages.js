import React, { useEffect, useRef, useState } from 'react'
import chat from './../../../img/chat.svg'
import Paragraph from '../../../ElementComponents/paragraph';
import Header from '../../../ElementComponents/Header';
import { addDoc, arrayUnion, collection, doc, limit, onSnapshot, orderBy, query, setDoc } from '@firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import ScaleLoader from "react-spinners/ClipLoader";
import Subaparagraph from '../../../ElementComponents/subaparagraph';
import BlueButton from '../../../ElementComponents/bluebutton';
import { RiCurrencyFill } from 'react-icons/ri';
import moment from 'moment';
import userchat from '../../../img/userchaticon.png'
import companychat from '../../../img/companychaticon.png'
import { jobseekerchat } from '../../../ReduxStore/Redux';
import Nav from '../../GeneralComponents/Nav';


function Jobseekermessages() {
    const [messages, setMessages] = useState([]);
    const change=useRef('')
    const employerchatselector=useSelector(state=>state.reducer.jobseekerchatstatus.jobseekerchat);
    const email=useSelector(state=>state.reducer.jobseekeremailstatus.jobseekeremail);
    const [current,setcurrent]=useState(null)
    const [loading,setloading]=useState(false)
    const [reload,setreload]=useState(false)
    const dispatch=useDispatch()
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
      const newmesages=  messages.filter((i)=>{return i.data.jobseeker===email})
        setMessages(newmesages);
        if(employerchatselector && employerchatselector.initial==true)
        {
                const g=messages.find(i=>i.data.jobseeker===email && employerchatselector?.data.employer==i.data.employer)
                setcurrent({data:g.data,messages:g.messages,id:g.id})
                setloading(false)
                
            }
            else if(employerchatselector && employerchatselector.initial==false){
                const ge= messages.find(i=>i.data.jobseeker===email && i.data.employer==employerchatselector.data.employer  )
                if(ge) {
                    setcurrent(ge)
   
                    setloading(false)
                }
            }
            else if (jobseekerchat==null){
                setcurrent(email)
                setloading(false)

            }
            setloading(false)
        
    });
     return () => unsubscribe;
}, []); 

async function submitted(e)
    {
  e.preventDefault()
  const m=change.current.value
        if (change.current.value.trim().length === 0) return null
        change.current.value=''
        await setDoc(doc(db,'messages',current.id),{messages:arrayUnion({message:m,sender:email,createdAt:Date.now()})},{merge:true})
        dummy.current.scrollIntoView({ behavior: 'smooth' });
        setreload(!reload)
    }
    
    function currentfunc(i){
     //   dummy.current.scrollIntoView({ behavior: 'smooth' });
        setloading(false)
        setcurrent({data:i.data,messages:i.messages,id:i.id})
        dispatch(jobseekerchat({data:i.data,id:i.id,initial:false}))
    }
    return (
<>
<Nav/>
<div className='notificationslargediv3' style={{marginTop: '-58px'}}>
    <div className='chatlist'>
        <div className='chatlistheader' style={{padding:' 7px 16px',
    borderBottom: '1px solid #e0e0e0'}}>
        <Header text={'Messages'}/>
        </div>
        {
        messages && messages.map((i)=>{
            const length=i?.messages?.length-1
            const employername=i?.data?.employer
            return(   
              i.messages && 
                    <>
                    {
            <div className={current?.data?.employer===i?.data?.employer ?'chatlistdiv2':'chatlistdiv' }
             onClick={()=>currentfunc(i)}>
            <div className='notificationsdivrow' style={{color:'#6a6a6a'}}>
                 <p className='boldchatparagraph'>{employername.length>12 ? employername.slice(0,12)+'...' : employername}</p>
                 <p className='smallchatdiv'>{moment(length > 0 && i?.messages[length].createdAt).fromNow()} </p>
             </div>
             <p className='chatlistparagraph'> {length>0 &&  i?.messages[length]?.message?.length>30 ?
                i?.messages[length].message?.slice(0,30) +' ...' : i?.messages[length].message  }</p>
                </div>
        }
          </>
        )})
        }
        </div>
        <div className='chatroom'>
  {  loading ? (
    <div className="loader">
      <ScaleLoader size={50} color={'#2557a7'} borderWidth={'10px'} />
    </div>
  ) : 
  (
   employerchatselector && current ?
    (
        <>
                <div className='chatlistheader' style={{borderBottom:'1px solid lightgray'}}>
        <Header text= {current?.data?.jobName}/>
        <Subaparagraph text={`${current.data.city} ${current.data.country}`}/>
        </div> 
        <div className='chatroomscroll'>
           {
            current.messages&&
                current.messages.map((i)=>{
                    return (
                        <div className='chatdivrow'>
                        <img src={i.sender===email? userchat:companychat } className='chatimage'/>
                        <div className='smallchatdivrow'>
                        <div className='chatdivrow'>
                        <p className='boldchatparagraph'> {i.sender===email? 'You': i.sender}</p>
                        <p className='smallparagraph'> {i.createdAt&& moment(i.createdAt).fromNow()}</p>
                        </div>
                        <p className='chattext'>{i.message}</p>
                        </div>
                        </div>
                        )
                    })
           }
        <span ref={dummy}></span>
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

export default Jobseekermessages;