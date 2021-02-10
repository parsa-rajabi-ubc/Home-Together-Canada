/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.2
 *
 * @Description: A generic Paginate used for navigation
 *
 */
import React, {useState} from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

function Paginate(props) {
    const {data, resultsPerPage} = props;

    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * resultsPerPage;
    const currentPageData = data.slice(offset, offset + resultsPerPage)
    const pageCount = Math.ceil(data.length / resultsPerPage);

    function handlePageClick({selected: selectedPage}) {
        setCurrentPage(selectedPage);
    }

    return (
        <div>

            {currentPageData}

            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex m-auto w-2/3"}
                pageLinkClassName={"page-numbers"}
                previousLinkClassName={"next-prev-link"}
                nextLinkClassName={"next-prev-link"}
                previousClassName={"next-prev-text"}
                nextClassName={"next-prev-text"}
                activeLinkClassName={"current-page"}
            />
        </div>
    );
}

Paginate.propTypes = {
    data: PropTypes.array.isRequired,
    resultsPerPage: PropTypes.number.isRequired,
}

export default Paginate;