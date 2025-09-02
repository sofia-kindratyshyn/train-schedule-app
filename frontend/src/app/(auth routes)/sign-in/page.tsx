import { Suspense } from "react";
import Login from "./SignIn.Client";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
