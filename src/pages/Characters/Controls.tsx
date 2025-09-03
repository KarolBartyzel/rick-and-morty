import type { ChangeEvent } from "react";
import type { CharactersSearchParams, CharacterStatus } from "../../types";

interface Props {
    search: string;
    status: string;
    pageSize: number;
    handleRefresh: () => void;
    handleParamsChange: (params: Partial<CharactersSearchParams>) => void;
}
export const Controls = ({ search, status, pageSize, handleRefresh, handleParamsChange }: Props) => {
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => handleParamsChange({ search: event.target.value });

    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => handleParamsChange({ status: event.target.value as CharacterStatus });

    const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => handleParamsChange({ pageSize: parseInt(event.target.value) });

    const handleClearFilters = () => handleParamsChange({ search: "", status: "", page: 0, pageSize: 10 });

    return (
        <div className="d-flex justify-content-center">
            <div className="form-group w-50 p-2">
                <label htmlFor="name-search">Name:</label>
                <input id="name-search" type="search" className="form-control" placeholder="Search by name..." value={search} onChange={handleSearch} />
            </div>
            <div className="form-group w-25 p-2">
                <label htmlFor="status-select">Status:</label>
                <select id="status-select" className="form-control" value={status} onChange={handleStatusChange}>
                    <option value="">All</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            <div className="form-group w-25 p-2">
                <label htmlFor="page-size-select">Page Size:</label>
                <select id="page-size-select" className="form-control" value={pageSize} onChange={handlePageSizeChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="form-group w-25 p-2 d-flex justify-content-center align-items-end">
                <button className="btn btn-primary mx-1" onClick={handleClearFilters}>Clear filters</button>
                <button className="btn btn-primary mx-1" onClick={handleRefresh}>Refresh</button>
            </div>
        </div>
    );
}