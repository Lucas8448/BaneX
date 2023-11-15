# Innafor 2023 - Hensetting - React frontend

Dette prosjektet er ment som et mulig utgangspunkt for frontend i utviklingen av en prototype til den tekniske delen av oppgaven i Innafor 2023. Prosjektet bruker TypeScript som språk, React for rendering, react-router-dom for routing, react-query for behandling av data til og fra backend, eslint for linting og vite for transpilering, bundling, dev-server osv.

## Formål

Dette prosjektet er ment som å kunne brukes som enten et eksempel på hvordan man kan snakke med APIet[^1] eller som et skjelett/utgangspunkt for å lage en løsning i Typescript og React (tanken er da isåfall at tekniske ting som api.ts og generell struktur beholdes, mens hele brukeropplevelsen lages selv).

Prosjektet har blitt laget med håp om å være så enkelt å forstå og endre på innenfor de tre dagene med jobbing uten å kreve for mye forkunnskaper, men frykter at det allikevel har endt opp med at en del forsåelse av React[^2] kreves og at en overfladisk forståelse av react-query[^3] og react-router[^4] er nyttig.

## Kjøre prosjektet

Kan kjøres på vanlig måte med

```bash
npm start
```

eller ekvivalent kommando i yarn/pnpm/annet.

Er hardkodet til å kjøre API kall til http://localhost:5167/ i `src/api.ts` som er det backenden[^1] er satt til å kjøre under lokalt. Dette er gjort for å gjøre det så enkelt som mulig å bare kjøre ting lokalt de to dagene som prototypen skal jobbes på, men må endres om en annen backend brukes eller det skal kjøres andre steder enn lokalt.

[^1]: Backenden/apiet laget for å raskt kunne komme igang https://github.com/Bouvet-deler/innafor-hensetting
[^2]: https://react.dev/learn er en rask intro til og oversikt over React
[^3]: https://tanstack.com/query/v4/docs/react/guides/queries for henting av data og https://tanstack.com/query/v4/docs/react/guides/mutations for data som skal sendes
[^4]: Bruker routeren https://reactrouter.com/en/main/routers/create-browser-router med https://reactrouter.com/en/main/components/link, https://reactrouter.com/en/main/components/nav-link, https://reactrouter.com/en/main/components/outlet og https://reactrouter.com/en/main/hooks/use-params
