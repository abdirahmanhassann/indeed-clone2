import Sidebar from "./components/Sidebar";

export default function Page() {
  return (
    <div className='p-4 h-screen'>
        <div className="grid grid-cols-6 gap-3 h-full ">
            <div className="col-span-1 border rounded-md p-4 ">
                <h2><Sidebar /></h2>
            </div>
            <div className="col-span-5 border rounded-md p-4 ">
                <h2>Dashboard</h2>
            </div>
        </div>
    </div>
  )
}