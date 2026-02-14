import ForgotPasswordClient from "./forgot-password-client";
import { getTurnstileSiteKey } from "@/lib/turnstile";

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient siteKey={getTurnstileSiteKey()} />;
}
