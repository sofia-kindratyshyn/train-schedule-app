import styles from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Profile Page</h1>
      <section className={styles.section}>
        <h2 className={styles.subheading}>User Information</h2>
        <p className={styles.text}>
          <strong>Name:</strong> John Doe
        </p>
        <p className={styles.text}>
          <strong>Email:</strong> john.doe@example.com
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subheading}>Settings</h2>
        <button className={styles.button}>Edit Profile</button>
        <button className={styles.button}>Change Password</button>
      </section>
    </div>
  );
}
