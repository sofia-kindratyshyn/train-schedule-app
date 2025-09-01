//import { getCurrUser } from "@/app/lib/api/serverApi";
import ProfileClient from "./Profile.Client";

export default async function Profile() {
  //const user = await getCurrUser();
  //curUser={user}
  return (
    <>
      <ProfileClient />
    </>
  );
}
