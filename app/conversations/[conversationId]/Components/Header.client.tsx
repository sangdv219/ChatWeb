"use client"; 
import Avatar from "@/app/(site)/components/Avatar.client";
import useOtherUser from "@/app/hook/useOtherUser";
import { FullMessageType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/(site)/components/AvatarGroup.client";
import useActiveList from "@/app/hook/useActiveList";

interface IHeader {
  conversion: Conversation & {
    users: User[];
  };
};

const Header: React.FC<IHeader> = ({ conversion }) => {
  const otherUser = useOtherUser(conversion);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1
  const statusText = useMemo(() => {
    if (conversion.isGroup) {
      return `${conversion.users.length} member`;
    }

    return isActive ? "Active" : 'Offline';
  }, [conversion, isActive]);

  return (
    <>
    <ProfileDrawer
      data={conversion}
      isOpen={drawerOpen}
      onClose={()=> setDrawerOpen(false)}
    />
    <div
      className="
        bg-white
        w-full
        flex
        border-b-[1px]
        sm:px-4
        py-3
        px-4
        lg:px-6
        justify-between
        items-center
        shadow-sm"
    >
      <div className="flex gap-3 items-center">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          href="/conversions"
        >
          <HiChevronLeft size={32}/>
        </Link>
        {conversion.isGroup ? (<AvatarGroup users={conversion.users}/>) : (<Avatar user={otherUser}/>)}
        
        <div className="flex flex-col">
            <div>{conversion.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
                {statusText}
            </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={()=> setDrawerOpen(true)}
        className="
        text-sky-500
        cursor-pointer
        hover:text-sky-600
        transition
        "
      />
    </div>
    </>
  );
};

export default Header;
