import styles from './Table.module.css'

interface TableProps {
    headings: 
        {
            [key: string]: string
        },
    data:
        {
            [key: string]: string | number | React.ReactNode
        }[]
}

const Table = ({
    headings,
    data
}: TableProps) => {
    
    return (
        <table className={styles.root}>
            <thead>
                <tr>
                    {Object.entries(headings).map(([id, title]) => (
                        <th key={id}>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((rowData, index) => (
                    <tr key={index}>
                        {Object.entries(rowData).map(([key, value]) => (
                            <td key={key}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export { Table }