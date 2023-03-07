import { trpc } from "../utils/trpc";

const Index = () => {
  const { data } = trpc.entry.get.useQuery();
  
  if (!data) return <div>Loading</div>

  return <div>{data.map((v) => (<div key={v.id}>{v.name}</div>))}</div>
}

export default Index