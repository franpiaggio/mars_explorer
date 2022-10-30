import { Header, Layout } from "@/layout"
import { Filters, PhotoGrid } from "@/components"
import { Link } from "react-router-dom"

function Home() {
  return (
    <Layout>
      <Link to={"/about"}> Ir About </Link>
      <Header />
      <Filters />
      <PhotoGrid />
    </Layout>
  )
}

export default Home
