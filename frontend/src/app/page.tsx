import css from "./page.module.css";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to Trains Schedule App</h1>
        <p className={css.description}>
          Trains Schedule App is a simple and efficient application designed for
          managing trains.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          trains. With support for keyword search and structured organization,
          Trains Schedule App offers a streamlined experience for anyone who
          values clarity and productivity.
        </p>
      </div>
    </main>
  );
}
