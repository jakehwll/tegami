import { FilterVariants } from "api/utils/filters"
import { Container, List, Typography } from "ui"

const History = () => {
  return (
    <Container>
      <Typography>History</Typography>
      <List filter={FilterVariants.history} />
    </Container>
  )
}

export default History
