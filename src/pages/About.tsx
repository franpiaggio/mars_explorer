import { Heading, Box, Icon, Text, HStack, VStack, Flex } from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons"
import { Layout } from "@/layout"
function About() {
  return (
    <Layout>
      <Box marginLeft="50px">
        <Heading>About this project:</Heading>
        <Text>For this project I used the following technologies</Text>
        {[
          "Vitejs + React + TS",
          "React Query",
          "Vitest",
          "React-testing-library",
          "React-routerDOM",
          "ChakraUI",
          "ESlint + Prettier",
        ].map((item) => (
          <HStack key={item} align={"top"} marginTop="25px">
            <Box color={"green.400"} px={2}>
              <Icon as={CheckIcon} />
            </Box>
            <VStack align={"start"}>
              <Text fontWeight={600}>{item}</Text>
            </VStack>
          </HStack>
        ))}
      </Box>
    </Layout>
  )
}

export default About
