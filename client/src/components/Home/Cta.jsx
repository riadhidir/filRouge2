import { Link } from "react-router-dom"

export default () => {
    return (
        <section className="py-28" style={{ background: "linear-gradient(0deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0) 100%  ) " }}>
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="max-w-xl space-y-3 md:mx-auto">
                    <h3 className="text-indigo-600 font-semibold">
                        Professional services
                    </h3>
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        {/* Build the future with us */}
                        LearnCampus is a great digital learning environment for you and your students.
                    </p>
                    <p className="text-gray-600">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.
                    </p>
                </div>
                <div className="mt-4">
                    <Link to="/signup" className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
                        Get started
                    </Link>
                </div>
            </div>
        </section>
    )
}