import Avatar from "@/app/(site)/components/Avatar";
import useOtherUser from "@/app/hook/useOtherUser";
import { FullMessageType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi2";

interface IHeader {
  conversion: Conversation & {
    users: User[];
  };
}
const Header: React.FC<IHeader> = ({ conversion }) => {
    // const otherUser = useOtherUser(conversion);
  const statusText = useMemo(() => {
    if (conversion.isGroup) {
      return `${conversion.users.length} member`;
    }

    return "Active";
  }, [conversion]);

  return (
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
        {/* <Avatar user={otherUser}/> */}
      </div>
    </div>
  );
};

export default Header;
