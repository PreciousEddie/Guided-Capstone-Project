import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevClick = () => {
        onPageChange(currentPage - 1);
    };

    const handleNextClick = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div>
            <button onClick={ handlePrevClick } disabled={ currentPage === 1 }>
                Prev
            </button>
            <span>{ `Page ${currentPage}` }</span>
            <button onClick={ handleNextClick } disabled={ currentPage === totalPages }>
                Next
            </button>
        </div>
    );
};

export default Pagination;
