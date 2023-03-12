import { trpc } from "api/trpc";
import { FilterVariants } from "api/utils/filters";
import { Fragment } from "react";
import { Button, Entry } from "ui";
import styles from "./List.module.css";

interface ListProps {
  filter: FilterVariants;
}

const List = ({ filter }: ListProps) => {
  const { data, hasNextPage, fetchNextPage } = trpc.entry.list.useInfiniteQuery(
    {
      limit: 10,
      filter: filter,
    },
    {
      getNextPageParam: (lastPage: any) => lastPage.nextCursor,
    }
  );

  return data ? (
    <>
      {data.pages.map((group: any, i: any) => (
        <Fragment key={i}>
          {group.entries.map((entry: any) => (
            <Entry key={entry.id} {...entry} />
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
    <></>
  );
};

export { List };
