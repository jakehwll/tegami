import { trpc } from "api/trpc"
import { Button, Container, Table, Typography } from "ui"

const Categories = () => {
  const { data: categories } = trpc.feed.list.useQuery({})

  if ( !categories ) return <>No data!</>

  return <>
    <Container>
      <Typography>Categories</Typography>
      <Table 
        headings={{
          id: 'ID',
          name: 'Name',
          modify: ''
        }}
        data={categories.map(({ id, name }) => ({
          id,
          name,
          modify: <Button>Edit</Button>
        }))}
      />
    </Container>
  </>
}

export default Categories