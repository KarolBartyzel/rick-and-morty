import { useQuery } from "@tanstack/react-query";
import type { Character, CharacterStatus } from "../../types";
import { useEffect, useMemo, useState } from "react";

interface CharactersResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string | null;
    };
    results: Character[];
}

const API_PAGE_SIZE = 20;

export const useCharacters = (page: number, pageSize: number, search: string, status: CharacterStatus) => {
    const apiPage = useMemo(() => Math.floor(page * pageSize / API_PAGE_SIZE) + 1, [page, pageSize]);
    const [pagesCount, setPagesCount] = useState(0);

    const { data, isLoading, error, refetch, } = useQuery<CharactersResponse>({
        queryKey: ["characters", apiPage, search, status],
        queryFn: () => fetch(`https://rickandmortyapi.com/api/character/?page=${apiPage}&name=${search}&status=${status}`)
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error);
                }
                return data;
            }),
            refetchOnWindowFocus: false,
        });

    useEffect(() => {
        if (data) {
            setPagesCount(Math.ceil((data.info?.count ?? 0) / pageSize));
        }
    }, [data, pageSize]);

    const loadingCharacters = useMemo(() => new Array(pageSize).fill({ id: 0, name: "******", image: "******", status: "******", species: "******", gender: "******", origin: { name: "******", url: "******" }, location: { name: "******", url: "******" } }), [pageSize]);

    const characters = useMemo(() => isLoading || error ? loadingCharacters : (data?.results ?? []).slice((page * pageSize) % API_PAGE_SIZE, (page * pageSize) % API_PAGE_SIZE + pageSize), [data, page, pageSize, isLoading, error, loadingCharacters]);

    return { characters, isLoading, error, pagesCount, refetch };
}
