"use client";
import {
  BoomBox,
  CirclePlay,
  DiscAlbum,
  ListMusic,
  LibraryBigIcon,
  Speaker,
  MicVocal,
  LibrarySquare,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard", icon:LayoutDashboard },
  { name: "ListenNow", href: "/listennow", icon:CirclePlay },
  {
    name: "Browse",
    href: "/music/browse",
    icon:DiscAlbum ,
    hideOnMobile: true,
  },
  { name: "Radio", href: "/music/radio", icon:BoomBox },
  { name: "Library", href: "#",icon:LibraryBigIcon },
  { name: "Playlists", href: "/music/playlists", icon:ListMusic  },

  {
    name: "Songs",
    href: "/music/songs",
    icon: Speaker,
    hideOnMobile: true,
  },
  { name: "Artists", href: "/music/artists", icon: MicVocal},
  { name: "Albumbs", href: "/music/albumbs", icon:LibrarySquare },
];

const MusicNavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
              size: "lg",
            })}
          >
            <LinkIcon className="w-6 hover:text-blue-500" />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default MusicNavLinks;