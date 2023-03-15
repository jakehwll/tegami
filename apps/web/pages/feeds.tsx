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
    <>
      <Container>
        <Typography>Feeds</Typography>
        <Dialog open={edit} setter={setEdit}>
          <form
            onSubmit={handleSubmit(async ({ name, feedUrl, siteUrl }) => {
              const result = await feedCreateMutation.mutateAsync({
                name,
                siteUrl,
                feedUrl,
              });
              console.log(result);
            })}
          >
            <Input
              id={"name"}
              type={"text"}
              placeholder={"Name"}
              register={register}
              errors={errors}
            />
            <Input
              id={"siteURL"}
              type={"text"}
              placeholder={"Site URL"}
              register={register}
              errors={errors}
            />
            <Input
              id={"feedUrl"}
              type={"text"}
              placeholder={"Feed URL"}
              register={register}
              errors={errors}
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
    </>
  );
};

export default Feeds;
