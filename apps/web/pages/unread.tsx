import Card from "ui/Card";
import Container from "ui/Container";
import Typography from "ui/Typography";
import { trpc } from "../utils/trpc";

const Index = () => {
  const { data } = trpc.entry.list.useQuery();
  
  if (!data) return <>
    <Container>
      <h1>Loading...</h1>
    </Container>
  </>

  if (data.length === 0) return <>
    <Container>
      <h1>No results.</h1>
    </Container>
  </>

  return <>
    <Container>
      <Typography>Unread</Typography>
      {data.map((entry) => (
        <Card key={entry.id} {...entry} />
      ))}
    </Container>
  </>
}

export default Index