import { useEffect, useState } from "react";

export function Pagination({paginationData, clickPageNum}) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPage = Math.ceil(paginationData.total / paginationData.per_page);
    
    let pages = [];
    for(let i = 1; i <= totalPage; i++) {
        pages.push(i);
    }

    useEffect(() => {
        setCurrentPage(paginationData.current_page);

    }, [paginationData])

    function clickPrev() {
        if(currentPage > 1) {
            clickPageNum(currentPage - 1);
        }
    }

    function clickNext() {
        if(currentPage < totalPage) {
            clickPageNum(currentPage + 1);
        }
    }

    return (
        <div className="px-4 py-3 sm:px-6 mt-5 float-right"> 
            <nav className="isolate inline-flex -space-x-px rounded-md">
                <a href="#" onClick={clickPrev} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 bg-primary-dark/85 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" className="size-5">
                        <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                </a>

            
                {
                    pages.map((pageNum) => {
                        return  <a href="#" onClick={() => clickPageNum(pageNum)} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${ currentPage === pageNum ? 'z-10 bg-indigo-500 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500' : 'bg-primary-dark'}`} key={pageNum}>
                                    {pageNum}
                                </a>
                    })   
                }                        
                
                <a href="#" onClick={clickNext} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 bg-primary-dark/85 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" className="size-5">
                        <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                </a>
            </nav>
        </div>
    );
}