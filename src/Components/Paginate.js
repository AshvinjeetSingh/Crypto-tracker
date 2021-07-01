import React from 'react'
import ReactPaginate from "react-paginate";

const Paginate = (props) => {
    
    return (
        <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={props.totalCount/20}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                containerClassName={"pagination"}
                onPageChange={props.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                />
    )
}

export default Paginate
