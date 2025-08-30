"use client";
import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "./AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        TRAIN<span className={css.span}>SCHEDULE</span>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
