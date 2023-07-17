import {FC, useId} from 'react';
import './SearchTable.css';

interface SearchTableProps{
    searchType: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

export const SearchTable: FC<SearchTableProps> = ({searchType, handleSearch, label}) => {
    const searchInputId = useId();

    return (
        <div className="searchTable">
            <input type="text" id={searchInputId} className="searchTable__input" placeholder={label ? label : 'Search'} value={searchType} onChange={handleSearch}/>
            <label htmlFor={searchInputId} className='searchTable__label'>{label ? label : 'Search'}</label>
        </div>
    )
}