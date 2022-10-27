import { STATUS } from "@/utils/constants"
import { Spinner } from "@chakra-ui/react"

interface props {
  data: any
  status: any
}

function Content({ data, status }: props) {
  if (status === STATUS.LOADING) {
    return <Spinner />
  }

  if (status === STATUS.ERROR) {
    return <>"ERROR..."</>
  }

  return (
    <ul>
      {data.rovers.map((rover: any) => (
        <li key={rover.id}>{rover.name}</li>
      ))}
    </ul>
  )
}

export default Content
