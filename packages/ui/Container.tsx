import styles from './Container.module.css'

interface ContainerProps {
    children?: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
    return <div className={styles.root}>{children}</div>
}

export default Container