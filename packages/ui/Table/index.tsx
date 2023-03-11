import styles from './Table.module.css'

const Table = () => {
    return (
        <table className={styles.root}>
            <thead>
                <th>
                    <td>Status</td>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Feed URL</td>
                    <td>Published At</td>
                    <td>Updated At</td>
                </th>
            </thead>
            <tbody>

            </tbody>
        </table>
    )
}

export { Table }