"use client";
import Link from "next/link";
import styles from "./Profile.module.css";
import { useAuthStore } from "../../../../lib/store/authenticationStore";
//import { userData } from "@/app/lib/api/serverApi";

// type ProfileClientProps = {
//   curUser: userData;
// };
// { curUser }: ProfileClientProps

export default function ProfileClient() {
  const { user } = useAuthStore();
  // setUser(curUser);
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Profile Page</h1>
      <section className={styles.section}>
        <h2 className={styles.subheading}>User Information</h2>
        <p className={styles.text}>
          <strong>Name:</strong> {user.username}
        </p>
        <p className={styles.text}>
          <strong>Email:</strong> {user.email}
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subheading}>Settings</h2>
        <Link href="/profile/edit" className={styles.button}>
          Edit Profile
        </Link>
      </section>
    </div>
  );
}
