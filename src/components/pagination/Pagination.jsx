import React, { useContext } from "react";
import { usePagination } from "../../usePagination";
import { Globalcontext } from "../../Context/Context";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    setCurrentPage,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const onNext = () => {
    if (currentPage === lastPage) {
      setCurrentPage(1);
    } else {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage === 1) {
      setCurrentPage(lastPage);
    } else {
      onPageChange(currentPage - 1);
    }
  };
  const { theme } = useContext(Globalcontext);

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <div
      className={`flex flex-col my-4 sm:flex-row gap-2 sm:items-center justify-between h-12 mt-4 ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      <div>{`${
        lastPage === undefined ? "" : `Showing ${currentPage} of ${lastPage}`
      } `}</div>
      {lastPage === undefined ? (
        ""
      ) : (
        <ul
          className={`flex justify-end ${
            theme === "dark" ? "bg-black" : ""
          } h-full items-center px-5 rounded-md`}
        >
          <li onClick={onPrevious}>
            <div className="arrow right">
              <img src="/arrow-left.svg" className="w-4 h-4 cursor-pointer" />
            </div>
          </li>
          {paginationRange.map((pageNumber, index) => {
            return (
              <li
                key={index}
                className={`mx-1 text-sm leading-[22px] px-[15px] py-[8px] cursor-pointer  ${
                  pageNumber === currentPage
                    ? " text-white rounded-md bg-[#6454D6]"
                    : "text-[#A1A1A1] "
                }`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}
          <li onClick={onNext}>
            <div className="arrow right">
              <img
                src="/navigate-arrow.svg"
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
