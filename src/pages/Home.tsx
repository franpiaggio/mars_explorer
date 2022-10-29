import { Header, Layout } from "@/layout"
import { Filters, PhotoGrid } from "@/components"
import { Link } from "react-router-dom"

function Home() {
  console.log("HOME")
  return (
    <Layout>
      <Header />
      <Filters />
      <PhotoGrid />
      <Link to={"/about"}> Ir About </Link>
    </Layout>
  )
}

export default Home
