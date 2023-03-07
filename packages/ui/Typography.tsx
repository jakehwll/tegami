import styles from './Typography.module.css'

interface TypographyProps {
    children: React.ReactNode
}

const Typography = ({ children }: TypographyProps) => {
    return <header className={styles.root}>
        <h1 className={styles.headline}>{children}</h1>
    </header>
}

export default Typography