import Image from 'next/image'
import Landing from './landingPage/Landing'
import Navbar from './landingPage/Navbar'

export default function Home() {
  return (
    <main className='w-full min-h-screen bg-gradient-to-r from-[#0A0B1F] via-[#101345] to-[#0A0B1F] '>
    <Navbar/>
   <Landing/>
    </main>
  )
}
