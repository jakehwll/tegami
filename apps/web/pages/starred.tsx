import { FilterVariants } from "api/utils/filters"
import { Container, List, Typography } from "ui"

const Starred = () => {
  return (
    <Container>
      <Typography>Starred</Typography>
      <List filter={FilterVariants.starred} />
    </Container>
  )
}

export default Starred
