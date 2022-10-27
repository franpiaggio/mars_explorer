import { useQuery } from "@tanstack/react-query"
import { Header, Layout } from "@/layout"
import { RoversData, Filters } from "@/components"
import fetchRoverData from "@/api"
function Home() {
  const rover = "spirit"
  const { data, isError, isRefetching } = useQuery(["photos"], () =>
    fetchRoverData(rover)
  )
  return (
    <Layout>
      <Header isRefetching={isRefetching} />
      <Filters />
      <RoversData data={data} isError={isError} />
    </Layout>
  )
}

export default Home
