import { FILTERS_TYPES } from "api/utils/filters"
import { Container, List, Typography } from "ui"

const History = () => {
  return <>
    <Container>
      <Typography>History</Typography>
      <List filter={FILTERS_TYPES.history} />
    </Container>
  </>
}

export default History