"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./TrainDetails.module.css";
import { fetchTrainById } from "../../../../../lib/api/clientApi";
import { useRouter } from "next/navigation";
import { Train } from "../../../../../types/train";
import TrainsActions from "../../../../../components/TrainsActions";

type TrainDetailsClientProps = {
  trainId: number;
};

export default function TrainDetailsClient({
  trainId,
}: TrainDetailsClientProps) {
  const router = useRouter();
  const {
    data: train,
    isLoading,
    error,
  } = useQuery<Train>({
    queryKey: ["train-details", trainId],
    queryFn: () => fetchTrainById(trainId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !train) return <p>Something went wrong.</p>;
  return (
    <>
      <div className={css.container}>
        <div className={css.card}>
          <div className={css.header}>
            <h2 className={css.title}>{train.name}</h2>
            <button className={css.backBtn} onClick={() => router.back()}>
              Back
            </button>
          </div>

          <div className={css.section}>
            <h3 className={css.label}>Відправлення:</h3>
            <p className={css.station}>{train.departure_station}</p>
            <div className={css.datetime}>
              <span className={css.date}>
                {new Date(train.departure_time).toLocaleDateString("uk-UA")}
              </span>
              <span className={css.time}>
                {new Date(train.departure_time).toLocaleTimeString("uk-UA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className={css.section}>
            <h3 className={css.label}>Прибуття:</h3>
            <p className={css.station}>{train.arrival_station}</p>
            <div className={css.datetime}>
              <span className={css.date}>
                {new Date(train.arrival_time).toLocaleDateString("uk-UA")}
              </span>
              <span className={css.time}>
                {new Date(train.arrival_time).toLocaleTimeString("uk-UA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <TrainsActions trainId={trainId} />
        </div>
      </div>
    </>
  );
}
