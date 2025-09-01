import TrainsList from "../../../../components/TrainsList";
import { getTrains } from "../../../../lib/api/clientApi";

export default async function TrainsPage() {
  const trainsList = await getTrains();
  return (
    <>
      <TrainsList trains={trainsList} />
    </>
  );
}
