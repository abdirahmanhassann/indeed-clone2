
function Navbar() {
  return (
<nav className="bg-black max-w-full font-semibold font-sans justify-between px-5">
    <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 align-baseline">
            <div className="flex-shrink-0 flex items-center gap-5">
                <a href="#" className="text-white text-l font-bold">Logo</a>
                <a className=" text-gray-300 text-s hover:text-white cursor-pointer">Buy crypto </a>
                <a className=" text-gray-300 text-s hover:text-white cursor-pointer">Markets </a>
                </div>
     <div className="flex items-center gap-4"><a href="#" className="text-black hover:bg-gray-300 bg-white px-2 py-1.5 text-center rounded-lg text-sm font-medium">
                    <p>Get Started</p>
                    </a>
                    </div>
                    </div>
                    </div>
                    </nav>

    )
}

export default Navbar
