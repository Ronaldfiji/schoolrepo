import React from 'react';

const Pagination = ({ pageSize, currentPage, ApiReqPageNum, totalItems, paginate }) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(totalItems / pageSize); i++) {
        pageNumbers.push(i);        
    }

    //let disabledLastLink = currentPage === pageNumbers.length ? 'disabled' : '';

    return (
        <nav>
            <ul className='pagination'>
                <li className='page-item'>
                    <a onClick={() => paginate(-1)} href='#' className={'page-link ' + (ApiReqPageNum === 1 ? 'disabled' : '')}>
                        <i className="fa fa-angle-double-left fa-xs" aria-hidden="true">...</i>
                    </a>
                </li>
                <li className='page-item'>
                    <a onClick={() => paginate(1)} href='#' className={'page-link ' + (currentPage === 1 ? 'disabled' : '')}>
                        First
                    </a>
                </li>
                <li className='page-item'>
                    <a onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)} href='#' className={'page-link ' + (currentPage === 1 ? 'disabled' : '')}>
                        Prev
                    </a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} href='#' className={'page-link ' + (currentPage === number ?
                            'active' : '')}>
                            {number}
                        </a>
                    </li>
                ))}
                <li className='page-item'>
                    <a onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
                        href='#' className={'page-link ' + (currentPage === pageNumbers.length ? 'disabled' : '')}>
                        Next
                    </a>
                </li>
                <li className='page-item'>
                    <a onClick={() => paginate(pageNumbers.length)} href='#' className={'page-link ' + (currentPage === pageNumbers.length ? 'disabled' : '')}>
                        Last
                    </a>
                </li>
                <li className='page-item'>
                    <a onClick={() => paginate(pageNumbers.length + 1)} href='#' className={'page-link'}>
                        <i className="fa fa-angle-double-right fa-xs" aria-hidden="true" ></i>
                    </a>
                </li>
                {/* <li className='page-item'>
                    <select className="form-select-smXX page-link"  id="page" name="page" >
                        <option value=""> Page</option>
                        <option value={1}>2</option>
                        <option value={2}>3</option>
                        <option value={3}>4</option>
                    </select>
                </li> */}

            </ul>

        </nav>
    );
};

export default Pagination;
