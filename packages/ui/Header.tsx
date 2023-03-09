import { useSession } from "next-auth/react"
import { Navigation } from "./Navigation"
import styles from './Header.module.css'
import { Rss } from 'react-feather';
import Link from "next/link";
import { Button } from "./Button";

const Header = ({ signOut }: { signOut(): void }) => {
  const { data: session } = useSession()

  return (
    <header className={styles.root}>
      <nav className={styles.navigation}>
        <Link href={'/'} className={styles.brand}>
          <Rss width={'2rem'} height={'2rem'} strokeWidth={2} />
        </Link>
        {session && (
          <Navigation items={{
            "Unread": "/unread",
            "Starred": "/starred",
            "History": "/history",
            "Feeds": "/feeds",
            "Categories": "/categories",
          }} />
        )}
      </nav>
      {session ? (
        <Button onClick={() => signOut()}>
          Sign Out
        </Button>
      ) : (
        <Navigation items={{
          "Login": "/auth/login",
          "Register": "/auth/register"
        }} />
      )}
    </header>
  )
}

export default Header