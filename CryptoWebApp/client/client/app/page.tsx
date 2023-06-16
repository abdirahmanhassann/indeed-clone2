import Image from 'next/image'
import Landing from './Landing'
import Navbar from './Navbar'

export default function Home() {
  return (
    <main className='w-full min-h-screen bg-black '>
    <Navbar/>
   <Landing/>
    </main>
  )
}
