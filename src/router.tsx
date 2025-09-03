import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import { App } from "./App";
import { Characters } from "./pages/Characters/Characters";
import { Character } from "./pages/Character/Character";
import type { CharactersSearchParams, CharacterStatus } from "./types";

const rootRoute = createRootRoute({
  component: App,
});

export const charactersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Characters,
    validateSearch: (search: Record<string, string>): CharactersSearchParams => ({
      search: search.search ?? "",
      status: (search.status ?? "") as CharacterStatus,
      page: parseInt(search.page ?? "0"),
      pageSize: parseInt(search.pageSize ?? "10"),
    }),
  });

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$id",
  component: Character,
});

const routeTree = rootRoute.addChildren([charactersRoute, characterRoute]);
export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}