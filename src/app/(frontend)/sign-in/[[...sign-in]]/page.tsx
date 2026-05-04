import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "clamp(48px, 8vw, 120px) var(--pad)",
        minHeight: "70vh",
      }}
    >
      <SignIn />
    </main>
  );
}
