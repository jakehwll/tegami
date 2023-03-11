import { FilterVariants } from "api/utils/filters"
import { Container, List, Typography } from "ui"

const Unread = () => {
  return (
    <Container>
      <Typography>Unread</Typography>
      <List filter={FilterVariants.unread} />
    </Container>
  )
}

export default Unread