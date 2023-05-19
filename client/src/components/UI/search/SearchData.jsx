import {React, useState} from "react";
import { useDispatch } from "react-redux";
import './SearchData.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';

const SearchData = ({...props}) => {
    const [activeSearch, setActiveSearch] = useState(true);
    const searchQuery = ""
    const dispatch = useDispatch();

    const setStatusSearch = () => {
        setActiveSearch(false);
    };
    
    window.addEventListener('click', () => {
        setActiveSearch(true);
    });

    const deleteSearch = () => {
        
    }

    return (
        <div>
        <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <button className="btn-search" onClick={setStatusSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
            <input {...props} value={searchQuery || ""} className={`input-search active-search${activeSearch 
                ? "active-search" 
                : "" && "delSearchQuery"}`}/>
            <FontAwesomeIcon 
            icon={faXmark}
            className={`delete-searchquery ${searchQuery === "" ? "" : "active"}`} 
            onClick={deleteSearch}/>
        </div>
        </div>
    )
}

export default SearchData;