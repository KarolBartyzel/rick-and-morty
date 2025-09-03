import { useCharacter } from "./useCharacter";
import { useParams } from "@tanstack/react-router";

export const Character = () => {
    const { id: characterId } = useParams({ from: "/character/$id" });
    const { character, error, refetch } = useCharacter(characterId);

    if (error) {
        return (
            <div className="p-4 d-flex flex-column align-items-center">
                <div className="text-center">Error loading character details: {error.message}</div>
                <button className="btn btn-primary mt-2" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex">
                <img src={character?.image ?? ''} alt={character?.name ?? '*****'} className="rounded-sm mx-4" width={200} height={200} />
                <div>
                    <h2>{character?.name ?? '*****'}</h2>
                    <h5>Status: {character?.status ?? '*****'}</h5>
                    <h5>Species: {character?.species ?? '*****'}</h5>
                    <h5>Gender: {character?.gender ?? '*****'}</h5>
                    <h5>Origin: {character?.origin.name ?? '*****'}</h5>
                    <h5>Location: {character?.location.name ?? '*****'}</h5>
                </div>
            </div>
        </div>
    );
}