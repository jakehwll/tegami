import { Button, Card } from "ui";
import styles from './List.module.css'
import { Fragment } from "react";
import { trpc } from 'api/trpc'
import { FilterVariants } from "api/utils/filters";

interface ListProps {
  filter: FilterVariants
}

const List = ({ filter }: ListProps) => {
  const { data, hasNextPage, fetchNextPage } = trpc.entry.list.useInfiniteQuery(
    {
      limit: 10,
      filter: filter
    },
    {
      getNextPageParam: (lastPage: any) => lastPage.nextCursor,
    }
  );

  if (!data)
    return <></>
  
  return data ? (
    <>
      {data.pages.map((group:any, i:any) => (
        <Fragment key={i}>
          {group.entries.map((entry:any) => (
            <Card key={entry.id} {...entry} />
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <footer className={styles.load}>
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        </footer>
      )}
    </>
  ) : (
    <p>Loading...</p>
  )
}

export { List }