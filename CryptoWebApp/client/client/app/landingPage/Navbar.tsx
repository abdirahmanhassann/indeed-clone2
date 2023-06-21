
function Navbar() {
  return (
<nav className="bg-#1E1E1E max-w-full font-semibold font-sans justify-between px-8 py-7">
    <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 align-baseline">
            <div className="flex-shrink-0 flex items-center gap-5">
                <a href="#" className="text-white text-l font-bold">SHIPESA</a>
                </div>
                <div className="flex-shrink-0 flex items-center gap-10">
                <a className=" text-gray-300 text-sm hover:text-white cursor-pointer">Docs </a>
                <a className=" text-gray-300 text-sm hover:text-white cursor-pointer">Contact </a>
     <div className="flex items-center gap-4"><a href="#" className="text-white bg-[#5C51FE] text-sm  hover:bg-[#564aff] px-6 py-2 text-center rounded-lg ">
                    <p>Connect wallet</p>
                    </a>
                    </div>
                    </div>
                    </div>
                    </div>
                    </nav>

    )
}

export default Navbar
