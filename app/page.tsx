import LoginBtn from "@/components/auth/LoginBtn";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center ">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold dark:text-white drop-shadow-md">
          🛅Auth
        </h1>
        <p className="text-white text-lg drop-shadow-md bg-orange-500 p-2 rounded-md hover:bg-orange-600">
          Simple Authentication Service
        </p>
      </div>
      <LoginBtn mode="modal" asChild>
        <Button className="bg-orange-500 text-white mt-4 hover:bg-orange-600" variant="secondary" size="lg">
          Sign-In
        </Button>
      </LoginBtn>
    </main>
  );
}
