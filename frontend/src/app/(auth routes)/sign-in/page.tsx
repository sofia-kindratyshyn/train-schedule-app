"use client";
import { useState } from "react";
import { login } from "../../../../lib/api/clientApi";
import css from "./SignIn.client.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../../../../lib/store/authenticationStore";

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const { setIsAuthenticated, setUser } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const redirectTo = searchParams.get("redirect") || "/trains";
  const handleLogin = async (formData: FormData) => {
    try {
      setError(null);
      const data = Object.fromEntries(formData.entries()) as LoginData;
      const user = await login(data);
      setUser({ username: user.data.username, email: user.data.email });
      setIsAuthenticated(true);
      router.push(redirectTo as string);
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
    }
  };

  return (
    <>
      <main className={css.mainContent}>
        <form className={css.form} action={handleLogin}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              autoComplete="email"
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
              autoComplete="current-password"
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </>
  );
}
