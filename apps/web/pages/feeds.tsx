import { Container, Typography, Table, Button } from "ui"

const Feeds = () => {
  return <>
    <Container>
      <Typography>Feeds</Typography>
      <Table 
        headings={{
          id: 'Id',
          status: 'Status',
          name: 'Name',
          lastPublished: 'Last Published',
          lastEdited: 'Last Edited',
          modify: ''
        }}
        data={[
          {
            id: 1,
            status: 'Active',
            name: 'Kaguya-sama: Love is War',
            lastPublished: '2 Hours Ago',
            lastEdited: '2 Hours Ago',
            modify: <Button>Edit</Button>
          },
          {
            id: 2,
            status: 'Active',
            name: 'Kaguya-sama: Love is War',
            lastPublished: '2 Hours Ago',
            lastEdited: '2 Hours Ago',
            modify: <Button>Edit</Button>
          },
        ]}
      />
    </Container>
  </>
}

export default Feeds