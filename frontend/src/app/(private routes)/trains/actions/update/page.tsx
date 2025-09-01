"use client";

import { useSearchParams } from "next/navigation";
import UpdateTrainForm from "../../../../../../components/UpdateTrainForm";
import { Suspense } from "react";

function TrainUpdateContent() {
  const searchParams = useSearchParams();
  const trainId = searchParams.get("trainId");

  return <>{trainId && <UpdateTrainForm trainId={Number(trainId)} />}</>;
}

export default function TrainUpdatePage() {
  return (
    <Suspense fallback={<div>Loading train data...</div>}>
      <TrainUpdateContent />
    </Suspense>
  );
}
