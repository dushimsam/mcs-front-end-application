import Pagination from "react-js-pagination";
import React from "react";

const Paginator = ({paginatorLoading, paginator, handlePageChange}) => {
    return (
        <div className={"row justify-content-end mt-4 mb-4"}>
            {
                paginatorLoading ? "Loading ..." :
                    <Pagination activePage={paginator.page} itemsCountPerPage={paginator.perPage}
                                totalItemsCount={paginator.total} pageRangeDisplayed={paginator.range}
                                onChange={handlePageChange}/>
            }
        </div>
    )
}

export  default  Paginator;