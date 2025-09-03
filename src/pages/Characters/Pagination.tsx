import type { CharactersSearchParams } from "../../types";

interface Props {
    page: number;
    pagesCount: number;
    isLoading: boolean;
    handleParamsChange: (params: Partial<CharactersSearchParams>) => void;
}

export const Pagination = ({ page, pagesCount, isLoading, handleParamsChange }: Props) => {
    const handlePageChange = (page: number) => handleParamsChange({ page });

    return (
        <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-primary" onClick={() => handlePageChange(page - 1)} disabled={isLoading || page === 0}>Previous</button>
            <span className="mx-2">{page + 1} / {pagesCount}</span>
            <button className="btn btn-primary" onClick={() => handlePageChange(page + 1)} disabled={isLoading || page === pagesCount - 1}>Next</button>
        </div>
    );
};