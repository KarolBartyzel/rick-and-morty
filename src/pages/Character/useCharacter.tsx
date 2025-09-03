import { useQuery } from "@tanstack/react-query";
import type { Character } from "../../types";

export const useCharacter = (characterId: string) => {
    const { data, isLoading, error, refetch } = useQuery<Character>({
        queryKey: ["character", characterId],
        queryFn: () => fetch(`https://rickandmortyapi.com/api/character/${characterId}`).then(async res => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            return data;
        }),
        refetchOnWindowFocus: false,
    });

    return { character: data, isLoading, refetch, error };
}