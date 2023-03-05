import Link from "next/link"

interface NavigationProps {
    items: {
        [key: string]: string
    }
}

export const Navigation = ({ items }: NavigationProps) => {
    return <ul>
      {Object.entries(items).map(([key, value]) => (
        <li key={key}>
          <Link href={value} passHref>
            {key}
          </Link>
        </li>
      ))}
    </ul>
}