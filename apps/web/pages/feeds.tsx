import { zodResolver } from "@hookform/resolvers/zod";
import { createFeedSchema } from "api/server/schemas";
import { trpc } from "api/trpc";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Dialog, Input, Table, Typography } from "ui";

const Feeds = () => {
  const { data: feeds } = trpc.feed.list.useQuery({});
  const feedCreateMutation = trpc.feed.create.useMutation();

  const [edit, setEdit] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(createFeedSchema),
  });

  return (
    <Container>
      <Typography>Feeds</Typography>
      <Dialog open={edit} setter={setEdit}>
        <form
          onSubmit={handleSubmit(async ({ name, feedUrl, siteUrl }) => {
            await feedCreateMutation.mutateAsync({
              name,
              siteUrl,
              feedUrl,
            });
          })}
        >
          <Input
            placeholder={"Name"}
            type={"text"}
            register={register}
            errors={errors}
            id={"name"}
          />
          <Input
            placeholder={"Site URL"}
            type={"text"}
            register={register}
            errors={errors}
            id={"siteUrl"}
          />
          <Input
            placeholder={"Feed URL"}
            type={"text"}
            register={register}
            errors={errors}
            id={"feedUrl"}
          />
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </Dialog>
      <Button onClick={() => setEdit((edit) => !edit)}>Create</Button>
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
  );
};

export default Feeds;
