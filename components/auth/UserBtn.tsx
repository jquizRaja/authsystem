"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa";
import LogoutBtn from "./LogoutBtn";
import { GiExitDoor } from "react-icons/gi";

const UserBtn = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-black">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutBtn>
          <DropdownMenuItem>
            <GiExitDoor className="w-4 h-4 mr-2"/>
            Logout
          </DropdownMenuItem>
        </LogoutBtn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBtn;