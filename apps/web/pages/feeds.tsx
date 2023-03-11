import { trpc } from "api/trpc"
import { Container, Typography, Table, Button } from "ui"

const Feeds = () => {
  const { data: feeds } = trpc.feed.list.useQuery({})

  if ( !feeds ) return <>No data!</>

  return <>
    <Container>
      <Typography>Feeds</Typography>
      <Table 
        headings={{
          id: 'Id',
          status: 'Status',
          name: 'Name',
          lastPublished: 'Last Published',
          modify: ''
        }}
        data={feeds.map(({ id, name, publishedAt }) => ({
          id,
          status: 'Active',
          name,
          publishedAt,
          modify: <Button>Edit</Button>
        }))}
      />
    </Container>
  </>
}

export default Feeds