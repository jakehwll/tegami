import Link from "next/link"
import { useRouter } from "next/router"
import styles from './Navigation.module.css'

interface NavigationProps {
    items: {
        [key: string]: string
    }
}

const Navigation = ({ items }: NavigationProps) => {
  const router = useRouter()
  const { pathname } = router


  return (
    <ul className={styles.root}>
      {Object.entries(items).map(([key, value], index) => (
        <li key={key} className={pathname.match(`${value}[\/a-zA-Z]?.*`) ? styles.active : ''}>
          <Link href={value} passHref>
            {key}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export { Navigation }