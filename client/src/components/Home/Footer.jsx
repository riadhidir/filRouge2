import { Link } from "react-router-dom"
export default () => {

  

    return (
        <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800"  style={{ background: "linear-gradient(180deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0) 100%  ) " }}>
        <div className="mx-auto max-w-screen-xl text-center">
            <Link to="/home" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
               <img className="h-8 mr-3" src="/logo_3.png" alt="" />
                LearnCampus
            </Link>
         
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2021-2022 <a href="#" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
        </div>
      </footer>
    )
}
