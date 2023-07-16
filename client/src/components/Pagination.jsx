

const Pagination = ({ page, pages, changePage, children }) => {
    let middlePagination;

    if (pages <= 5) {
        middlePagination = [...Array(pages)].map((_, idx) => (
            <li>
                <button
                    key={idx + 1}
                    onClick={() => changePage(idx + 1)}
                    disabled={page === idx + 1}
                    aria-current="page"
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white disabled:bg-indigo-50 disabled:text-indigo-600 disabled:font-semibold"
                >
                    {idx + 1}
                </button>
            </li>
        ));
    } else {
        const startValue = Math.floor((page - 1) / 5) * 5;

        middlePagination = (
            <>
                {[...Array(5)].map((_, idx) => (
                    <li>
                        <button
                            key={startValue + idx + 1}
                            disabled={page === startValue + idx + 1}
                            onClick={() => changePage(startValue + idx + 1)}
                            aria-current="page"
                            className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                            {startValue + idx + 1}
                        </button>
                    </li>
                ))}

                <button className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                    ...
                </button>
                <button
                    onClick={() => changePage(pages)}
                    aria-current="page"
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                    {pages}
                </button>
            </>
        );

        if (page > 5) {
            if (pages - page >= 5) {
                middlePagination = (
                    <>
                        <button
                            onClick={() => changePage(1)}
                            aria-current="page"
                            className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                            1
                        </button>

                        <button className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                            ...
                        </button>

                        <button
                            onClick={() => changePage(startValue)}
                            className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                            {startValue}
                        </button>

                        {[...Array(5)].map((_, idx) => (
                            <button
                                key={startValue + idx + 1}
                                disabled={page === startValue + idx + 1}
                                onClick={() => changePage(startValue + idx + 1)}
                                className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            >
                                {startValue + idx + 1}
                            </button>
                        ))}

                        <button className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                            ...
                        </button>

                        <button
                            onClick={() => changePage(pages)}
                            className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                            {pages}
                        </button>
                    </>
                );
            } else {
                let amountLeft = pages - page + 5;
                middlePagination = (
                    <>
                        <button
                            onClick={() => changePage(1)}
                            className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                            1
                        </button>

                        <button className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                            ...
                        </button>
                        <button
                            onClick={() => changePage(startValue)}
                            className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                            {startValue}
                        </button>

                        {[...Array(amountLeft)].map((_, idx) => (
                            <button
                                key={startValue + idx + 1}
                                disabled={page === startValue + idx + 1}
                                style={
                                    pages < startValue + idx + 1
                                        ? { display: "none" }
                                        : null
                                }
                                onClick={() => changePage(startValue + idx + 1)}
                                className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            >
                                {startValue + idx + 1}
                            </button>
                        ))}
                    </>
                );
            }
        }
    }

    return (
        pages>1 &&(
        <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
        >
            {children}
            <ul className="inline-flex items-stretch -space-x-px">
                <li>
                    <button
                        onClick={() => changePage((page) => page - 1)}
                        disabled={page === 1}
                        className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>

                {middlePagination}

                <li>
                    <button
                        onClick={() => changePage((page) => page + 1)}
                        disabled={page === pages}
                        className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
        )
    );
};

export default Pagination;

