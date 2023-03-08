import { Button } from "ui";
import Card from "ui/Card";
import Container from "ui/Container";
import Typography from "ui/Typography";
import { trpc } from "api";
import styles from './List.module.css'
import { Fragment } from "react";

const List = () => {
  const { data, hasNextPage, fetchNextPage } = trpc.entry.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  if (!data)
    return <></>
  
  return data ? (
    <Container>
      <Typography>Unread</Typography>
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.entries.map((entry) => (
            <Card key={entry.id} {...entry} />
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <footer className={styles.load}>
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        </footer>
      )}
    </Container>
  ) : (
    <p>Loading...</p>
  )
}

export default List