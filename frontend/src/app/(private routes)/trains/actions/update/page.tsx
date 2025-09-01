"use client";

import { useSearchParams } from "next/navigation";
import UpdateTrainForm from "../../../../../../components/UpdateTrainForm";
import { Suspense } from "react";

export default function TrainUpdatePage() {
  const searchParams = useSearchParams();
  const trainId = searchParams.get("trainId");

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {trainId && <UpdateTrainForm trainId={Number(trainId)} />}
      </Suspense>
    </>
  );
}
