import Container from "ui/Container"
import List from "ui/List"
import Typography from "ui/Typography"
import { trpc } from "../../../packages/api/trpc"

const Unread = () => {
  return (
    <Container>
      <Typography>Unread</Typography>
      <List trpc={trpc} />
    </Container>
  )
}

export default Unread