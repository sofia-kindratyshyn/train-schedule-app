"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Train } from "../types/train";
import styles from "./TrainsList.module.css";
import Link from "next/link";

type TrainsListProps = { trains: Train[] };

type SortKey = "id" | "name" | "departure_time";

export default function TrainsList({ trains }: TrainsListProps) {
  const router = useRouter();

  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterTerm, setFilterTerm] = useState<string>("");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredTrains = trains.filter(
    (train) =>
      train.departure_station
        .toLowerCase()
        .includes(filterTerm.toLowerCase()) ||
      train.arrival_station.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const sortedTrains = [...filteredTrains].sort((a, b) => {
    let compare = 0;
    if (
      sortKey === "id" &&
      typeof a.id === "number" &&
      typeof b.id === "number"
    ) {
      compare = a.id - b.id;
    } else if (sortKey === "name") {
      compare = a.name.localeCompare(b.name);
    } else if (sortKey === "departure_time") {
      compare =
        new Date(a.departure_time).getTime() -
        new Date(b.departure_time).getTime();
    }
    return sortOrder === "asc" ? compare : -compare;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.article}>Train Schedule</h1>

      <input
        type="text"
        placeholder="Filter by departure or arrival station"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
        style={{
          marginBottom: 20,
          padding: "0.5rem 1rem",
          width: 300,
          fontSize: "1rem",
        }}
      />

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => handleSort("id")} className={styles.addButton}>
          Sort by ID {sortKey === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
        </button>
        <button
          onClick={() => handleSort("name")}
          className={styles.addButton}
          style={{ marginLeft: 10 }}
        >
          Sort by Name{" "}
          {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
        </button>
        <button
          onClick={() => handleSort("departure_time")}
          className={styles.addButton}
          style={{ marginLeft: 10 }}
        >
          Sort by Departure Time{" "}
          {sortKey === "departure_time"
            ? sortOrder === "asc"
              ? "▲"
              : "▼"
            : ""}
        </button>
      </div>

      <Link
        href="/trains/actions/create"
        className={styles.addButton}
        style={{ marginBottom: 20 }}
      >
        Add Train
      </Link>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>#</th>
            <th className={styles.th}>Train Name</th>
            <th className={styles.th}>Departure</th>
            <th className={styles.th}>Arrival</th>
            <th className={styles.th}>From</th>
            <th className={styles.th}>To</th>
          </tr>
        </thead>
        <tbody>
          {sortedTrains.map((train) => (
            <tr
              key={train.id}
              className={styles.tr}
              onClick={() => router.push(`/trains/${train.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td className={styles.td}>{train.id}</td>
              <td className={styles.td}>{train.name}</td>
              <td className={styles.td}>
                {new Date(train.departure_time).toLocaleString()}
              </td>
              <td className={styles.td}>
                {new Date(train.arrival_time).toLocaleString()}
              </td>
              <td className={styles.td}>{train.departure_station}</td>
              <td className={styles.td}>{train.arrival_station}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
