import { Container, Table, Typography } from "ui"

const Categories = () => {
  return <>
    <Container>
      <Typography>Categories</Typography>
      <Table 
        headings={[
          'ID',
          'Name'
        ]}
        data={[
          {}
        ]}
      />
    </Container>
  </>
}

export default Categories