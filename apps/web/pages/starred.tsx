import { FILTERS_TYPES } from "api/utils/filters"
import { Container, List, Typography } from "ui"

const Starred = () => {
  return <>
    <Container>
      <Typography>Starred</Typography>
      <List filter={FILTERS_TYPES.starred} />
    </Container>
  </>
}

export default Starred