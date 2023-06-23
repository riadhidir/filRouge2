import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import DynamicFilter from '../components/Home/Filter'
import StaticFilter from '../components/Home/Filter_2'
import BasicCard from '../components/Home/Cards/BasicCard'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useMutation, useQuery } from '@tanstack/react-query'
import { downloadDocument } from '../api/axios'




const config= {

  type : ['Tp','Td','Exam','FinalThesis','PhdThesis']
}
const resetfilters=(refs) => {
  refs.current.map((ref,idx)=> {

    // console.log(Boolean(ref));
   ref && (ref.checked = false);
    
     });
}



const Basic = () => {

  const [selectedFilters, setSelectedFilters] = useState({
    field:'',
    branch:'',
    specialty:'',
    course:'',
    cycle:'',
    type:''
  });

const [field, setField] = useState("");
const [branch, setBranch] = useState("");
const [specialty, setSpecialty] = useState("");
const [course, setCourse] = useState("");
const [type, setType] = useState("Exam");
const [cycle, setCycle] = useState("");
const axiosPrivate = useAxiosPrivate();
const [q,setQ] = useState("");
const typeRef = useRef([]); //all check options
const fieldRef = useRef([]); //all check options
const branchRef = useRef([]); //all check options
const specialtyRef = useRef([]); //all check options
const courseRef = useRef([]); //all check options

useEffect(()=>{
  setSelectedFilters({
    field,
    branch,
    specialty,
    course,
    cycle:"",
    type
  })
  // refetch()
},[field, branch, specialty, course,type]);

// const [fieldReset, setFieldReset] = useState(false)

useEffect(()=>{
  setField('');
  resetfilters(fieldRef);
},[type]);

useEffect(()=>{
  setBranch('');
  resetfilters(branchRef);
},[field]);

useEffect(()=>{
    setSpecialty('');
    resetfilters(specialtyRef)
},[branch]);

useEffect(()=>{
  setCourse('');
  resetfilters(courseRef);
},[field,branch, specialty]);

  const{data:documents, isLoading, refetch} = useQuery(["documents",type,cycle], async () => {
 
    const response = await axiosPrivate.get(
        `/library/documents?type=${type}&q=${q}&cycle=${cycle}&course=${course}`
    );
    console.log(response.data);
    return response.data;
});

// useEffect(()=>{
//   // setField('');
//   // setField('');

// console.log({field,branch,specialty,course})
// },[field,branch, specialty,course]);
  return (
    < div className='min-h-screen pb-5' style={{background: "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)"}}>
    <Navbar/>

    <div className='max-w-screen-xl mx-auto backdrop-blur-sm bg-white/50  my-10 p-4 rounded-lg border-2 border-white'>
      <p className='text-5xl text-center '>Library</p>
    </div>


    <section className='max-w-screen-xl h-full mx-auto grid grid-cols-12 gap-10'>

      {/* filters */}
      <div className='col-span-3 bg-red-00 flex flex-col gap-7'>

        
         {
           ['PhdThesis','FinalThesis'].includes(type) && <form >   
              {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
              <div className="relative">
                  <input onChange={(e)=> setQ(e.target.value)} value={q} type="search" id="default-search" className="block w-full p-4 h-12 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." required/>
                  <button type="submit" className=" text-white   absolute right-1 bottom-2.5 top-1 w-10 h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg aria-hidden="true" className=" w-5 h-5 relative right-1/2   text-white dark:text-gray-400" fill="none" stroke="currentColor" viewBox=" 0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </button>
              </div>
          </form>
         } 

          <StaticFilter title="Document Types" setAction={setType} data={config.type}  checkRef={typeRef} _default={type}/>
         <DynamicFilter title="fields"  setAction={setField} checkRef={fieldRef}/>
        {field !=="" && < DynamicFilter title="branches"  setAction={setBranch} field={field} checkRef={branchRef}/>}   
        { branch!=="" && <DynamicFilter title="specialties"  setAction={setSpecialty} branch={branch} checkRef={specialtyRef}/>}
        { field!=="" && <DynamicFilter title="courses"  setAction={setCourse} field={field} branch={branch} specialty={specialty} checkRef={courseRef}/>}
        {/* <Filter title="Branches"/> */}

  

      </div>

    <div className='col-span-9 bg-blue-00 h-full '>

        {/* display selected filters */}
      <div className='flex gap-2 mb-5'>


        {

          Object.keys(selectedFilters).map((key, idx) =>{

            if(selectedFilters[key] !==""){
              
          return (

            <div className='cursor-pointer' key={idx} onClick={() => alert()}>
              <button className='bg-white px-4 py-2 rounded-full'>{selectedFilters[key]}</button>
            </div>
          )
            }


          } )
        }
        <div className='relative cursor-pointer' onClick={()=>{
          resetfilters(fieldRef)
          resetfilters(branchRef)
          resetfilters(specialtyRef)
          resetfilters(courseRef)
          setField('');setBranch('');setSpecialty('');setCourse('')
        }} >

          
         
        <button className='bg-red-400 px-4 py-2 rounded-full text-white border-2 border-white'> reset filters</button>
        </div>

      </div>
          {/* display results length */}
        <p className='mb-8'>Showing 1–12 of 27 results</p>

        {/* display documents */}

        <div className='grid grid-cols-2 gap-x-10 gap-y-3 '>

            {
             ['Tp','Td','Exam'].includes(type) && documents?.map((item)=>{
               return  <BasicCard document={item} key={item._id} />

              })
        
            }
            {
                    ['PhdThesis','FinalThesis'].includes(type) && documents?.map((item)=>{
                      // const author = `${item.authors[0].l_name[0]}.${item.authors[0].f_name}`
                     return  <BasicCard document={item} key={item._id} />
      
                    })
            }
          {/* <BasicCard title='tp 2022 cod' university="boumerdes" author='M.fefef' type="tp" donwloads={2} rating={100}/>
          <BasicCard title='tp 2022 cod' university="boumerdes" author='M.fefef' type="tp" donwloads={2} rating={100}/>
          <BasicCard title='tp 2022 cod' university="boumerdes" author='M.fefef' type="tp" donwloads={2} rating={100}/>
          <BasicCard title='tp 2022 cod' university="boumerdes" author='M.fefef' type="tp" donwloads={2} rating={100}/>
          <BasicCard title='tp 2022 cod' university="boumerdes" author='M.fefef' type="tp" donwloads={2} rating={100}/>
          <BasicCard title='tp 2022 cod' university="boumerdes" author='M.fefef' type="tp" donwloads={2} rating={100}/>
          <BasicCard title='tp 2022 cod' university="boumerdes" author='M.fefef' type="tp" donwloads={2} rating={100}/> */}

        </div>

      </div>


    </section>

    {/* <Outlet/> */}



    </div>
  )
}

export default Basic