import React from "react";
import classes from "./Pagination.module.css";
function Pagination(props) {
  const [currentPage, setCurrentPage] = React.useState(1);
  let maxPages = 100;
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage
            ? `${classes.roundEffect} ${classes.active}`
            : classes.roundEffect
        }
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </div>
    );
  }
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginationRender = (
    <div className={classes.flexContainer}>
      {/* <div> currentPage : {currentPage} </div> */}

      <div className={classes.paginateCtn}>
        <div className={classes.roundEffect} onClick={prevPage}>
          &lsaquo;
        </div>
        {items}
        <div className={classes.roundEffect} onClick={nextPage}>
          &rsaquo;
        </div>
      </div>
    </div>
  );
  props.pageNumberHandler(currentPage);
  return paginationRender;
}

export default Pagination;
