export function Pagenation({ page, setPage, pageSize, setPageSize }) {
    let total = 100
    return (
      <div className='gap-4 items-center p-2 flex justify-end'>
        <div>
          <label className='mx-2 text-sm' htmlFor='pageSize'>Page Size:</label>
          <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} className='text-sm rounded-lg outline-none ring-1 ring-red-600 border-none focus:ring-red-600 focus:ring-2 focus:border-none py-1' name='pageSize' id='pageSize'>
            <option value={1}>1</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
        <nav className='flex items-center gap-2' aria-label="Page navigation example">
          <p className='text-sm'>Pages:</p>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button type='button' onClick={() => setPage(page - 1)} className="block py-2 px-3 ml-0 leading-tight text-red-600 bg-white rounded-l-lg border border-red-300 hover:bg-red-100 hover:text-black ">
                <span className="sr-only">Previous</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </button>
            </li>
            {[0, 1, 2, 3, 4].map((pages) => {
              return 1 + pages < total / pageSize ?
                <li key={pages}>
                  <button onClick={() => setPage(pages)} type='button' className="py-2 px-3 leading-tight text-red-600 bg-white border border-red-300 hover:bg-red-100 hover:text-black">{pages + 1}</button>
                </li> : null
            })}
            <li>
              <button type='button' onClick={() => setPage(1 + page)} className="block py-2 px-3 leading-tight text-red-600 bg-white rounded-r-lg border border-red-300 hover:bg-red-100 hover:text-black ">
                <span className="sr-only">Next</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
  
    )
  }