import { useEffect, useState } from "react"
import { Button } from "@chakra-ui/react"
import { ArrowUpIcon } from "@chakra-ui/icons"
function ScrollToTop() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      setScrollY(window.scrollY)
    })
    return () => {
      window.removeEventListener("scroll", () => {})
    }
  }, [])
  return (
    <Button
      as={Button}
      display={scrollY > 500 ? "block" : "none"}
      position="fixed"
      bottom="15px"
      right="15px"
      padding="5px"
      rounded={"full"}
      variant={"link"}
      cursor={"pointer"}
      minW={0}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      }}
    >
      <ArrowUpIcon w={12} h={12} />
    </Button>
  )
}
export default ScrollToTop
