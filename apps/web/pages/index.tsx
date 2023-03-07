import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Link from "next/link";
import { Button } from "ui";
import { trpc } from "../utils/trpc";

const Index = () => {
  const { data } = trpc.entry.list.useQuery();
  
  if (!data) return <div>Loading...</div>

  if (data.length === 0) return <div>No results</div>

  return <>
    <div>
      {data
        .map((v) => 
          (
            <article key={v.id}>
              <h2>
                <Link href={v.url}>{v.title}</Link>
              </h2>
              <p>{v.feed.name} - {formatDistanceToNow(utcToZonedTime(new Date(v.published), 'Australia/Sydney'))} ago</p>
              <Button>Unread</Button>
              <Button>Star</Button>
              <Button>External link</Button>
            </article>
          )
        )
      }
    </div>
  </>
}

export default Index