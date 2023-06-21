import Image from 'next/image'
import React from 'react'

function Landing () {
  const services:String[]=['Service 1', 'Service 2', 'Service 3']
  let count=0
  return (
    <>
    <div className="text-white flex flex-row flex-wrap justify-center gap-[35px] mb-[100px] ">
      <div className='flex flex-col w-[400px]'>
            <div className=" py-10 text-[40px] flex flex-row  flex-wrap gap-3 m h-min  ">
                <h2 className="font-semibold">Embrace</h2>
                <h2 className="font-semibold">the</h2>
                <h2 className="font-semibold">Power</h2>
                <h2 className="font-semibold">of</h2>
                <h2 className=" font-semibold text-[#5C51FE]">Digital Currency</h2>
           </div>
           <p className='text-[13px]'>Discover the power of crypto at your fingertips. Our user-friendly
web and mobile app allows you to effortlessly trade, swap, and
manage cryptocurrencies, opening doors to endless possibilities
in the world of digital assets.</p>
<div className='flex flex-row gap-3'>
           <button className="text-white  h-min w-36 bg-[#5C51FE] hover:bg-[#564aff]  px-2 py-2  text-center rounded-lg text-sm mt-6">Get started
           </button>
           <button className="text-[#5C51FE] bg-transparent h-min w-36 border border-solid border-[#5C51FE] px-2 py-2  text-center rounded-lg text-sm mt-6">Read more
           </button>
      </div>
</div>
      <div style={{boxShadow:"4px 4px 2px 2px #5c51fe"}} className='w-[400px] h-[300px] max-w-max bg-[#46478082] mt-12 rounded-lg flex flex-col justify-between pb-12 pt-5 px-10 items-center
      border border-solid border-black
      '>
        <p className='text-sm'>Swap crypto</p>
        <input type="text" className="outline-none bg-[#494579] rounded-md text-white p-0.5"/>
        <input className='outline-none bg-[#494579] rounded-md text-white p-0.5'/>
        <button style={{boxShadow:"2px 2px 1px 1px black"}} className="text-white  h-min w-36 bg-[#5C51FE] hover:bg-[#564aff]  px-2 py-2  text-center rounded-lg text-sm mt-6">Swap
        </button>
      </div>
           </div>
           {/* <div className='  bg-gradient-to-r from-[#f4bcff] to-purple border-t-3 border-transparent
            max-w-full h-[500px] pt-[2px]'> */}
<div className='bg-gradient-to-r from-[#0A0B1F] via-[#101345] to-[#0A0B1F] max-w-full h-[500px] pb-[770px] items-center text-center text-white'>
  
  <div className='flex flex-col
 text-2xl font-semibold gap-20 items-center pt-16 '>
<h2>Our clients</h2>
<div className='flex flex-row gap-24 mt-[-30px]'>
  <h2>Client</h2>
  <h2>Client</h2>
  <h2>Client</h2>
  </div> 
</div>

  <div className='flex flex-row flex-wrap
 text-2xl font-semibold gap-48 items-center mt-[80px] place-content-center '>
<h2 className='text-4xl'>Our services</h2>
<div className='flex flex-col mt-[-30px]'>
  {
    services.map((i:String,n:number)=>{
      count++
return(
<div style={{boxShadow:' 0px 0px 4px 0px #000000'}}
 className={`text-white  h-min w-48 bg-[#393487] hover:bg-[#2b2588]  py-2  text-center rounded-lg text-sm mt-6`}>
         {i}
           </div>
)
    })
  }
  </div> 
  <Image src={'/robot2.png'} height={600} width={600} alt='robot'  className='absolute right-0 pt-56 '/>
</div>

</div>
{/* </div> */}

    </>
  )
}

export default Landing