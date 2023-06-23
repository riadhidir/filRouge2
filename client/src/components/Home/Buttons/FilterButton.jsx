import React from 'react'

const FilterButton = ({text, label, show}) => {
  return (
    <>
    
    <div className={` ${show? 'block':'hidden'} w-fit relative transition-all animate-op  `}>
    <label htmlFor={label}  className='px-3 py-1/2 text-indigo-50 duration-150 bg-indigo-600 rounded-full absolute -translate-y-1/2 left-5' >{label}</label>
    <button
    id={label}
    className="flex items-center gap-2 px-5 py-3 text-indigo-600 duration-150 bg-indigo-50 rounded-full border-2 border-indigo-500 hover:bg-indigo-100 active:bg-indigo-200"
>
   
    {text ==="" ? `... Select a ${label}`: text}

</button>
      
    </div>
    </>
  )
}

export default FilterButton