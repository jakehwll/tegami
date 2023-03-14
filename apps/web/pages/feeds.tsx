import { trpc } from "api/trpc";
import { useState } from "react";
import { Button, Container, Dialog, Table, Typography } from "ui";

const Feeds = () => {
  const { data: feeds } = trpc.feed.list.useQuery({});

  const [edit, setEdit] = useState(false);

  return (
    <>
      <Container>
        <Typography>Feeds</Typography>
        <Dialog open={edit} setter={setEdit}>
          Test
        </Dialog>
        <Button onClick={() => setEdit((edit) => !edit)}>
          Open Dialog {edit ? "opened" : "closed"}
        </Button>
        {feeds && (
          <Table
            headings={{
              id: "ID",
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
  );
};

export default Feeds;
