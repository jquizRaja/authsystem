"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackBtnProps {
  label: string;
  href: string;
}

const BackBtn = ({ label, href }: BackBtnProps) => {
  return (
    <Button variant="link" size="sm" asChild className="font-normal w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackBtn;
