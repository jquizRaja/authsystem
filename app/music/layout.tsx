import MusicSideNav from "@/components/musiccomponents/MusicSideNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "myMusic",
  description: "I am Music Lover",
};

export default function MusicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
      <div className="w-20 flex-none lg:w-64 md:border-r">
        <MusicSideNav/>
      </div>
      <div className="flex-grow md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
