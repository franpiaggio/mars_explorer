import { useEffect, useState, useCallback } from "react"
import { IconButton, useColorModeValue } from "@chakra-ui/react"
import { ArrowUpIcon } from "@chakra-ui/icons"

function ScrollToTop() {
  const [show, setShow] = useState(false)

  const handleScroll = useCallback(() => {
    setShow(window.scrollY > 500)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  if (!show) return null

  return (
    <IconButton
      aria-label="Scroll to top"
      icon={<ArrowUpIcon boxSize={5} />}
      position="fixed"
      bottom={{ base: "72px", md: "20px" }}
      right="20px"
      borderRadius="full"
      size="lg"
      bg={useColorModeValue("mars.500", "mars.500")}
      color="white"
      _hover={{ bg: useColorModeValue("mars.600", "mars.400") }}
      boxShadow="lg"
      zIndex="overlay"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    />
  )
}

export default ScrollToTop
