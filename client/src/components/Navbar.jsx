import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterButton from "./Home/Buttons/FilterButton";

// export default () => {
//     const [state, setState] = useState(false);
//     const [showFilter, setShowFilter] = useState(false);
//     const [cycle, setCycle] = useState("");
//     const [Field, setField] = useState("");
//     const [Branch, setBranch] = useState("");
//     const [Specialty, setSpecialty] = useState("");
//     const [Course, setCourse] = useState("");
//     // Replace javascript:void(0) paths with your paths
//     const navigation = [
//         { title: "Features", path: "javascript:void(0)" },
//         { title: "Integrations", path: "javascript:void(0)" },
//         { title: "Customers", path: "javascript:void(0)" },
//         { title: "Pricing", path: "javascript:void(0)" },
//     ];

//     useEffect(() => {
//         document.onclick = (e) => {
//             const target = e.target;
//             if (!target.closest(".menu-btn")) setState(false);
//         };
//     }, []);

//     return (
//         <nav
//             className={`bg-white border-b-2 pb-2 lg:pb-0 md:text-sm transition-all relative${
//                 state
//                     ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
//                     : ""
//             }`}
//         >
//             <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-0 ">
//                 <div className="flex items-center justify-between py-2 md:block">
//                     <a href="javascript:void(0)">
//                         <img
//                             src="https://www.floatui.com/logo.svg"
//                             width={120}
//                             height={50}
//                             alt="Float UI logo"
//                         />
//                     </a>
//                     <div className="md:hidden">
//                         <button
//                             className="menu-btn text-gray-500 hover:text-gray-800"
//                             onClick={() => setState(!state)}
//                         >
//                             {state ? (
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-6 w-6"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                             ) : (
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     strokeWidth={1.5}
//                                     stroke="currentColor"
//                                     className="w-6 h-6"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//                                     />
//                                 </svg>
//                             )}
//                         </button>
//                     </div>
//                 </div>
//                 <div
//                     className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
//                         state ? "block" : "hidden"
//                     } `}
//                 >
//                     {/* <div className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0 ">
//                         <form className="w-1/2 h-10 relative">
//                             <input
//                                 className="mx-auto w-full h-full border-2 border-indigo-500/50 rounded-full bg-gray-100 px-5 focus:outline-indigo-500 outline-none"
//                                 placeholder="Search..."
//                                 type="search"
//                                 name=""
//                                 id=""
//                             />

//                             <button
//                             onClick={()=>setShowFilter(!showFilter)}
//                                 type="button"
//                                 className="h-8 w-12 bg-white border-2 shadow-lg rounded-full absolute top-1 right-1 flex  justify-center "
//                             >
//                                 <svg
//                                     className="h-6 mt-1 fill-indigo-500"
//                                     stroke="none"
//                                     strokeWidth="1.5"
//                                     viewBox="0 0 24 24"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     aria-hidden="true"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
//                                     ></path>
//                                 </svg>
//                             </button>
//                         </form>
//                     </div> */}

//                     <div className=" flex-1  gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0  ">
//                         <Link
//                             to="/login"
//                             className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
//                         >
//                             Sign in
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                                 className="w-5 h-5"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* <div className={` max-w-screen-xl mt-3 mx-auto ${showFilter ? 'h-16': 'h-0'} transition-all`}>

//                 <form className="h-full w-full flex gap-2" onSubmit={(e)=> e.preventDefault()}>

//                     <FilterButton text={cycle} label="cycle" show={showFilter}/>
//                     <FilterButton text={Field} label="Field" show={showFilter}/>
//                     <FilterButton text={Branch} label="Branch" show={showFilter}/>
//                     <FilterButton text={Specialty} label="Specialty" show={showFilter}/>
//                     <FilterButton text={Course} label="Course" show={showFilter}/>

//                 </form>
//             </div> */}
//         </nav>
//     );
// };



export default () => {
    const [state, setState] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [cycle, setCycle] = useState("");
    const [Field, setField] = useState("");
    const [Branch, setBranch] = useState("");
    const [Specialty, setSpecialty] = useState("");
    const [Course, setCourse] = useState("");
    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "Features", path: "javascript:void(0)" },
        { title: "Integrations", path: "javascript:void(0)" },
        { title: "Customers", path: "javascript:void(0)" },
        { title: "Pricing", path: "javascript:void(0)" },
    ];

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, []);

    return (
        <nav
            className={`bg-white border-b-2 pb-2 lg:pb-0 md:text-sm transition-all relative${
                state
                    ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
                    : ""
            }`}
        >
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-0 ">
                <div className="flex items-center justify-between py-2 md:py-5 md:flex ">
                    <Link className="" href="javascript:void(0)">
                        <img
                        className=""
                            src="logo_2.png"
                            width={120}
                            height={100}
                            alt="Float UI logo"
                        />
                    </Link>
                    <div className="md:hidden">
                        {/* <button
                            className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {state ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            )}

                        </button> */}

                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                        >
                            Sign in
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div
                    className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                        state ? "block" : "hidden"
                    } `}
                >
                  

                    <div className=" flex-1  gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0  ">
                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                        >
                            Sign in
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* <div className={` max-w-screen-xl mt-3 mx-auto ${showFilter ? 'h-16': 'h-0'} transition-all`}>

                <form className="h-full w-full flex gap-2" onSubmit={(e)=> e.preventDefault()}>

                    <FilterButton text={cycle} label="cycle" show={showFilter}/>
                    <FilterButton text={Field} label="Field" show={showFilter}/>
                    <FilterButton text={Branch} label="Branch" show={showFilter}/>
                    <FilterButton text={Specialty} label="Specialty" show={showFilter}/>
                    <FilterButton text={Course} label="Course" show={showFilter}/>

                </form>
            </div> */}
        </nav>
    );
};
