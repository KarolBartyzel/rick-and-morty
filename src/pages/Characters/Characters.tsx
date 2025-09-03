import { useCharacters } from "./useCharacters";
import { charactersRoute } from "../../router";
import { Table, TableError } from "./Table";
import { Pagination } from "./Pagination";
import { Controls } from "./Controls";
import type { CharactersSearchParams } from "../../types";

export const Characters = () => {
    const searchParams = charactersRoute.useSearch();
    const navigateSearchParams = charactersRoute.useNavigate();
    const { search, status, page, pageSize } = searchParams;
    const handleParamsChange = (params: Partial<CharactersSearchParams>) => {
        navigateSearchParams({ search: { ...searchParams, ...params, page: params.page ?? 0 } });
    }

    const { characters, error, isLoading, pagesCount, refetch } = useCharacters(page, pageSize, search, status);
    const handleRefetch = () => refetch();

    return (
        <div className="p-4 w-100">
            <Controls search={search} status={status} pageSize={pageSize} handleRefresh={handleRefetch} handleParamsChange={handleParamsChange} />

            <div className="overflow-auto p-4" style={{ height: "calc(100vh - 200px)" }}>
                {error ? (
                    <TableError error={error.message} retry={handleRefetch} />
                ) : (
                    <Table characters={characters ?? []} />
                )}
            </div>

            <Pagination page={page} pagesCount={pagesCount} isLoading={isLoading} handleParamsChange={handleParamsChange} />
        </div>
      )
}