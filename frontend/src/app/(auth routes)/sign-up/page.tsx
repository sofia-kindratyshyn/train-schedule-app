"use client";
import { useState } from "react";
import css from "./SignUp.module.css";
import { useRouter } from "next/navigation";
import { register } from "../../../../lib/api/clientApi";
import { useAuthStore } from "../../../../lib/store/authenticationStore";

type RegisterData = {
  username: string;
  email: string;
  password_hash: string;
};

export default function Page() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setIsAuthenticated, setUser } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData.entries()) as RegisterData;

      const validationErrors: { [key: string]: string } = {};
      if (!data.username || data.username.trim().length < 3) {
        validationErrors.username =
          "Username must be at least 3 characters long.";
      }
      if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
        validationErrors.email = "Please enter a valid email address.";
      }
      if (!data.password_hash) {
        validationErrors.password =
          "Required field. Please enter your password.";
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      console.log(data);
      const user = await register(data);
      setUser({
        username: user.data.username,
        email: user.data.email,
      });
      setIsAuthenticated(true);
      router.push("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <main className={css.mainContent}>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(new FormData(e.target as HTMLFormElement));
        }}
      >
        <h1 className={css.formTitle}>Sign up</h1>

        <div className={css.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            className={css.input}
            required
          />
          {errors.username && <p className={css.error}>{errors.username}</p>}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
          {errors.email && <p className={css.error}>{errors.email}</p>}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password_hash"
            className={css.input}
            required
          />
          {errors.password && <p className={css.error}>{errors.password}</p>}
        </div>

        <button type="submit" className={css.submitButton}>
          Register
        </button>
      </form>
    </main>
  );
}
