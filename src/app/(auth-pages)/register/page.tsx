import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0B0C10] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 blur-[140px] rounded-full" />

      <RegisterForm />
    </div>
  );
}
