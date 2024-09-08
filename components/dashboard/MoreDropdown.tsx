"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  CircleDot,
  LogOut,
  Menu,
  Moon,
  BadgeCheck,
  Sun,
  User,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Receipt } from "lucide-react";
import { Group } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import { signOut } from "next-auth/react";

const MoreDropdown = () => {
  const [showModelToggle, setShowModelToggle] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="hover:text-blue-500 cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!showModelToggle && (
          <>
            <DropdownMenuItem>
              <User size={20} className="hover:text-blue-500 !mr-3" />
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Receipt size={20} className="hover:text-blue-500 !mr-3" />
              <Link href="/dashboard/billing">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Group size={20} className="hover:text-blue-500 !mr-3" />
              <Link href="/dashboard/team">Team</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BadgeCheck size={20} className="hover:text-blue-500 !mr-3" />
              <Link href="/dashboard/subscription">Subscription</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings size={20} className="hover:text-blue-500 !mr-3" />
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <>
              <div className="flex items-center border-b border-gray-200 dark:boredr-neutral-700 py-3.5 px-2.5">
                <CircleDot
                  size={20}
                  className="hover:text-blue-500 cursor-pointer"
                  onClick={() => setShowModelToggle(false)}
                />
                Switch Appereance
                {theme === "dark" ? (
                  <Moon size={20} className="hover:text-blue-500 ml-auto" />
                ) : (
                  <Sun size={20} className="hover:text-blue-500 ml-auto" />
                )}
                <p className="font-bold ml-1" />
              </div>
              <Label
                htmlFor="dark-mode"
                className="menuItem hover:text-blue-500"
              >
                Dark-Mode
                <DropdownMenuItem className="ml-auto !p-0 hover:text-blue-500">
                  <Switch
                    className="ml-auto transition hover:text-blue-500"
                    id="dark-mode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light");
                    }}
                  />
                </DropdownMenuItem>
              </Label>
              <DropdownMenuItem className="menuItem" onClick={() => signOut()}>
                <LogOut size={20} className="hover:text-blue-500" />
                <p>LogOut</p>
              </DropdownMenuItem>
            </>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreDropdown;
