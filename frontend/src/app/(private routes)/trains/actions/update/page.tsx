"use client";

import { useSearchParams } from "next/navigation";
import UpdateTrainForm from "../../../../../../components/UpdateTrainForm";

export default function TrainUpdatePage() {
  const searchParams = useSearchParams();
  const trainId = searchParams.get("trainId");

  return <>{trainId && <UpdateTrainForm trainId={Number(trainId)} />}</>;
}
