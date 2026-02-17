import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0B0C10] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[120px] rounded-full" />

      <LoginForm />
    </div>
  );
}
