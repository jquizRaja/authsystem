import LoginBtn from "@/components/auth/LoginBtn";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-500">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🛅Auth
        </h1>
        <p className="text-white text-lg drop-shadow-md">
          Simple Authentication Service
        </p>
      </div>
      <LoginBtn mode="modal" asChild>
        <Button variant="secondary" size="lg">
          Sign-In
        </Button>
      </LoginBtn>
    </main>
  );
}
