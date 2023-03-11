import { useSession } from "next-auth/react"
import Link from "next/link"
import { ArrowRight, Rss } from "react-feather"
import { Button } from "./Button"
import styles from "./Header.module.css"
import { Navigation } from "./Navigation"

const Header = ({ signOut }: { signOut(): void }) => {
  const { data: session } = useSession()

  return (
    <header className={styles.root}>
      <nav className={styles.navigation}>
        <Link href={"/"} className={styles.brand}>
          <Rss width={"2rem"} height={"2rem"} strokeWidth={2} />
        </Link>
        {session && (
          <Navigation
            items={{
              Unread: "/unread",
              Starred: "/starred",
              History: "/history",
              Feeds: "/feeds",
              Categories: "/categories",
            }}
          />
        )}
      </nav>
      {session ? (
        <Button endIcon={<ArrowRight size={14} />} onClick={() => signOut()}>
          Sign Out
        </Button>
      ) : (
        <Navigation
          items={{
            Login: "/auth/login",
            Register: "/auth/register",
          }}
        />
      )}
    </header>
  )
}

export { Header }
