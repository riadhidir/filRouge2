import React from 'react'
import { Outlet } from 'react-router-dom'


import Hero  from '../components/Home/Hero'
import Stats from '../components/Home/stats'
import Cta from '../components/Home/Cta'
import Footer from '../components/Home/Footer'
const Home  = () => {

    

    return (
       <>
       <Hero/>
       <Stats/>
       <Cta/>
       <Footer/>
       </>
    )
}

export default Home