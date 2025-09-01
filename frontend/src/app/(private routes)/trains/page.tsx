"use client";

import { useEffect, useState } from "react";
import TrainsList from "../../../../components/TrainsList";
import { getTrains } from "../../../../lib/api/clientApi";
import { Train } from "../../../../types/train";

export default function TrainsPage() {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrains() {
      try {
        const trainsData = await getTrains();
        setTrains(trainsData);
      } catch (error) {
        console.error("Error fetching trains:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrains();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <div>Loading trains...</div>
      </div>
    );
  }

  return <TrainsList trains={trains} />;
}
