import Container from "ui/Container"
import List from "ui/List"
import Typography from "ui/Typography"
import { trpc } from "../../../packages/api/trpc"

const Starred = () => {
  return <>
    <Container>
      <Typography>Starred</Typography>
      <List trpc={trpc} />
    </Container>
  </>
}

export default Starred