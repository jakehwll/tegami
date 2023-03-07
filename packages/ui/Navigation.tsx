import Link from "next/link"
import styles from './Navigation.module.css'

interface NavigationProps {
    items: {
        [key: string]: string
    }
}

export const Navigation = ({ items }: NavigationProps) => {
    return <>
      <nav className={styles.root}>
        <ul className={styles.navigation}>
          {Object.entries(items).map(([key, value], index) => (
            <li key={key} className={index === 0 ? styles.active : null}>
              <Link href={value} passHref>
                {key}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
}