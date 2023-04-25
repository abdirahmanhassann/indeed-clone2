import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../GeneralComponents/Nav';
import Footer from '../GeneralComponents/Footer';
import '../../App.css';
import Jobs from '../../Jobs.json'
import Data from '../../Data.json'
import BlueButton from '../../ElementComponents/bluebutton';
import { useEffect } from 'react';
function Home() 

{
   const [search,setsearch]=useState('');
   const[wheresearch,setwhere]=useState('')
   const [apidata, setapidata] = useState([]);
   const [jobapidata, setjobapidata] = useState([]);
   const [exists,setexists]=useState(true);
   const [wherexist,setwherexists]=useState(true);
   function change(e) {
      
      let changed = e.target.value;
    setsearch(changed)

    const newFilter = Jobs.filter((value) => {
        return value.name.toLowerCase().includes(search.toLowerCase()) ;
      
      });

if (changed === "") {
  setjobapidata([]);
} else {
  setjobapidata(newFilter);
}


}
function wherechange(e) {

   let changedd = e.target.value;
   setwhere(changedd)

   const newFilter = Data.filter((value) => {
       return value.name.toLowerCase().includes(wheresearch.toLowerCase());  
     });
if (changedd === "") {
 setapidata([]);
} else {
 setapidata(newFilter);
}
}
 
const submit =(e)=>{
e.preventDefault();
console.log(search);

}
 
return (
   <div className='thelargestdiv' style={{margin:'auto'}}>
  <Nav/>
   <form className='inputdiv' onSubmit={submit}>
<input placeholder='job title,keywords,company' name='what' value={search} onChange={change} autoComplete="off"></input>
{jobapidata.length !=0 && exists &&(
<div className="dataResult2">
 
        {jobapidata.slice(0, 15).map((value, key) => {
    return(
    <div className="dataItem2" onClick={()=>{
        setsearch(value.name) 
         setexists(false)}}  >
        <p>{value.name}</p>
        </div>
)})}
    </div>
    )}
 
<input placeholder='city or postcode'  name='where' value={wheresearch} onChange={wherechange} autocomplete="off"></input>
{apidata.length !=0 && wherexist &&(
<div className="dataResult"> 
  { apidata.slice(0, 15).map((value,key) => {

    return(

    <div className="dataItem" key ={key}
     onClick={()=>{setwhere(value.name)
     setwherexists(false)
     }}>
          <p>{value.name}</p>
        </div>
)})}
    </div>
    )}
<Link to='/searched'state={{whered:wheresearch, whatd:search}} className='linksmall'
style={{marginLeft:'10px'}}>
   <BlueButton text={'Find jobs'}/>
   </Link>

   </form>
   <div className='div3'>
<span className='span1'>Upload your CV</span>
<span className='span2'> - It only takes a few seconds</span>
   </div>
   <div className='div4'>
<span className='span1'>Employers: Post a job</span>
<span className='span2'> - Your next hire is here</span>
   </div>
<div className='div5'>
<h3>Popular seaches</h3>
<button className='suggestedbutton'>Supermarket</button>
<button className='suggestedbutton'>Warehouse</button>
<button className='suggestedbutton'>Delivery driver</button>
<button className='suggestedbutton'>lorem</button>
<button className='suggestedbutton'>lorem</button>
<div>
<button className='suggestedbutton'>lorem</button>
<button className='suggestedbutton'>lorem</button>
<button className='suggestedbutton'>lorem</button>
<button className='suggestedbutton'>lorem</button>
<button className='suggestedbutton'>lorem</button>
</div>
</div>
<Footer/>
   </div>
  );
}

export default Home;
