"use client";
import { useAuthStore } from "../../../../../lib/store/authenticationStore";
import css from "./EditProfile.module.css";
import { useRouter } from "next/navigation";
import { updateUser } from "../../../../../lib/api/clientApi";
import { UpdateUserData } from "../../../../../types/user";

export default function EditProfileClient() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  async function handleSubmitUser(formData: FormData) {
    const formValue = Object.fromEntries(formData) as UpdateUserData;

    const payload = {
      username: formValue.username,
    };

    const res = await updateUser(payload.username, user.email);
    if (res) setUser(res);

    router.push("/profile");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <form className={css.profileInfo} action={handleSubmitUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user.username}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
