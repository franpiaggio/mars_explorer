import { useQuery } from "@tanstack/react-query"
import { Layout, Header, Content } from "@/components"
import fetchRoverData from "@/utils/fetchRoverData"
function Home() {
  const { data, status } = useQuery(["rovers"], fetchRoverData)
  return (
    <Layout>
      <Header />
      <Content data={data} status={status} />
    </Layout>
  )
}

export default Home
