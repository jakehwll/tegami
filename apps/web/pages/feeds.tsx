import { trpc } from "api/trpc"
import { Button, Container, Table, Typography } from "ui"

const Feeds = () => {
  const { data: feeds } = trpc.feed.list.useQuery({})

  return (
    <>
      <Container>
        <Typography>Feeds</Typography>
        {feeds && (
          <Table
            headings={{
              id: "Id",
              status: "Status",
              name: "Name",
              lastPublished: "Last Published",
              modify: "",
            }}
            data={feeds.map(({ id, name, publishedAt }) => ({
              id,
              status: "Active",
              name,
              publishedAt,
              modify: <Button>Edit</Button>,
            }))}
          />
        )}
      </Container>
    </>
  )
}

export default Feeds
