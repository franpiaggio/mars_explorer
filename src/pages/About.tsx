import { Link } from "react-router-dom"
import { Heading } from "@chakra-ui/react"
import { Layout, Header } from "@/layout"
function About() {
  return (
    <Layout>
      <Header />
      <Heading>About Fran</Heading>
      <Link to={"/"}> Volver </Link>
    </Layout>
  )
}

export default About
