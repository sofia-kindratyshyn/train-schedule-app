import { Train } from "../types/train";
import styles from "./TrainsList.module.css";

type TrainsListProps = { trains: Train[] };

export default function TrainsList({ trains }: TrainsListProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.article}>Train Schedule</h1>
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
          {trains.map((train) => (
            <tr className={styles.tr} key={train.id}>
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
