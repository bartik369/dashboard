import {React, useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../../store/actions/searchDataAction";
import { deleteSearchQuery } from "../../../store/actions/searchDataAction";
import './SearchData.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';

const SearchData = ({...props}) => {
    const [activeSearch, setActiveSearch] = useState(true);
    const searchQuery = useSelector(state => state.seqrchQuery.query)
    const dispatch = useDispatch();

    const setStatusSearch = () => {
        setActiveSearch(false);
    };
    
    window.addEventListener('click', () => {
        setActiveSearch(true);
    });

    const deleteSearch = () => {
        dispatch(deleteSearchQuery());
    }

    return (
        <div>
        <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <button className="btn-search" onClick={setStatusSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
            <input {...props} value={searchQuery} className={`input-search active-search${activeSearch 
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