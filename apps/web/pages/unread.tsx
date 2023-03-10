import { FILTERS_TYPES } from "api/utils/filters"
import { Container, List, Typography } from "ui"

const Unread = () => {
  return (
    <Container>
      <Typography>Unread</Typography>
      <List filter={FILTERS_TYPES.unread} />
    </Container>
  )
}

export default Unread