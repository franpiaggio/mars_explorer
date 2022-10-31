import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./setup/theme"
import { FiltersContextProvider } from "@/state/FiltersContext"
import Home from "./pages/Home"
import About from "./pages/About"
import Favs from "./pages/Favs"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <FiltersContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/favs" element={<Favs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </FiltersContextProvider>
    </ChakraProvider>
  )
}

function AppWithRoutes() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export { AppWithRoutes, App }
