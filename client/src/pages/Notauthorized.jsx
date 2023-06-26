import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Notauthorized = () => {
    const navigate = useNavigate();
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            {/* <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-indigo-600 dark:text-indigo-500">404</h1> */}
        <img className='w-52 mx-auto' src="/notauthorized.png" alt="" />
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Access not authorized.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't let you access that page. </p>
            <button onClick={()=>navigate(-1)} className="inline-flex text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-indigo-900 my-4">go Back </button>
        </div>   
    </div>
</section>
  )
}

export default Notauthorized