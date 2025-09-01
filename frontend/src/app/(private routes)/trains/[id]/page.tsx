import { Metadata } from "next";
import TrainDetailsClient from "./TrainDetails.Client";
import { fetchTrainById } from "../../../../../lib/api/clientApi";

type TrainDetailsPageProps = {
  params: Promise<{ id: number }>;
};

export async function generateMetadata({
  params,
}: TrainDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const selectedTrain = await fetchTrainById(id);
  return {
    title: `${selectedTrain.name}`,
    description: `${selectedTrain.name} details page`,
    openGraph: {
      title: `${selectedTrain.name}`,
      description: `${selectedTrain.name} details page`,
    },
  };
}

export default async function TrainDetailsPage({
  params,
}: TrainDetailsPageProps) {
  const { id } = await params;
  return (
    <>
      <TrainDetailsClient trainId={id} />
    </>
  );
}
