export type CharacterStatus = "alive" | "dead" | "unknown" | "";

export interface Character {
    id: number;
    name: string;
    image: string;
    status: CharacterStatus;
    species: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    },
    location: {
      name: string;
      url: string;
    },
}

export interface CharactersSearchParams {
    search: string;
    status: CharacterStatus;
    page: number;
    pageSize: number;
}
