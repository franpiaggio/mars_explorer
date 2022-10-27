# React Nasa API Rover App

- Vitejs + React + TS
- ESlint + Prettier
- ChakraUI
- React Query
- React-routerDOM
- Vitest
- React-testing-library

# Notes:

- Definir donde seteo los valores de formularios
- Recordar hacer debounce si hay busqueda
- No colgar con los any

- Usar esto:
  refetchOnMount
  Whenever a new component that calls useQuery mounts, React Query will do a revalidation.

refetchOnWindowFocus
Whenever you focus the browser tab, there will be a refetch. This is my favourite point in time to do a revalidation, but it's often misunderstood. During development, we switch browser tabs very often, so we might perceive this as "too much". In production however, it most likely indicates that a user who left our app open in a tab now comes back from checking mails or reading twitter. Showing them the latest updates makes perfect sense in this situation.

refetchOnReconnect
If you lose your network connection and regain it, it's also a good indicator to revalidate what you see on the screen.
