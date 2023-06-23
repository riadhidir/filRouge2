import React from 'react'
import BasicCard from '../components/Home/Cards/BasicCard'

const Cycles = () => {
  return (
    <>
        <section className='max-w-screen-xl bg-red-500 w-full  mx-auto grid grid-cols-3 gap-5'>

        <BasicCard title={"Licence 1ére année"} body={"sfegpio inzefiane er zef ze ffze"} count={10} label='Specialties'/>
        <BasicCard title={"Licence 2éme année"} body={"sfegpio inzefiane er zef ze ffze"} count={10} label='Specialties'/>
        <BasicCard title={"Licence 3éme année"} body={"sfegpio inzefiane er zef ze ffze"} count={10} label='Specialties'/>
        <BasicCard title={"Master 1ére année"} body={"sfegpio inzefiane er zef ze ffze"} count={10} label='Specialties'/>
        <BasicCard title={"Master 2éme année"} body={"sfegpio inzefiane er zef ze ffze"} count={10} label='Specialties'/>


        </section>
    
    </>
  )
}

export default Cycles