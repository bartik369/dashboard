import React, { useEffect } from "react";
import './pagination.css'

const Pagination = ({ 
  devicesPerPage, 
  totalDevices, 
  paginate, 
  currentPage }) => {
  
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDevices / devicesPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    console.log("currentPage", currentPage)
  }, [currentPage])

  return (
    <nav className="pagination">
      <ul className="page-switcher">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)} 
            href="#!" 
            className={`page-switcher__link ${number === currentPage 
            ? "active" 
            : ""}`}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

