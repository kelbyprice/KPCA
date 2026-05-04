import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
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
      <SignUp />
    </main>
  );
}
