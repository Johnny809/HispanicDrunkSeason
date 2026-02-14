import LoginClient from "./login-client";
import { getTurnstileSiteKey } from "@/lib/turnstile";

export default function LoginPage() {
  return <LoginClient siteKey={getTurnstileSiteKey()} />;
}
