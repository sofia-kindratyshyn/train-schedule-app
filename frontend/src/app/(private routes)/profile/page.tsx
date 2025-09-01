import { Metadata } from "next";
import ProfileClient from "./Profile.Client";

export const metadata: Metadata = {
  title: "User's profile",
  description: "Profile info page",
};

export default async function Profile() {
  return (
    <>
      <ProfileClient />
    </>
  );
}
