import Image from 'next/image'
import React from 'react'

function Landing () {
  return (
    <>
    <div className="text-white flex flex-row flex-wrap justify-center gap-[35px] ">
        <div className="flex flex-col text-left w-[269px]">
            <h2 className="text-gray-400 font-medium mt-[40px]">Market Crypto</h2>
            <div className=" py-10 text-4xl flex flex-row  flex-wrap gap-3 m h-min w-270px mt-[-30px]">
                <h2 className=" font-bold">The</h2>
                <h2 className="font-thin">most</h2>
                <h2 className=" font-bold">secure  crypto</h2>
                <h2 className="font-thin">trading</h2>
                <h2 className=" font-bold">center</h2>
           </div>
           <h2 className="text-gray-400 font-medium mt-[-20px]">Buy, trade and hold over 600 cryptocurrencies in SHIPESA
           </h2>
           <button className="text-black hover:bg-gray-300 bg-white px-2 py-2  text-center rounded-lg text-sm mt-6">Get started
           </button>
           </div>
           <div className=" py-10 overflow-hidden">
            <Image alt="Crypto image"  src={'/image1.jpg'} width={300} height={300}  className="mt-[-170px]"/>
            </div>
            <div className="w-150px py-10 flex flex-col gap-7">
                <div className="flex flex-col gap-2 text-left">
                    <h3 className="font-bold text-xl">$76 Billion</h3>
                    <h4 className="font-thin">24hr trading volume during exchange</h4>
                    </div><div className="flex flex-col gap-2 text-left">
                        <h3 className="font-bold text-xl">600+</h3>
                        <h4 className="font-thin">Crypto-currencies listed</h4>
                        </div>
                        <div className="flex flex-col gap-2 text-left">
                            <h3 className="font-bold text-xl">80 million</h3>
                            <h4 className="font-thin">Registered users who trust SHIPESA</h4>
                            </div>
                            <div className="flex flex-col gap-2 text-left">
                                <h3 className="font-bold text-xl"> 0.10% </h3>
                                {/* <h4 className="font-thin">Lowest transaction fees</h4> */}
                                </div>
                                </div>
                                </div>
    </>
  )
}

export default Landing