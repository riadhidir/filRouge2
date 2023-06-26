import React from 'react'

const Profilepic = ({firstName, lastName, className}) => {

    const initials = firstName[0] + lastName[0];
  return (
    <div className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${className}`}>
    <span className="font-medium text-white dark:text-gray-300 uppercase">{initials}</span>
</div>
  )
}

export default Profilepic