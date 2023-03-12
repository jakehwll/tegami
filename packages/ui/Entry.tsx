import { trpc } from "api/trpc";
import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Link from "next/link";
import { Clock, ExternalLink, Eye, EyeOff, Globe, Star } from "react-feather";
import { Button } from "./Button";
import styles from "./Entry.module.css";

interface EntryProps {
  id: number;
  title: string | null;
  description: string | null;
  url: string;
  published: string | number;
  feed: {
    name: string;
  };
  metadata: {
    read: boolean;
    starred: boolean;
  };
}

const Entry = ({
  id,
  title,
  description,
  url,
  published,
  feed,
  metadata,
}: EntryProps) => {
  const utils = trpc.useContext();
  const metadataMutate = trpc.metadata.update.useMutation({
    async onSuccess() {
      utils.entry.list.invalidate();
    },
  });

  return (
    <article className={styles.root} key={id}>
      <main className={styles.body}>
        <span className={styles.site}>
          <Globe size={16} />
          {feed.name}
        </span>
        <h2 className={styles.title}>
          <Link href={url} target={"_blank"}>
            {title}
          </Link>
        </h2>
        {description && (
          <>
            <p className={styles.description}>{description}</p>
          </>
        )}
      </main>
      <footer className={styles.footer}>
        <div className={styles.buttonGroup}>
          <Button
            onClick={() =>
              metadataMutate.mutateAsync({ id: id, read: !metadata.read })
            }
            startIcon={metadata.read ? <EyeOff size={14} /> : <Eye size={14} />}
          >
            {metadata.read ? "Mark as Unread" : "Mark as Read"}
          </Button>
          <Button
            onClick={() =>
              metadataMutate.mutateAsync({ id: id, starred: !metadata.starred })
            }
            startIcon={
              <Star
                size={14}
                fill={metadata.starred ? "currentColor" : "none"}
              />
            }
          >
            {metadata.starred ? "Starred" : "Star"}
          </Button>
          <Link href={url} target={"_blank"}>
            <Button endIcon={<ExternalLink size={14} />}>External link</Button>
          </Link>
        </div>
        <div className={styles.ago}>
          <Clock size={14} />
          {formatDistanceToNow(
            utcToZonedTime(new Date(published), "Australia/Sydney")
          )}{" "}
          ago
        </div>
      </footer>
    </article>
  );
};

export { Entry };
