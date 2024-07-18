import CardList from "../components/ui/CardList";
import { getAllData } from "./actions/postAction";

export default async function Home() {
  const bbData = await getAllData();
  return (
    <main>
      <CardList bbData={bbData} />
    </main>
  );
}
