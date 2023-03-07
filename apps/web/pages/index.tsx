import { trpc } from "../utils/trpc";

const Index = () => {
  const hello = trpc.hello.useQuery({ text: 'client' });
  
  if (!hello.data) {
    return <div>Loading</div>
  }

  return <div>{hello.data.greeting}</div>
}

export default Index