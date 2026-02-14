import SignupClient from "./signup-client";
import { getTurnstileSiteKey } from "@/lib/turnstile";

export default function SignupPage() {
  return <SignupClient siteKey={getTurnstileSiteKey()} />;
}
