import CardList from "./components/CardList";
import { BBDataType } from "./types/types";

async function getbbData() {
  //SSR
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });

  const bbData: BBDataType[] = await response.json();

  return bbData;
}

export default async function Home() {
  const bbData = await getbbData();

  return (
    <main>
      <CardList bbData={bbData} />
    </main>
  );
}
