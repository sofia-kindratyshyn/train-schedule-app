"use client";
import Link from "next/link";
import css from "./AuthNavigation.module.css";

import { useAuthStore } from "../lib/store/authenticationStore";
import { logout } from "../lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, cleanAuth } = useAuthStore();
  const handleClick = () => {
    cleanAuth();
    logout();
    router.push("/");
  };
  return isAuthenticated ? (
    <li className={css.navigationItem}>
      <Link href="/profile" prefetch={false} className={css.navigationLink}>
        Profile
      </Link>
      <Link href="/trains" className={css.navigationLink}>
        Trains
      </Link>
      <button className={css.headerButton} onClick={handleClick}>
        Logout
      </button>
    </li>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}
