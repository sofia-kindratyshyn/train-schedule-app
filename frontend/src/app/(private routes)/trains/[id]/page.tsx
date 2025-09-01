import TrainDetailsClient from "./TrainDetails.Client";

type TrainDetailsPageProps = {
  params: Promise<{ id: number }>;
};

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
